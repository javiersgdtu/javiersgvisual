d3.json("data/data_out/characters.json").then(function(data) {
    console.log(data);
    //d3.select("#characters-menu").append("img").attr("src", "https://raw.githubusercontent.com/javiersgdtu/javiersgvisual/master/assets/img/characters-scale/Chung%20Sook.png")


    var svg = d3.select(".div-svg").select("svg");
    var radius = 20;
    var characters = [...new Set(data.map(d => d.Character))].sort()
    var colorCharacter = d3.scaleOrdinal(d3.schemePaired)
        .domain(characters);
    console.log(characters)

    //add images to circles 
    svg.append("g")
        .selectAll("defs")
        .data(data)
        .enter()
        .append("pattern")
        .attr("id", function(d) {
            return (d.urlImage) ? d.id : '';
        })
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", "0 0 1 1")
        .attr("preserveAspectRatio", "xMidYMid slice")
        /*.attrs({
            "height": "100%",
            "width": "100%",
            "patternContentUnits": "objectBoundingBox",
            "viewBox": "0 0 1 1",
            "preserveAspectRatio": "xMidYMid slice"
        })*/
        .append("image")
        .attr("width", "1")
        .attr("height", "1")
        .attr("preserveAspectRatio", "xMidYMid slice")
        /*.attrs({
            "height": "1",
            "width": "1",
            "preserveAspectRatio": "xMidYMid slice"
        })*/
        .attr("xlink:href", function(d) {
            return d.urlImage;
        });

    var j = 0;
    var circles = svg.append("g").attr("class", "character-circles")
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", radius)
        .attr("cx", function(d, i) {
            d.cx = (i >= 8) ? (i - 8) : ((i <= 3) ? i : (i - 4))
            return (1300 + (d.cx * radius * 2.5))
        })
        .attr("cy", function(d, i) {
            d.cy = (i >= 8) ? 2 : ((i <= 3) ? 0 : 1);
            return 240 + (d.cy * radius * 2.5)
        })
        .attr("fill", function(d) { return colorCharacter(d.Character) })
        .on("mouseover", function(d) {
            //console.log
            d3.select(this).transition().duration(1000).ease(d3.easeLinear)
                .attr("fill", function(d, i) {
                    console.log((d.urlImage) ? "url(#" + d.id + ")" : "orange")
                    return (d.urlImage) ? "url(#" + d.id + ")" : "orange"
                })
                .attr("r", radius * 5)
                .attr("stroke", function(d) { return colorCharacter(d.Character) })
                .attr("stroke-width", 15)
                .attr("stroke-dasharray", 10)

            tooltip.transition()
                .duration(200)
                .style("visibility", "visible")
                .style("opacity", .9)
                .style("left", (1300 + radius * 4) + "px")
                .style("top", (300 + (d.cy * radius * 2.5)) + "px")
                .text("Character: " + d.Character + " Family: " + d.Family +
                    " Role: " + d.Role + " Actor: " + d.Actor);


        })
        .on("mouseout", function(d) {
            d3.select(this).transition().duration(1000).attr("fill", function(d) {
                return colorCharacter(d.Character)
            }).attr("r", radius).attr("stroke-width", 0)

            tooltip.transition()
                .duration(200)
                .style("visibility", "hidden")
        });


    //Add titles.
    svg.select(".character-circles")
        .append("text")
        .attr("x", 1320)
        .attr("y", 200)
        .text("CHARACTERS")
        .attr("font-family", "parasite")
        .attr("font-size", 20)
        /* .on("mouseover", function() {
             d3.select(".character-circles").transition().duration(1000).style("visibility", "visible")
         });*/

    //circles.style("visibility", "hidden")
    // handleMouseOver);

    function handleMouseOver() {
        d3.select(this).attr("fill", "orange")
    }


    /*  function colorCharacter(character) {
          return scaleCharacter(character);

      }*/ // How to create a global function??


});