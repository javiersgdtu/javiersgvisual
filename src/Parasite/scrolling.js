// using d3 for convenience, and storing a selected elements
var scrolly = d3.select(".part-3");
var figure = scrolly.select(".chart");
var article = scrolly.select('.bars-text');
var step = article.selectAll('.step');
var housesvg = figure.select(".container").select("#house-svg")


// initialize the scrollama
var scroller = scrollama();

// kick things off
init();

/*function handleResize() {
    // 1. update height of step elements
    var stepH = Math.floor(window.innerHeight * 0.75);
    step.style("height", stepH + "px");

    var figureHeight = window.innerHeight / 2;
    var figureMarginTop = (window.innerHeight - figureHeight) / 2;
    console.log(figureMarginTop)
    console.log(figureHeight)

    figure
        .style("height", 0 + "px")
        .style("top", 0 + "px");

    // 3. tell scrollama to update new element dimensions
    scroller.resize();
}*/

// scrollama event handlers
function handleStepEnter(response) {
    console.log(response);
    // response = { element, direction, index }
    console.log(response.progress)
        // add color to current step only
        /*step.classed("is-active", function(d, i) {
            return i === response.index;
        });*/ //Not for the moment
    var opacity = (response.direction == "down") ? 0 : 1;
    var visibility = (response.direction == "down") ? "visible" : "hidden";

    if (response.index == 1) {
        figure.select(".background-img")
            .transition()
            .duration(3000)
            .style("opacity", opacity);
        console.log(!opacity)
        figure.select(".container")
            .transition()
            .duration(1000)
            //.delay(1000)
            .style("opacity", +!opacity);

    } else if (response.index == 2) {
        var livingroom = housesvg.select("g").select("#living_room")
        var cave = housesvg.select("g").selectAll("#basement,#cave")

        //console.log(livingroom)
        livingroom.transition().duration(1000)
            .style("stroke-width", "10px").style("opacity", 1)
            .transition()
            .delay(1000)
            .duration(1000)
            .style("stroke-width", "0.5px").style("opacity", 0.5);

        cave.transition().delay(2000).duration(1000)
            .style("stroke-width", "10px").style("opacity", 1)
            .transition()
            .delay(1000)
            .duration(1000)
            .style("stroke-width", "0.5px").style("opacity", 0.5);

        d3.select("#house-svg")
            .append("text")
            .attr("id", "area")
            /*.text(function(d) {
                return livingroom.select("title").text()
            })*/
            .text("Kitchen")
            .attr("x", d3.select("#house-svg").attr("width") / 4 + 50)
            .attr("y", 100).transition().delay(2000).text("Basement & Bunker").transition().delay(3000).remove()

    } else if (response.index == 3) {
        housesvg.select("#legend-force").style("visibility", visibility);


    } else if (response.index == 4) {
        forceCharacters(1);
        housesvg.select(".character-circles").style("visibility", visibility);

    } else if (response.index == 5) {
        //  figure.select(".switch").style("visibility", visibility);
        // figure.select("#sliderCheck").attr("checked", true)
        //console.log(figure.select("#sliderCheck").node())
        //handleCheck(figure.select("#sliderCheck").node())
        //handleCheck(true)
        // console.log(slider)

    }


    // update graphic based on step
    //figure.select("p").text(response.index + 1);
}

/*function setupStickyfill() {
    d3.selectAll(".sticky").each(function() {
        Stickyfill.add(this);
    });
}*/

function init() {
    // setupStickyfill();

    // 1. force a resize on load to ensure proper dimensions are sent to scrollama
    // handleResize();

    // 2. setup the scroller passing options
    // 		this will also initialize trigger observations
    // 3. bind scrollama event handlers (this can be chained like below)
    scroller
        .setup({
            step: ".step",
            offset: 0.5,
            debug: false
        })
        .onStepEnter(handleStepEnter);

    // setup resize event
    //window.addEventListener("resize", handleResize);
}