var scroller_heat = scrollama();
var slidename = "occupancy"
    //slideHeatMap("occupancy")

d3.json("data/data_out/heatmap.json").then(function(dataInit) {


    drawHeatMap(dataInit);
});

function drawHeatMap(dataInit) {
    init();
    //Create Scene "Legend" => Future Timeline of the film.
    //var rectwidth = (width / 2) / xScenes.length;
    ////console.log(width)
    var xScenes = [...new Set(dataInit.map(d => d.scene))];
    var svg = d3.select("#heatmap-svg").append("g").attr("transform", "translate(150,50)");
    var durationScenes = [...new Set(dataInit.map(d => d.dt_sub))] //,
        //sum;
        //var durationche = (durationScenes.map(elem => sum = (sum || 0) + elem));
    var width = 1000
    var height = 500

    // var rectwidth = ((width / 2) / xScenes.length) / 2;
    // var rectheight = 30;


    //console.log(rectwidth)
    //var duration = d3.extent(durationScenes)

    //var scaleScene = d3.scaleLinear().domain(duration).range([rectwidth, (4 * rectwidth)])
    //))
    //var scaleInput = d3.scaleOrdinal(durationche).domain([1, 2, 3, 4, 5, 6, 7, 8])

    // //console.log(scaleInput(8));
    // //console.log(durationche);
    ////console.log(durationScenes);

    // var offset = 0;
    //var offset_arr = []

    //console.log(d3.extent(durationScenes));
    /* var scaleY = d3.scaleOrdinal([height / 2, height / 4, 0])
         .domain(levels)*/

    var dataInput = dataInit.filter(function(d) {
        return d.slide == slidename;
    })
    var levels = dataInput.map(function(d) { return d.level })
    var family = ["Park", "Kim", "Geun Se & Moon Gwang"]
        // dataInput.map(function(d) { return d.family })

    //var pct = d3.extent(dataInput, function(d) { return d.pct })

    var scaleX = d3.scaleBand([0, width / 2])
        .domain(family)
    var scaleY = d3.scaleBand([height / 2, 0])
        .domain(levels)

    var scaleColor = d3.scaleLinear(["#f7e8ff", "#db3535"])
        //.interpolator(d3.interpolateYlOrRd)
        .domain([0, 100])
        //console.log(d3.interpolateYlOrRd[0])
    var axisX = d3.axisBottom(scaleX);
    var axisY = d3.axisLeft(scaleY);

    //console.log(svg.select("g"))
    svg.append("g").attr("id", "axisY").call(axisY).call(g => g.select(".domain").remove())
    svg.append("g").attr("id", "axisX").attr("transform", "translate(0," + height / 2 + ")").call(axisX).call(g => g.select(".domain").remove())

    // legend = svg.select("#legend-force").empty() ? svg.append("g").attr("id", "legend-force": legend

    var linearGradient = svg.append("defs")
        .append("linearGradient")
        .attr("id", "gradient-legend");

    //Vertical gradient
    linearGradient
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%");

    //Set the color for the end (100%)
    linearGradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#db3535"); //dark blue

    //Set the color for the end (100%)
    linearGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#f7e8ff"); //dark blue

    var heat = svg
        .append("g")
        .attr("id", "heatmap")


    var widthrect = scaleX.bandwidth();
    var heigthrect = scaleY.bandwidth();

    //legend
    heat.append("g")
        .attr("id", "legend")
        .append('rect')
        .attr("x", width / 2 + 40)
        .attr("y", (height / 2) - 100)
        .attr("width", 20)
        .attr("height", 100)
        //.attr("rx", 10)
        //.attr("ry", 10)
        .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 0.8)
        .attr("fill", "url(#gradient-legend)")

    heat.select("#legend")
        .append('text')
        .attr("x", width / 2 + 65)
        .attr("y", (height / 2) - 100)
        .text("100 %")

    heat.select("#legend")
        .append('text')
        .attr("x", width / 2 + 65)
        .attr("y", (height / 2))
        .text("0 %")


    var circles = heat
        .append("g")
        .attr("class", "character-heatmap")
        .selectAll("circle")
        .data(characters_leg)
        .enter()
        .append("circle")
        //.attr("id", (d) => d.Character.replace(/\s/g, '').replace(/[.]/g, ''))
        .attr("r", radius)
        .attr("cx", function(d, i) {
            d.idx = i
            if ((i >= 4) && (i <= 7)) {
                offsetfam = 0
                d.idx = i - 4
            } else if ((i >= 0) && (i <= 3)) {
                offsetfam = 40
                d.idx = i + 4
            } else if (i > 7) {
                offsetfam = 80
            }

            return offsetfam + (d.idx * 40)

        })
        .attr("cy", function() {
            return height / 2 + 60
        })
        .attr("fill", function(d, i) {
            return colorCharacter(d.Character)
                /*  if ((d.idx >= 0) & (d.idx < 4)) {
                    return colorCharacter(d.idx + 4)
                } else if ((d.idx >= 4) & (d.idx < 8)) {
                    return colorCharacter(d.idx - 4)
                } else { return colorCharacter(d.idx) }*/
        })
        .on("mouseover", function(event, d) {
            ////console.log
            d3.select(this).transition().duration(1000).ease(d3.easeLinear)
                /*.attr("fill", function(d, i) {
                    //console.log((d.urlImage) ? "url(#" + d.id + ")" : "orange")
                    return (d.urlImage) ? "url(#" + d.id + ")" : "orange"
                })*/
                .attr("r", radius * 2)
                .attr("stroke", d3.select(this).attr("fill"))
                .attr("stroke-width", 15)
                .attr("stroke-dasharray", 10)
                .style("z-index", 100)

            //console.log(d)
            heat.append("g")
                .attr("id", "character-legendheat")
                .attr("transform", "translate(-20,55)")
                .append("text")
                .attr("x", d3.select(this).attr("cx"))
                .attr("y", (d3.select(this).attr("cy")))
                .text(d.Character)
                /*tooltip.html("<b>Character:</b> " + d.Character + "</br><b>Family:</b> " + d.Family +
                        " </br><b>Role:</b> " + d.Role + " </br><b>Actor:</b> " + d.Actor)
                    .transition()
                    .duration(200)
                    .style("visibility", "visible")
                    .style("opacity", .9)
                    .style("left", (1300 + radius * 4) + "px")
                    .style("top", (300 + (d.cy * radius * 2.5)) + "px")*/



        })
        .on("mouseout", function(d) {
            d3.select("#character-legendheat").remove()
            d3.select(this).transition().duration(1000) //.attr("fill", function(d) {
                //     return colorCharacter(d.Character)
                // })
                .attr("r", radius).attr("stroke-width", 0)

            /* tooltip.transition()
                 .duration(200)
                 .style("visibility", "hidden")*/
        });

    function init() {
        // setupStickyfill();

        // 1. force a resize on load to ensure proper dimensions are sent to scrollama
        // handleResize();

        // 2. setup the scroller passing options
        // 		this will also initialize trigger observations
        // 3. bind scrollama event handlers (this can be chained like below)

        scroller_heat
            .setup({
                step: ".step-insights",
                offset: 0.5,
                debug: false
            })
            .onStepEnter(handleStepEnterHeat);
    }

    function handleStepEnterHeat(response) {
        //console.log(response)

        if (response.index == 0) {

            updateHeatMap("occupancy")

        }
        if (response.index == 3) {

            updateHeatMap("updown")

        } else if (response.index == 4) {

            updateHeatMap("static")

        } else if (response.index == 5) {

            updateHeatMap("move")

        }

    }

    function updateHeatMap(slidename) {
        dataInput = dataInit.filter(function(d) {
            return d.slide == slidename;
        })

        levels = dataInput.map(function(d) { return d.level })

        //Fijamos los dominios de cada escala
        scaleY.domain(levels) //.nice()
        heigthrect = scaleY.bandwidth();

        //X axis is always the same.

        //Con remove() eliminamos las barras y textos del anterior barrio
        svg.selectAll('.rect-heat').remove();
        svg.selectAll('.text-heat').remove(); //Elimino el texto asociado a los rectangulos

        //Upate Y axis
        svg.selectAll("#axisY")
            .transition()
            .duration(500)
            .call(axisY).call(g => g.select(".domain").remove());


        //Rectangles
        heat.append("g")
            .selectAll('rect')
            .data(dataInput)
            .enter()
            .append('rect')
            .attr("id", (d, i) => "rect-" + i)
            .attr("class", "rect-heat")
            .attr("x", function(d) {
                return scaleX(d.family)
            })
            .attr("y", d => scaleY(d.level))
            .attr("width", widthrect)
            .attr("height", heigthrect)
            .attr("rx", 10)
            .attr("ry", 10)
            .style("stroke-width", 4)
            .style("stroke", "none")
            .style("opacity", 0)
            .attr("fill", function(d) { return scaleColor(d.pct) })

        .on("mouseover", function() {

                d3.select(this).transition().duration(1000).style("stroke", "black")
                    .style("opacity", 1);
                // //console.log(d3.select(this))
                ////console.log(this.parentNode)
                //console.log(widthrect / 2)
                //console.log(d3.select(this).attr("x") + (widthrect / 2))
                //console.log(d3.select(this).attr("x"))
                //console.log(d3.select(this).attr("id"))
                d3.select("#text-" + d3.select(this).attr("id")).transition().duration(500).attr("opacity", 1);
                //console.log(d3.select("#text-" + d3.select(this).attr("id")))
                //i = i++;
                // append("text")

                //.style("cursor", "pointer");
                // handlemouseOver(i) //Decide not to use it and inclue the text somewhere else
            })
            .on("mouseout", function() {
                d3.select("#text-" + d3.select(this).attr("id")).transition().duration(500).attr("opacity", 0);

                d3.select(this).transition().duration(1000).style("stroke", "none")

                //.select("#rect" + i).attr("opacity", 0.2)

                //.style("cursor", "pointer");
                // handlemouseOver(i) //Decide not to use it and inclue the text somewhere else
            })
            /*  .on("click", function(d, i) {
                  ////console.log(node)
                  d3.selectAll(".rect-scene").attr("fill", "orange");
                  d3.select(this).attr("fill", "#670398");
                  ////console.log(d)
                  update(i);
                  handleClick(i);
                  // ticked();
              })*/

        //Transition effect
        heat
            .selectAll(".rect-heat")
            .transition()
            .ease(d3.easeBounce)
            .delay(function(d, i) {
                return i * 100;

            })
            .duration(1000)
            .style("opacity", 0.8)


        heat.append("g")
            .attr("class", "text-heat")
            .selectAll('text')
            .data(dataInput)
            .enter()
            .append('text')
            .attr("id", (d, i) => "text-rect-" + i)
            .attr("x", function(d) {
                return scaleX(d.family) + (widthrect / 2) - 10
            })
            .attr("y", d => scaleY(d.level) + (heigthrect / 2))
            .text(function(d) { return d.pct + " %" })
            .style("font-size", "26px")
            .attr("opacity", 0)
            .style("pointer-events", "none");
        //vertical lines
        /* //console.log(scaleScene(d3.max(duration)))
         svg.append("g")
             .selectAll("line")
             .data(levels)
             .enter()
             .append("line")
             .attr("x1", 0)
             .attr("x2", width / 2)
             .attr("y1", scaleY)
             .attr("y2", scaleY)
             .attr("stroke", "black")
             .attr("stroke-dasharray", 5)*/



    }
}