function parserBarData(data) {

    data = data.filter(function(d, i) {
        return i < 10
    })

    data.forEach(function(d) {
        d.key_id = d.key.substring(0, d.key.indexOf("##"))
        d.key_title = d.key.substring(d.key.indexOf("##") + 2)
        d.doc_count = d.doc_count
    })
    return data
}

d3.json(api)
    .then((data) => {
        console.log(data)
        var sector_data = data.aggregations.sector.buckets
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
    /*var marginbottom = 100;
    var margintop = 50;
    var marginleft = 50;
    var marginrigth = 100;*/
    var margin = ({ top: 50, right: 100, bottom: 100, left: 50 })

    //console.log(d3.select('#bar'))
    var svg_bar = d3.select('#div-bar')
        .attr("class", "svg-container")
        .style("width", "60%")
        .style("padding-bottom", "40%")

    .style("background-color", "#E7EBED")
        .append('svg')
        .attr("preserveAspectRatio", "none")
        .attr("viewBox", `0 0 ${(width+margin.right)} ${(height+ margin.bottom + margin.top)}`)

    //.attr("viewBox", `0 0 ${(width+marginrigth)} ${(height+ marginbottom + margintop)}`)
    .attr("class", " svg-content")
        .append("g")
        .attr("transform", "translate(" + margin.right + "," + margin.top + ")");


    // Tooltip
    var tooltipBar = d3.select("#div-bar").append("div")
        .attr("class", "mytooltip")

    //Creacion de escalas
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

    //axis X
    //var xaxis = d3.axisTop(xscale);

    //axis X
    var yaxis = d3.axisLeft(yscale);

    // var dispatchCustomEvent = d3.dispatch("dataviz.industrychart.click")

    //Creacion de los rectangulos
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
                /* console.log(event)
                 console.log(event.pageX)
                 console.log(event.pageY)*/
            tooltipBar.transition()
                .duration(200)
                .style("visibility", "visible")
                // .style("opacity", .9)
                .style("left", (event.layerX + 20) + "px")
                .style("top", (event.layerY - 30) + "px")
                .text(` Count: ${roundNumber(d.doc_count)}`)
        })
        .on("mouseout", function() {
            d3.select(this).attr("fill", "#005aff")
                /*     .attr('class', (d) => {
                         if (d.doc_count > 10) {
                             return 'rectwarning';
                         }
                     })*/
            tooltipBar.transition()
                .duration(200)
                .style("visibility", "hidden")
        })
        /*.dispatch('dataviz.industrychart.click',
            function(event, d) {
                return {
                    detail: {
                        industry: d.key_id
                    }
                }
            })*/
        .on("click", function(event, d) {

            var evt = new CustomEvent('dataviz.industrychart.click', {
                detail: {
                    industry: d.key_id,
                },
            });

            /* document.addEventListener("dataviz.industrychart.click", e => console.log(e.detail), false);*/

            document.dispatchEvent(evt);
            //console.log(evt)
            //console.log(this.dispatchEvent(evt))


            /* d3.dispatch('dataviz.industrychart.click', function(d) {
                     return {
                         'detail': {
                             'industry': d.key_id
                         }
                     }
                 })*/
            //console.log(d3.dispatch("dataviz.industrychart.click"))
        })

    /* rect.on("dataviz.industrychart.click", function(event, d) {
         console.log(event)
     })*/

    /*.on('dataviz.industrychart.click',
        function(event, d) {
            console.log(event.detail)

        });*/

    rect
        .transition() //Entry transiction
        //.ease(d3.easeBounce)
        .duration(1000)
        /*.delay(function(d, i) {
            console.log(i);
            return (i * 300)
        })*/

    .attr("width", function(d) {
        return xscale(d.doc_count);
    });


    //Text for rectangles
    /*var text = svg.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .text(d => d.doc_count)
        .attr("x", (d) => xscale(d.doc_count))
        .attr('y', d => {
            return yscale(d.key_title) + (yscale.bandwidth() / 2)
        })
        .style("opacity", 0);


    text
        .transition()
        //.ease(d3.easeBounce)
        .duration(500)
        .delay(d3.max(data, function(d, i) {
            return i;
        }) * 300 + 1000)
        .style("opacity", 1);*/

    //X axis
    /* svg_bar.append("g")
         .attr("class", "axisX")
         .call(xaxis);*/

    //Y axis
    svg_bar.append("g")
        .attr("class", "axisY")
        .call(yaxis)
        .call(g => g.select(".domain").remove());


    function roundNumber(number) {
        //console.log(number)
        // console.log(number.toString().length)
        if (number.toString().length == 5) {
            return (Math.round(number / 10000) * 10000).toString().substring(0, 2) + "k";
        } else if (number.toString().length == 4) {
            return "+" + (Math.round(number / 1000) * 1000).toString().substring(0, 1) + "K";

        } else if (number.toString().length == 3) {
            return Math.round(number / 10) * 10;

        } else {
            return number
        }

    }

}