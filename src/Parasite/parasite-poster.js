srcset = "images/parasite.jpg 3x"


var f = d3.format(".1f")

//Morse Rectangles.
var rect = //d3.select(".mask-poster")
    d3.select("#mask")
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
var ellipse = //d3.select(".mask-poster")
    d3.select("#mask")
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

d3.select("#path3751-5-4-1-9-6-3")
    .transition()
    .duration(1000)
    .delay(2000)
    .style("opacity", 0.5)

var cx = +f(d3.select("#path3751-5-4-1-9-6-3").attr("cx"))
    //var ry = +f(d3.select(this).attr("ry"))
var cy = +f(d3.select("#path3751-5-4-1-9-6-3").attr("cy"))

//Arrow
d3.select(".mask-poster")
    .select("svg")
    .append("text")
    .attr("id", "arrow")
    .html("&darr;")
    .style("opacity", 0)
    .attr("x", cx - 12)
    .attr("y", cy + 10)
    .transition()
    .duration(1000)
    .delay(2000)
    //.attr("font-family", "argentum")
    //.attr("fill", "white")
    .attr("font-weight", 40)
    .attr("font-size", 30)
    .style("opacity", 1)


//Add text to 3 elements
var title1 = d3.select("#title-1")
var title2 = d3.select("#title-2")
var title3 = d3.select("#tittle-3")

var cx = +f(title1.attr("cx"))
var cy = +f(title1.attr("cy"))

var x_t2 = +f(title2.attr("x"))
var y_t2 = +f(title2.attr("y"))
var width_t2 = +f(title2.attr("width"))
var height_t2 = +f(title2.attr("height"))

var x_t3 = +f(title3.attr("x"))
var y_t3 = +f(title3.attr("y"))
var width_t3 = +f(title3.attr("width"))
var height_t3 = +f(title3.attr("height"))

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
    .style("opacity", 0)


d3.select(".mask-poster")
    .select("svg")
    .append("text")
    .attr("id", "text-title-2")
    .attr("x", x_t2 + width_t2 / 2 - 25)
    .attr("y", y_t2 + height_t2 / 2)
    .text("Film by")
    .attr("font-family", "argentum")
    //.attr("font-family", "parasite")
    .attr("fill", "white")
    .attr("font-size", 12)
    .style("opacity", 0);


d3.select(".mask-poster")
    .select("svg")
    .append("text")
    .attr("id", "text-tittle-3")
    .attr("x", x_t3 + width_t3 / 2 - 100)
    .attr("y", y_t3 + height_t3 / 2)
    .text("Bong Joon-Ho")
    .attr("font-family", "argentum")
    .attr("fill", "white")
    .attr("font-size", 12)
    .style("opacity", 0);


function handleMouseOver() {
    d3.select(this).style("fill", "white")
        .style("opacity", 0.5);

    if (d3.select(this).attr("id") == "title-1") {
        d3.select("#text-title-1")
            .style("opacity", 1)
    } else if (d3.select(this).attr("id") == "title-2") {
        d3.select("#text-title-2")
            .style("opacity", 1)
    } else if (d3.select(this).attr("id") == "tittle-3") {
        d3.select("#text-tittle-3")
            .style("opacity", 1)
    } else if (d3.select(this).attr("id") == "path3751-5-4-1-9-6-3") {
        d3.select("#arrow").transition().duration(500).attr("font-size", 40)
            //remove()
    }
}

function handleMouseOut() {
    d3.select(this).transition().duration(200).style("opacity", 0)
        //console.log("text-" + d3.select(this).attr("id"))
    d3.select("#text-" + d3.select(this).attr("id")).style("opacity", 0)
        // d3.select("#text-" + d3.select(this).attr("id")).remove()
    if (d3.select(this).attr("id") == "path3751-5-4-1-9-6-3") {
        d3.select("#arrow").transition().duration(500).style("opacity", 0).remove()
    }

}
////console.log(d3.select(".clip-svg").attr("height"))
/*d3.select("img")
    .attr("srcset", "images/parasite.jpg ")
    //.attr("class", "clip-me")
    //.style("clip-path", "circle( 40px at 150px 250px)")
    // .style("clip-path", "circle( 45px at 225px 525px)")

/*d3.select("body")
    .attr("class", "clip-me")
    .style("clip-path", "circle( 40px at 150px 250px)")
    .style("clip-path", "circle( 45px at 225px 525px)")*/