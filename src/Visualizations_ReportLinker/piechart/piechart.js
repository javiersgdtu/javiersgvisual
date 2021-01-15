//Input Data formatting function.
function parserPieData(data) {

    var f = d3.format(".1f");
    var total = d3.sum(data, function(d) {
        return d.count;
    });

    data.forEach((d) => {
        d.percentage = +f(100 * (d.count / total))
        d.key = d.id
    })
    return data;
}

d3.json("../output_query/sentiments.json") //Json extrack. Search API results.
    .then((data) => {
        var sentiment_data = data.facets
        var parser = parserPieData(sentiment_data);
        //console.log(parser) Data formatted
        drawPieChart(parser);
    })
    .catch((error) => {
        console.log('error', error);
    });

//function to draw the Pie chart
function drawPieChart(data) {

    // document.addEventListener("dataviz.sentiment.click", e => console.log(e.detail), false); I haven fired any event in the pieChart.

    var width = 500;
    var height = 500;
    var ratio = d3.min([width, height]) / 2
    var outerR = 10;

    var svg_pie = d3.select('#div-pie')
        .attr("class", "svg-container")
        .style("width", "30%")
        .style("padding-bottom", "30%")
        .append('svg')
        .attr("preserveAspectRatio", "none")
        .attr("viewBox", `0 0 ${(width+50)} ${(height+50)}`)
        .attr("class", " svg-content")
        .append("g")
        .attr("transform", "translate(" + (ratio + outerR + 5) + "," + (ratio + outerR + 5) + ")");

    var pie = d3.pie().value(d => d.percentage);
    var dataPie = pie(data);

    var arc = d3.arc()
        .innerRadius(100)
        .padAngle(0.02)

    .outerRadius(ratio);

    var arcmouse = d3.arc()
        .innerRadius(120)
        .padAngle(0.03)
        .outerRadius(ratio + outerR);


    var pathPie = svg_pie
        .selectAll('path')
        .data(dataPie)
        .enter()
        .append('path')
        .attr('d', arc);

    var scaleColor = d3.scaleOrdinal(["#22DB8E", "#E30806", "#3D4B57"])
        .domain(["Positive", "Negative", "Neutral"])

    pathPie.attr('fill', (d) => {
            return scaleColor(d.data.key);
        })
        .attr("fill-opacity", 0.3)
        .attr("stroke", (d) => {
            return scaleColor(d.data.key);
        })
        .attr("stroke-width", "2px")
        .attr("stroke-opacity", 1)


    .on("mouseover", function() {
            d3.select(this)
                .transition()
                .duration(500)
                .attr('d', arcmouse)
        })
        .on("mouseout", function() {
            d3.select(this).transition()
                .duration(0).attr('d', arc)
        })



    var text = svg_pie.selectAll('text')
        .data(dataPie)
        .enter()
        .append('text')
        .attr('x', (d) => {
            d.center = arc.centroid(d);
            return d.center[0] - 10; //Center text X-pos in arc
        })
        .attr('y', (d) => {
            return d.center[1]; //Center text Y-pos in arc
        })
    .attr("fill", d => scaleColor(d.data.key))
        .attr("font-weight", "bold")
        //.attr("font-size", "26px") //In case you want to change the font size within Pie arcs
        .text(d => d.data.percentage + " %")
        .style("pointer-events","none");


    //Add text html
    svg_pie.append("foreignObject")
        .attr("width", 400)
        .attr("height", 500)
        .attr("x", -40)
        .attr("y", -50)
        .style("pointer-events","none")
        .append("xhtml:span")
        .html("<p style='font-size:20px'><span style='color: #22DB8E;'>Positive</span></br> <span style='color: #3D4B57;'>Neutral</span></br> <span style='color: #E30806;'>  Negative</span></p>");



}