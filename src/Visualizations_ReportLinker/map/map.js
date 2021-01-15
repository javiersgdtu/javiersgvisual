/* I am locally storing the GEOJSON file with the country shapes. In case that you dont want to store it locally you can find it as well in https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson

Note: Also, If you use API URL calls you dont need the <script> tag in the map.html with the files var declaration. You could do here something like: 

Promise.all(["URL or folder of the world.js file", "http.APIcall"].map(url => d3.json(url))).then(function(data) {
     drawMapChart(data)
    });*/

Promise.all(files.map(url => d3.json(url))).then(function(data) {
    drawMapChart(data)
});

//Input Data formatting function.
function parserMapData(data, parserGeo) {

    data.forEach(function(d) {
        d.key_id = d.id
        d.key_title = d.name
        d.doc_count = d.count
    })

    data = data.filter(function(d) {
        return parserGeo.includes(d.name)

    })
    return data
}

//function to draw the Map
function drawMapChart(data) {
    //capture Fired event
    document.addEventListener("dataviz.map.click", e => console.log(e.detail), false);

    var featureCollection = data[0];
    var parserGeo = featureCollection.features.map(d => d.properties.name);
    var country_data = data[1].facets;

    var parser = parserMapData(country_data, parserGeo);

    //console.log(parser) Data formatted
    var parserMap = new Map(parser.map(d => [d.key_title, [d.doc_count, d.key_id]]));

    var width = 800;
    var height = 800;

    var svg = d3.select('#div-map')
        .attr("class", "svg-container")
        .style("width", "50%")
        .style("padding-bottom", "50%")
        .append('svg')
        .attr("preserveAspectRatio", "none")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("class", " svg-content")
        .append("g")

    var linearGradient = svg.append("defs")
        .append("linearGradient")
        .attr("id", "gradient-legend");

    linearGradient
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");

    linearGradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#d5e4ff");

    linearGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#005aff");


    var tooltipMap = d3.select("#div-map").append("div")
        .attr("class", "mytooltip")

    var projection = d3.geoMercator()
        .fitSize([width, height], featureCollection)

    var pathProjection = d3.geoPath().projection(projection);
    var features = featureCollection.features;
    var parsermax = d3.max(parser, (d) => d.doc_count);
    var colorScale = d3.scaleLinear().domain([1, parsermax])
        .range(["#d5e4ff", "#005aff"])


    var createdPath = svg.selectAll('path')
        .data(features)
        .enter()
        .append('path')
        .attr('d', (d) => pathProjection(d))
        .attr("fill", function(d) {
            d.total = parserMap.get(d.properties.name) ? parserMap.get(d.properties.name)[0] : 0
            return (d.total == 0) ? "#F6F7F8" : colorScale(d.total)

        })
        .on("mouseover", function(event, d) {
            d3.select(this).style("cursor", "pointer");

            tooltipMap.transition()
                .duration(200)
                .style("visibility", "visible")
                .style("left", (event.layerX + 20) + "px")
                .style("top", (event.layerY - 30) + "px")
                .text(` ${d.properties.name}: ${d.total}`)
        })
        .on("mouseout", function(event, d) {

            tooltipMap.transition()
                .duration(200)
                .style("visibility", "hidden")
        })
        .on('click', function(event, d) {
            var evt = new CustomEvent('dataviz.map.click', {
                detail: {
                    geography: parserMap.get(d.properties.name) ? parserMap.get(d.properties.name)[1] : "",
                },
            });
            document.dispatchEvent(evt);
        })

    svg.append("g")
        .attr("id", "legend")
        .append('rect')
        .attr("x", 40)
        .attr("y", height - 100)
        .attr("width", 200)
        .attr("height", 20)
        .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 0.8)
        .attr("fill", "url(#gradient-legend)")

    svg.select("#legend")
        .append('text')
        .attr("x", 20)
        .attr("y", height - 86)
        .text("1")

    svg.select("#legend")
        .append('text')
        .attr("x", 250)
        .attr("y", height - 86)
        .text(parsermax)

}