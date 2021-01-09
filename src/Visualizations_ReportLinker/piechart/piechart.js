function parserPieData(data) {

    var f = d3.format(".1f");
    var total = d3.sum(data, function(d) {
        return d.doc_count;
    });

    data.forEach((d) => {
        d.percentage = +f(100 * (d.doc_count / total))
        d.key = d.key.substring(d.key.indexOf("##") + 2)
    })
    return data;
}

d3.json(api)
    .then((data) => {
        console.log(data)
        var sentiment_data = data.aggregations.sentiment.buckets
        var parser = parserPieData(sentiment_data);
        console.log(parser)
        drawPieChart(parser);
    })
    .catch((error) => {
        console.log('error', error);
    });


function drawPieChart(data) {

    var width = 500;
    var height = 500;
    var ratio = d3.min([width, height]) / 2
    console.log(ratio)
    var outerR = 10;
    //console.log(d3.select('#divpie'))

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
    //console.log(ratio + outerR)

    /*.attr('width', width + 50)
    .attr('height', height + 50)
    .append("g")
    .attr('transform', `translate(${ratio+outerR}, ${ratio+outerR})`);*/




    // Tooltip
    /*var tooltip = d3.select("div").append("div")
        .attr("class", "tooltip");*/


    //console.log(input)
    //-----------------------------
    console.log(data)
    var pie = d3.pie().value(d => d.percentage);
    var dataPie = pie(data);
    console.log(dataPie)

    //Crea elementos graficos path con forma de arco.
    var arc = d3.arc()
        .innerRadius(100)
        .padAngle(0.02)

    .outerRadius(ratio);

    //Arc created to handle the transition
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
        .on("click", function() {
            var evt = new CustomEvent('dataviz.sentimentpie.click', {
                detail: {
                    industry: d.key_id,
                },
            });

            document.dispatchEvent(evt);
        });


    var text = svg_pie.selectAll('text')
        .data(dataPie)
        .enter()
        .append('text')
        .attr('x', (d) => {
            d.center = arc.centroid(d);
            //console.log(d.center)
            return d.center[0] - 10;
        })
        .attr('y', (d) => {
            return d.center[1];
        })

    .attr("fill", d => scaleColor(d.data.key))
        .attr("font-weight", "bold")
        .text(d => d.data.percentage + " %")

    //Add text html
    svg_pie.append("foreignObject")
        .attr("width", 400)
        .attr("height", 500)
        .attr("x", -40)
        .attr("y", -50)
        .append("xhtml:span")
        .html("<p style='font-size:20px'><span style='color: #22DB8E;'>Positive</span></br> <span style='color: #3D4B57;'>Neutral</span></br> <span style='color: #E30806;'>  Negative</span></p>");

    /*  .append('div')
      .style("position", "absolute")
      .style("left", (ratio - outerR - 20) + "px")
      .style("top", (ratio - outerR - 20) + "px")
      .html("<span style='color: #22DB8E;'>Positive</span></br> <span style='color: #E7EBED;'>Neutral</span></br> <span style='color: #E30806;'>  Negative</span>")*/

    document.addEventListener("dataviz.industrychart.click", e => console.log(e.detail), false);


}