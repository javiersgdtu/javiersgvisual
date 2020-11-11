circleData = Array.from(Array(10).keys())

console.log(circleData)
var circles = d3.select("svg")
    .selectAll("circle")
    .data(circleData)
    .enter()
    .append("circle")
    .attr("id", (d, i) => "character" + i)
    .attr("cx", d3.select("#dot1").attr("cx"))
    .attr("cy", d3.select("#dot1").attr("cy"))
    .attr("r", 5);
console.log(d3.select("path").node().getTotalLength())
circles.transition()
    .duration(1000)
    //.delay(1000)
    .tween("pathTween", function() {
        check = getRandomInt(4)

        var path = d3.select("#path" + check)
        return pathTween(path)
    })
    .transition()
    .duration(1000)
    //.delay(1000)
    .tween("pathTween", function() {
        check = getRandomInt(4)

        var path = d3.select("#path" + check)
        return pathTween(path)
    })

/*.attr("cx", function(d, i) {
    console.log(i)
    check = getRandomInt(5)
    console.log(d3.select("#dot" + check).attr("cx"))
    return d3.select("#dot" + check).attr("cx")
})
.transition()
.duration(function(d, i) {
    return i * 300
})
.attr("cx", function(d, i) {
    check = getRandomInt(5)

    return d3.select("#dot" + check).attr("cx")
})
.attr("cy", function(d, i) {
    check = getRandomInt(5)

    return d3.select("#dot" + check).attr("cy")
})*/



function pathTween(path) {
    var length = path.node().getTotalLength(); // Get the length of the path
    var r = d3.interpolate(0, length); //Set up interpolation from 0 to the path length
    return function(t) {
        var point = path.node().getPointAtLength(r(t)); // Get the next point along the path
        d3.select(this) // Select the circle
            .attr("cx", point.x) // Set the cx
            .attr("cy", point.y) // Set the cy
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}




//Create coordinate array of objects
//console.log(d3.select("#dotI").attr("cx"))