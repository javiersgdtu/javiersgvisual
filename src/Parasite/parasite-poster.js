srcset = "images/parasite.jpg 3x"


var f = d3.format(".1f")

//Morse Rectangles.
var rect = d3.select(".mask-poster")
    .selectAll("rect")
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);


rect.transition()
    .duration(2000)
    .delay(function(d, i) {
        return i * 300
    })
    .style("opacity", 0);

//Morse Circles.
var ellipse = d3.select(".mask-poster")
    .selectAll("ellipse")
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);


ellipse.transition()
    .duration(2000)
    .delay(function(d, i) {
        return i * 400
    })
    .style("opacity", 0)

//Title
var text = d3.select(".mask-poster").select("svg")
    .append("text")
    .attr("x", 450)
    .attr("y", 590)
    .attr("opacity", 0)
    .text("PARASITE")
    .attr("font-family", "parasite")
    .attr("font-size", 100)

text
    .transition()
    .duration(2000)
    .delay(2500)
    .style("opacity", 1)


/*.on("mouseover", function(d) {
        d3.select(this).attr("opacity", 0)
    })
d3.select(".mask-poster").selectAll("ellipse")
    .on("mouseover", function(d) {
        d3.select(this).attr("opacity", 0)
    })*/


function handleMouseOver(d) {
    d3.select(this).style("fill", "white")
        .style("opacity", 0.5);

    if (d3.select(this).attr("id") == "title-1") {
        // var rx = +f(d3.select(this).attr("rx"))
        var cx = +f(d3.select(this).attr("cx"))
            //var ry = +f(d3.select(this).attr("ry"))
        var cy = +f(d3.select(this).attr("cy"))
            //console.log("100")
            //console.log(rx + cx)
        d3.select(".mask-poster")
            .select("svg")
            .append("text")
            .attr("id", "text-title-1")
            .attr("x", cx - 15)
            .attr("y", cy + 10)
            .text("A")
            .attr("font-family", "argentum")
            .attr("fill", "white")
            .attr("font-weight", 20)
            .attr("font-size", 12)
            //} else if ()
    } else if (d3.select(this).attr("id") == "title-2") {
        var x = +f(d3.select(this).attr("x"))
        var y = +f(d3.select(this).attr("y"))
        var width = +f(d3.select(this).attr("width"))
        var height = +f(d3.select(this).attr("height"))



        d3.select(".mask-poster")
            .select("svg")
            .append("text")
            .attr("id", "text-title-2")
            .attr("x", x + width / 2 - 25)
            .attr("y", y + height / 2)
            .text("Film by")
            .attr("font-family", "argentum")

        //.attr("font-family", "parasite")
        .attr("fill", "white")
            .attr("font-size", 12);

    } else if (d3.select(this).attr("id") == "tittle-3") {
        var x = +f(d3.select(this).attr("x"))
        var y = +f(d3.select(this).attr("y"))
        var width = +f(d3.select(this).attr("width"))
        var height = +f(d3.select(this).attr("height"))



        d3.select(".mask-poster")
            .select("svg")
            .append("text")
            .attr("id", "text-tittle-3")
            .attr("x", x + width / 2 - 100)
            .attr("y", y + height / 2)
            .text("Bong Joon-Ho")
            .attr("font-family", "argentum")
            .attr("fill", "white")
            .attr("font-size", 12)
    }
}

function handleMouseOut(d) {
    d3.select(this).style("opacity", 0)
    console.log("text-" + d3.select(this).attr("id"))
    d3.select("#text-" + d3.select(this).attr("id")).remove()

}
//console.log(d3.select(".clip-svg").attr("height"))
/*d3.select("img")
    .attr("srcset", "images/parasite.jpg ")
    //.attr("class", "clip-me")
    //.style("clip-path", "circle( 40px at 150px 250px)")
    // .style("clip-path", "circle( 45px at 225px 525px)")

/*d3.select("body")
    .attr("class", "clip-me")
    .style("clip-path", "circle( 40px at 150px 250px)")
    .style("clip-path", "circle( 45px at 225px 525px)")*/