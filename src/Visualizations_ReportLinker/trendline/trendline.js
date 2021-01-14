function parserTrendData(data) {
    var formatdate = d3.utcParse("%Y-%m-%dT%H:%M:%S.%f%Z")

    data.forEach(function(d) {
        d.doc_count = d.count
        d.key_as_string = formatdate(d.name)
    })
    return data
}

d3.json("../output_query/hits_over_time.json") //Query Output
    .then((data) => {

        var trend_data = data.facets
        var parser = parserTrendData(trend_data);

        drawTrendChart(parser);
    })
    .catch((error) => {
        console.log('error', error);
    });

function drawTrendChart(parser) {
    var width = 1200;
    var height = 400;

    var margin = ({ top: 50, right: 100, bottom: 40, left: 5 })

    var svg_trend = d3.select('#div-trend')
        .attr("class", "svg-container")
        .style("width", "80%")
        .style("padding-bottom", "30%")
        .append('svg')
        .attr("preserveAspectRatio", "none")
        .attr("viewBox", `0 0 ${(width+margin.right+margin.left)} ${(height+margin.top+margin.bottom)}`)
        .attr("class", " svg-content")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    // Tooltip
    var tooltipTrend = d3.select("#div-trend").append("div")
        .attr("class", "mytooltip")


    var domainY = d3.extent(parser, (d) => d.doc_count);
    var scaleY = d3.scaleLinear()
        .domain(domainY)
        .range([height, 0]);

    var domainX = d3.extent(parser, (d) => d.key_as_string)
    var domainXdiff = (domainX[1] - domainX[0]) / (1000 * 60 * 60 * 24);

    var scaleX = d3.scaleTime()
        .domain(domainX)
        .range([0, width])

    var area = d3.area()
        .curve(d3.curveMonotoneX)
        .x(d => scaleX(d.key_as_string))
        .y0(scaleY(domainY[0]))
        .y1(d => scaleY(d.doc_count));

    var line = d3.line()
        .curve(d3.curveMonotoneX)
        .x(d => scaleX(d.key_as_string))
        .y(d => scaleY(d.doc_count));


    var pathArea = svg_trend.append('path');
    var pathLine = svg_trend.append('path');


    pathArea
        .attr('fill', '#d5e4ffff')
        .attr('stroke', 'none')
        .attr('d', area(parser));

    pathLine
        .attr('fill', 'none')
        .attr('stroke', '#005AFF')
        .attr('stroke-width', 2)
        .attr('d', line(parser));
    var formatdate_months = d3.timeFormat("%b");
    var formatdate_days = d3.timeFormat("%b %d");


    var maxround = round50(domainY[1])
    console.log(maxround)
    var tickRange = [domainY[0]];
    for (var i = 1; i <= 3; i++) {
        tickRange.push((i * maxround / 4) + maxround / 4);
    }
    console.log(tickRange)

    var axisX = d3.axisBottom(scaleX)

    if (domainXdiff > 60) {
        axisX.tickFormat(formatdate_months)
    } else {
        axisX.tickFormat(formatdate_days)
    }

    var axisY = d3.axisRight(scaleY).tickSize(width).tickValues(tickRange);

    var circles = svg_trend.append("g").selectAll('circle')
        .data(parser)
        .enter()
        .append('circle')
        .attr('cx', (d) => scaleX(d.key_as_string))
        .attr('cy', (d) => scaleY(d.doc_count))
        .attr('r', 4)
        .attr('fill', "#005AFF")
        .attr('stroke', "white")
        .attr('stroke-width', 2)
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)


    // Y axis
    svg_trend.append('g')
        .attr('class', 'axisY')
        .call(axisY)
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line")
            .attr("stroke-opacity", 0.5)
            .attr("stroke-dasharray", "2,2"))
        .call(g => g.selectAll(".tick text")
            .attr("x", 4)
            .attr("dy", -4));

    //X axis
    svg_trend.append('g')
        .attr('class', 'axisX')
        .attr('transform', `translate(0, ${height})`)
        .call(axisX);

    function handleMouseOver(event, d) {
        console.log(event)
        console.log(event.pageX)
        console.log(event.pageY)

        d3.select(this)
            .transition()
            .duration(1000)
            .attr("fill", "#F9E254")
            .attr("r", 6)

        tooltipTrend.transition()
            .duration(200)
            .style("visibility", "visible")
            .style("left", (event.layerX + 20) + "px")
            .style("top", (event.layerY - 30) + "px")
            .text(`${formatdate_days(d.key_as_string)}- Count: ${d.doc_count}`)

    }

    function handleMouseOut(event, d) {
        d3.select(this)
            .transition()
            .duration(200)
            .attr("fill", "#005AFF")
            .attr("r", 4)


        tooltipTrend.transition()
            .duration(200)
            .style("visibility", "hidden")

    }

    function round50(x) {
        return Math.ceil(x / 50) * 50;
    }


};