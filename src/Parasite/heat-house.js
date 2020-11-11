function handleCheck(slider) {
    //console.log(slider)
    // console.log(slider.checked)
    if (slider.checked) {
        d3.select(".text-legend").style("visibility", "hidden");
        d3.select(".character-circles").style("visibility", "hidden");
        //d3.select(".force").style("visibility", "hidden");


        d3.json("data/data_out/house-ocupation.json?v=2.0").then(function(data) {
            console.log(data)
            var range = [0, 100]

            slider(0, 100)

            function slider(min, max) {

                var range = [min, max]

                // set width and height of svg
                var w = 400
                var h = 300
                var margin = {
                    top: 90,
                    bottom: 135,
                    left: 900,
                    right: 40
                }

                // dimensions of slider bar
                //var width = w - margin.left - margin.right;
                //var height = h - margin.top - margin.bottom;
                var width = 598.79; //This value is inputed from the legend of the force layout
                // console.log(width)
                var height = 30;


                // create x scale
                var x = d3.scaleLinear()
                    .domain(range) // data space
                    .range([0, width]); // display space

                // create svg and translated g
                var svg = d3.select(".div-svg").select("svg")
                var g = svg.append('g').attr("id", "house-heat").attr('transform', `translate(${margin.left}, ${margin.top})`)

                // labels
                var labelL = g.append('text')
                    .attr('id', 'labelleft')
                    .attr('x', 0)
                    .attr('y', height + 20)

                var labelR = g.append('text')
                    .attr('id', 'labelright')
                    .attr('x', 0)
                    .attr('y', height + 20)

                var rectangle =
                    g.append('rect')
                    .attr("width", width)
                    .attr("height", height)
                    .attr("fill", "none")
                    .attr("stroke", "black")

                var title = g
                    .append("text")
                    .attr("x", 1200 - margin.left)
                    .attr("y", 70 - margin.top)
                    .text("LOCATIONS")
                    .attr("font-family", "parasite")
                    .attr("font-size", 20);
                // define brush
                var brush = d3.brushX()
                    .extent([
                        [0, 0],
                        [width, height]
                    ])
                    .on('brush', function() {
                        //console.log(d3.event.pageX)
                        //console.log(d3.event.selection)
                        var s = d3.event.selection;
                        // update and move labels

                        var lim_inf = +Math.round(x.invert(s[0]));
                        var lim_sup = +Math.round(x.invert(s[1]));
                        //console.log(lim_inf)
                        labelL.attr('x', s[0])
                            .text(lim_inf)
                        labelR.attr('x', s[1])
                            .text(lim_sup)
                            // move brush handles      
                        handle.attr("display", null).attr("transform", function(d, i) { return "translate(" + [s[i], -height / 4] + ")"; });
                        // update view
                        // if the view should only be updated after brushing is over, 
                        // move these two lines into the on('end') part below
                        svg.node().value = s.map(function(d) { var temp = x.invert(d); return +temp.toFixed(2) });
                        svg.node().dispatchEvent(new CustomEvent("input"));



                        //Update Data.
                        data_filt = data.filter(function(d) {
                            return (d.end_seconds_norm >= lim_inf) & (d.end_seconds_norm <= lim_sup);
                        });

                        // console.log(data_filt)

                        var total = d3.sum(data_filt, function(d) { return d.dt_sub_sl })
                            //console.log(total)
                        var data_sum = d3.nest().key(function(d) {
                                // console.log(d.sublocation)
                                return d.sublocation;
                            })
                            .rollup(function(leaves) {
                                //  console.log(d3.sum(leaves, function(d) {
                                //     return d.pct_slider;
                                //  }))
                                return d3.sum(leaves, function(d) {
                                    return d.dt_sub_sl;
                                }) / total;
                            }).entries(data_filt)
                            .map(function(d) {
                                return {
                                    sublocation: d.key,
                                    opacity_value: d.value,
                                    percentage: Math.round(100 * (d.value))
                                };
                            });
                        //Order elements
                        data_sum.sort(function(x, y) {
                            return d3.descending(x.opacity_value, y.opacity_value);
                        });
                        console.log(data_sum)
                            //Update map opacity.
                        update_opacity(data_sum);
                        //Update Text.
                        update_text(data_sum);

                    })

                // append brush to g
                var gBrush = g.append("g")
                    .attr("class", "brush")
                    .call(brush)

                // add brush handles (from https://bl.ocks.org/Fil/2d43867ba1f36a05459c7113c7f6f98a)
                var brushResizePath = function(d) {
                    var e = +(d.type == "e"),
                        x = e ? 1 : -1,
                        y = height / 2;
                    return "M" + (.5 * x) + "," + y + "A6,6 0 0 " + e + " " + (6.5 * x) + "," + (y + 6) + "V" + (2 * y - 6) +
                        "A6,6 0 0 " + e + " " + (.5 * x) + "," + (2 * y) + "Z" + "M" + (2.5 * x) + "," + (y + 8) + "V" + (2 * y - 8) +
                        "M" + (4.5 * x) + "," + (y + 8) + "V" + (2 * y - 8);
                }

                var handle = gBrush.selectAll(".handle--custom")
                    .data([{ type: "w" }, { type: "e" }])
                    .enter().append("path")
                    .attr("class", "handle--custom")
                    .attr("stroke", "#000")
                    .attr("fill", '#eee')
                    .attr("cursor", "ew-resize")
                    .attr("d", brushResizePath);

                // override default behaviour - clicking outside of the selected area 
                // will select a small piece there rather than deselecting everything
                // https://bl.ocks.org/mbostock/6498000
                gBrush.selectAll(".overlay")
                    .each(function(d) { d.type = "selection"; })
                    .on("mousedown touchstart", brushcentered)

                function brushcentered() {
                    var dx = x(1) - x(0), // Use a fixed width when recentering.
                        cx = d3.mouse(this)[0],
                        x0 = cx - dx / 2,
                        x1 = cx + dx / 2;
                    d3.select(this.parentNode).call(brush.move, x1 > width ? [width - dx, width] : x0 < 0 ? [0, dx] : [x0, x1]);
                }


                // select entire range
                gBrush.call(brush.move, range.map(x))

                return svg.node()
            }

            function update_opacity(data_sum) {

                //console.log((s0 + s1) / 2)
                var max_opacity = d3.max(data_sum, function(d) { return d.opacity_value })
                var scaleOpacity = d3.scaleLinear([0.2, 1]).domain([0, max_opacity])
                    //console.log(scaleOpacity((s0 + s1) / 2))

                //console.log(d3.select("#house-color").selectAll("path"))
                //var dataMap = {};
                // data_sum.forEach(function(d) { dataMap[d.sublocation] = d; })
                //  console.log(dataMap)

                var dataMap = {};
                data_sum.forEach(function(d) { dataMap[d.sublocation] = d; })
                    //console.log(dataMap)
                d3.select("#house-color").selectAll("path").style("opacity", 0)
                d3.select("#house-color").selectAll("path")
                    .filter(function() {
                        return !!dataMap[this.id];
                    })
                    //returns true if the element's id is in the data
                    .style("opacity", function() {
                        //console.log(dataMap[this.id].sublocation)
                        // console.log(dataMap[this.id].opacity_value)

                        return scaleOpacity(dataMap[this.id].opacity_value);
                    })
                d3.select("#house-color").selectAll("g").style("opacity", 0) //Porblem with the stairs. They are not displayed. Not sue where I am putting the opacity at 0
                    //d3.select("#entrance-stairs").selectAll("path").style("opacity", 1)
                    //console.log(d3.select("#entrance-stairs").selectAll("path"))
                    //d3.select("#entrance-stairs").selectAll("path").style("opacity", 1) 
                d3.select("#house-color").selectAll("g")
                    .filter(function() {
                        return !!dataMap[this.id];
                    })
                    //returns true if the element's id is in the data
                    .style("opacity", function() {
                        //console.log(dataMap[this.id].sublocation)
                        // console.log(dataMap[this.id].opacity_value)

                        return scaleOpacity(dataMap[this.id].opacity_value);
                    })
            }

            function update_text(data_sum) {
                var data_sum_filt = data_sum.filter(function(d) {
                        return d.percentage > 10;
                    })
                    // console.log(data_sum_filt)

                d3.select("#distribution_text").remove();
                console.log((lim_inf == 0) && (lim_sup == 100))
                console.log(data_sum_filt)

                var text = ((range[0] == 0) && (range[1] == 100)) ? "Accross the film:" : "In the selected Range:"
                svg
                    .append("g")
                    .attr("id", "distribution_text")
                    .append("text")
                    .attr("x", 20)
                    .attr("y", 600)
                    .text(text)
                    .style("font-size", "34px")

                svg.select("#distribution_text").append("g")
                    .selectAll("text")
                    .data(data_sum_filt)
                    .enter()
                    .append("text")
                    .attr("x", 20)
                    .attr("y", function(d, i) { return (i * 20) + 650 })
                    .attr("fill", function(d) {
                        //console.log(d)
                        //console.log(d3.select("#" + d.sublocation).select("title").text())

                        //console.log(d3.select("#" + d.sublocation).style("fill"))

                        var color_text = (d3.select("#" + d.sublocation).empty()) ? "black" : d3.select("#" + d.sublocation).style("fill");
                        //console.log(color_text)
                        return color_text
                    })
                    .text(function(d) {
                            var text = (d3.select("#" + d.sublocation).empty()) ? "black" : d3.select("#" + d.sublocation).select("title").text();
                            return text + " " + d.percentage + " %";
                        }

                    )
                    .style("font-size", function(d, i) {
                        return d.percentage * 1.5
                    })

            }
        });

    } else {
        d3.select("#house-heat").remove();
        d3.select("#distribution_text").remove();

        d3.select(".text-legend").style("visibility", "visible");
        d3.select(".character-circles").style("visibility", "visible");
        //d3.select(".force").style("visibility", "visible"); //In order to debug the macthing between the brush and the rect legend of the force comment this.



    }
}