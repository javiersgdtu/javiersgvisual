d3.json("data/data_out/time_scene.json").then(function(data) {

    //Create Scene "Legend" => Future Timeline of the film.
    //var rectwidth = (width / 2) / xScenes.length;
    //console.log(width)
    var xScenes = [...new Set(data.map(d => d.scene))];
    var svg = d3.select("svg").append("g").attr("transform", "translate(300,50)");
    var durationScenes = [...new Set(data.map(d => d.dt_sub))] //,
        //sum;
        //var durationche = (durationScenes.map(elem => sum = (sum || 0) + elem));
    var width = 1000
    var height = 500

    var rectwidth = ((width / 2) / xScenes.length) / 2;
    var rectheight = 30;
    console.log(rectwidth)
    var duration = d3.extent(durationScenes)

    var scaleScene = d3.scaleLinear().domain(duration).range([rectwidth, (4 * rectwidth)])
        //))
        //var scaleInput = d3.scaleOrdinal(durationche).domain([1, 2, 3, 4, 5, 6, 7, 8])

    // console.log(scaleInput(8));
    // console.log(durationche);
    //console.log(durationScenes);

    var offset = 0;
    var offset_arr = []
    var levels = ["level0", "level1", "level2"];

    console.log(d3.extent(durationScenes));
    var scaleY = d3.scaleOrdinal([height / 2, height / 4, 0])
        .domain(levels)

    console.log(scaleY("level0"))
    var axisY = d3.axisLeft(scaleY);
    svg.append("g").call(axisY)
        // legend = svg.select("#legend-force").empty() ? svg.append("g").attr("id", "legend-force": legend
    var legend = svg
        .append("g")
        .attr("id", "legend-scatter");

    legend.selectAll('rect')
        .data(durationScenes)
        .enter()
        .append('rect')
        .attr("id", (d, i) => "rect" + i)
        .attr("class", "rect-scene")
        .attr("x", function(d, i) {
            var x = offset;
            offset = scaleScene(d) + x + 5; //5 px of gap.
            console.log(offset)
            return x

        })
        .attr("y", height / 2)
        .attr("width", function(d) {
            return scaleScene(d)
        })
        .attr("height", rectheight)
        .attr("fill", "orange")
        /*  .on("click", function(d, i) {
              //console.log(node)
              d3.selectAll(".rect-scene").attr("fill", "orange");
              d3.select(this).attr("fill", "#670398");
              //console.log(d)
              update(i);
              handleClick(i);
              // ticked();
          })*/
        .on("mouseover", function(event, d, i) {
            d3.select("#che").select("#rect" + i).attr("opacity", 0.8)

            //.style("cursor", "pointer");
            // handlemouseOver(i) //Decide not to use it and inclue the text somewhere else
        })
        .on("mouseout", function(event, d, i) {
            d3.select("#che").select("#rect" + i).attr("opacity", 0.2)

            //.style("cursor", "pointer");
            // handlemouseOver(i) //Decide not to use it and inclue the text somewhere else
        })

    offset = 0;
    legend.append("g").attr("id", "che").selectAll('rect')
        .data(durationScenes)
        .enter()
        .append('rect')
        .attr("id", (d, i) => "rect" + i)
        .attr("class", "rect-scene")
        .attr("x", function(d, i) {
            var x = offset;
            offset = scaleScene(d) + x + 5; //5 px of gap.
            console.log(offset)
            return x

        })
        .attr("y", 0)
        .attr("width", function(d) {
            return scaleScene(d)
        })
        .attr("height", height / 2)
        .attr("fill", "orange")
        .attr("opacity", 0.2)

    //Text legend
    offset = 0;
    var text_legend = svg.select("#legend-scatter").append("g")
        .attr("class", "text-legend")
        .selectAll("text")
        .data(durationScenes)
        .enter()
        .append("text")
        .attr("x", function(d, i) {
            var x = offset;
            offset = scaleScene(d) + x + 5; //5 px of gap.

            offset_arr.push(x + (scaleScene(d) / 2));

            return x + (scaleScene(d) / 2)
        })
        .attr("y", (height / 2) + rectheight + 15)
        .text((d, i) => i + 1)
        .attr("font-size", 15)
    console.log(offset_arr)

    //vertical lines
    console.log(scaleScene(d3.max(duration)))
    svg.append("g")
        .selectAll("line")
        .data(levels)
        .enter()
        .append("line")
        .attr("x1", 0)
        .attr("x2", offset)
        .attr("y1", scaleY)
        .attr("y2", scaleY)
        .attr("stroke", "black")
        .attr("stroke-dasharray", 5)

    var circles = [
        { "x": 1, "level": "level0", "character": "Da Hye", "action": "move" },
        { "x": 2, "level": "level0", "character": "Da Hye", "action": "move" },
        { "x": 3, "level": "level0", "character": "Da Hye", "action": "move" },
        { "x": 4, "level": "level1", "character": "Da Hye", "action": "move" },
        { "x": 5, "level": "level2", "character": "Da Hye", "action": "move" },
        { "x": 6, "level": "level1", "character": "Da Hye", "action": "move" },
        { "x": 7, "level": "level2", "character": "Da Hye", "action": "move" },
        { "x": 8, "level": "level2", "character": "Da Hye", "action": "move" }
    ]

    //circles 

    svg.append("g")
        .attr("class", ".circle-story")
        .selectAll("circle")
        .data(circles)
        .enter()
        .append("circle")
        .attr("id", (d, i) => i + 1)
        .attr("r", 5)
        .attr("cx", function(d) {
            //return scaleInput(d.x)
            return offset_arr[d.x - 1]

        })
        .attr("cy", (d) => scaleY(d.level))






});