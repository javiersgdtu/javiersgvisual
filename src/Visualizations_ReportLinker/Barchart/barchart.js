function parserBarData(data) {

    data = data.sort((a, b) => { return b.count - a.count; })
    console.log(data)
    data = data.filter(function(d, i) {
        return i < 10
    })

    data.forEach(function(d) {
        d.key_id = d.id
        d.key_title = d.name
        d.doc_count = d.count
    })
    return data
}

d3.json("../output_query/industries.json") //Query Output
    .then((data) => {
        console.log(data)
        var sector_data = data.facets
        console.log(sector_data)

        var parser = parserBarData(sector_data);
        console.log(parser)

        drawBarChart(parser);
    })
    .catch((error) => {
        console.log('error', error);
    });


function drawBarChart(data) {
    document.addEventListener("dataviz.industrychart.click", e => console.log(e.detail), false);

    var height = 400;
    var width = 600;

    var margin = ({ top: 100, right: 100, bottom: 100, left: 50 })

    var svg_bar = d3.select('#div-bar')
        .attr("class", "svg-container")
        .style("width", "50%")
        .style("padding-bottom", "40%")
        .style("background-color", "#E7EBED")
        .append('svg')
        .attr("preserveAspectRatio", "none")
        .attr("viewBox", `0 0 ${(width+margin.right)} ${(height+ margin.bottom + margin.top)}`)
        .attr("class", " svg-content")
        .append("g")
        .attr("transform", "translate(" + (margin.right + 50) + "," + margin.top + ")");


    // Tooltip
    var tooltipBar = d3.select("#div-bar").append("div")
        .attr("class", "mytooltip")

    var yscale = d3.scaleBand()
        .domain(data.map(function(d) {
            return d.key_title;
        }))
        .range([0, height])
        .padding(0.1);

    var xscale = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) {
            return d.doc_count;
        })])
        .range([0, width / 1.2]);


    var yaxis = d3.axisLeft(yscale);


    var rect = svg_bar
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr("fill", "#005aff");


    rect
        .attr("x", 0)
        .attr('y', d => {
            return yscale(d.key_title)
        })
        .attr("width", 0)
        .attr("height", yscale.bandwidth())
        .attr("rx", "1")
        .on("mouseover", function(event, d) {
            d3.select(this).style("cursor", "pointer");
            d3.select(this).attr("class", "").attr("fill", "#fcd35c")

            tooltipBar.transition()
                .duration(200)
                .style("visibility", "visible")
                .style("left", (event.layerX + 20) + "px")
                .style("top", (event.layerY - 30) + "px")
                .text(` Count: ${roundNumber(d.doc_count)}`)
        })
        .on("mouseout", function() {
            d3.select(this).attr("fill", "#005aff")

            tooltipBar.transition()
                .duration(200)
                .style("visibility", "hidden")
        })

    .on("click", function(event, d) {

        var evt = new CustomEvent('dataviz.industrychart.click', {
            detail: {
                industry: d.key_id,
            },
        });

        document.dispatchEvent(evt);

    })


    rect
        .transition()
        .duration(1000)


    .attr("width", function(d) {
        return xscale(d.doc_count);
    });



    //Y axis
    svg_bar.append("g")
        .attr("class", "axisY")
        .call(yaxis)
        .call(g => g.select(".domain").remove());


    function roundNumber(number) {

        if (number.toString().length == 5) {
            return "+" + (Math.round(number / 10000) * 10000).toString().substring(0, 2) + "k";
        } else if (number.toString().length == 4) {
            return "+" + (Math.round(number / 1000) * 1000).toString().substring(0, 1) + "K";

        } else if (number.toString().length == 3) {
            return Math.round(number / 10) * 10;

        } else {
            return number
        }

    }

}