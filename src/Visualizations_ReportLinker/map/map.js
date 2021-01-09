function parserMapData(data) {

    data.forEach(function(d) {
        d.key_id = d.key.substring(0, d.key.indexOf("##"))
        d.key_title = d.key.substring(d.key.indexOf("##") + 2)
        d.doc_count = d.doc_count
    })
    return data
}

var files = ["world.json", api];
//https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson

Promise.all(files.map(url => d3.json(url))).then(function(data) {
    console.log(data)
    drawMapChart(data)
});


function drawMapChart(data) {
    //capture Fired event
    document.addEventListener("dataviz.map.click", e => console.log(e.detail), false);

    console.log(data)
    var featureCollection = data[0];
    var country_data = data[1].aggregations.country.buckets;
    console.log(country_data)

    var parser = parserMapData(country_data);

    console.log(parser)

    var parserMap = new Map(parser.map(d => [d.key_title, [d.doc_count, d.key_id]]));

    //console.log(parserMap.get("United States")[0]);
    //console.log(parserMap)

    var width = 800;
    var height = 800;
    // var margin = ({ top: 50, right: 100, bottom: 100, left: 50 })


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

    //Vertical gradient
    linearGradient
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");

    //Set the color for the end (100%)
    linearGradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#d5e4ff"); //dark blue

    //Set the color for the end (100%)
    linearGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#005aff"); //dark blue


    var tooltipMap = d3.select("#div-map").append("div")
        .attr("class", "mytooltip")



    var center = d3.geoCentroid(featureCollection);

    console.log(center)

    //2.Proyeccion de coordenadas [long,lat] en valores X,Y
    var projection = d3.geoMercator()
        .fitSize([width, height], featureCollection) // equivalente a  .fitExtent([[0, 0], [width, height]], featureCollection)
        //.scale(1000)

    //.center(center) 
    // .translate([width / 2, height / 2]) 

    var pathProjection = d3.geoPath().projection(projection);
    //console.log(pathProjection(featureCollection.features[0]))
    var features = featureCollection.features;


    console.log(features)

    //--------CHECK TO SEE IF ALL COUNTRIES ARE IN THE MAP-------------
    /* var check = features.map(d => d.properties.name);
    var check_json = parser.map(d => d.key_title);

    var che = check_json.filter(function(item) {
            return !check.includes(item);
        })
        //console.log(che)*/

    //Color scale   
    var parsermax = d3.max(parser, (d) => d.doc_count);
    var colorScale = d3.scaleLinear().domain([1, parsermax])
        .range(["#d5e4ff", "#005aff"])


    var createdPath = svg.selectAll('path')
        .data(features)
        .enter()
        .append('path')
        .attr('d', (d) => pathProjection(d))
        /*.attr("opacity", function(d) {
            d.opacity = 1
            return d.opacity
        })*/
        .attr("fill", function(d) {
            d.total = parserMap.get(d.properties.name) ? parserMap.get(d.properties.name)[0] : 0
            return (d.total == 0) ? "#F6F7F8" : colorScale(d.total)

        })
        .on("mouseover", function(event, d) {
            d3.select(this).style("cursor", "pointer");

            tooltipMap.transition()
                .duration(200)
                .style("visibility", "visible")
                // .style("opacity", .9)
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

    //Bottom legend 
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