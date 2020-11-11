var width = d3.select("#house-svg").attr("width") / 2
var height = d3.select("#house-svg").attr("height") / 2
var formatMinute = d3.format(".0f")
var currentValue = 0;
var moving = false; //Variable informativa
//var circles = [];
var svg = d3.select("#house-svg")

/*d3.select(".background-img")
    .transition()
    .duration(5000)
    .delay(1000)
    .style("opacity", 0);*/
d3.select(".container")
    .style("opacity", 0);
//.style("visibility", "hidden")
//d3.select("#house-color").style("z-index", 50)
//d3.select("#centers").style("z-index", 25)

var sel = d3.select("#house-color").selectAll("g").filter(function() {
    return d3.select(this).attr('id').match('arrow-') != null;
});
console.log(d3.select("#house-color").selectAll("polygon")) //.text().match("#arrow-")
    //svg.selectAll("#arrow-basem").attr("opacity", 0)
    //d3.selectAll()
d3.select("#house-color").selectAll("polygon").style("opacity", 0)
var tooltip = d3.select(".div-svg").append("div")
    .attr("class", "tooltip")
    .style("position", "absolute") //Para obtener la posicion correcta sobre los circulos
    .style("pointer-events", "none") //Para evitar el flicker
    .style("visibility", "hidden")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    //.style("z-index", 100);


//Title.
var title = svg
    .append("text")
    .attr("x", d3.select("#house-svg").attr("width") / 4)
    .attr("y", 70)
    .text("PARASITE")
    .attr("font-family", "parasite")
    .attr("font-size", 40);

//console.log(d3.select("#livingroom-color").centroid());

//Handle MouseOver and MouseOut Paths
d3.selectAll("path").style("opacity", 0.5)
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);

//Floor maps
d3.selectAll("#daughter-room,#first_floor-corridor,#son-room,#mr__mrs_park_room")
    .attr("class", "first");
d3.selectAll("#kitchen,#garden-color,#livingroom,#entrance,#secondary-garden")
    .attr("class", "zero");
d3.selectAll("#garage,#entrance-street,#basement,#cave,#entrance-intercom")
    .attr("class", "street-under");

//Title Floor Map
svg.append("text")
    .attr("class", "house-map")
    .attr("x", 1320)
    .attr("y", 450)
    .text("HOUSE MAP")
    .attr("font-family", "parasite")
    .attr("font-size", 20);


//Change opacity when change on box
var inputElems = d3.selectAll("input");
inputElems.on("change", function() {
    var floorelem = svg.selectAll("." + d3.select(this).attr("id"));
    var is_check = floorelem.attr("checkbox") || 0;
    var opacity = floorelem.style("opacity");
    // console.log(d3.select(this).attr("id"))
    floorelem.attr("checkbox", function() {
        return (is_check != 1) ? 1 : 0;
    }).style("opacity", function() {
        return (opacity == 1) ? 0.5 : 1;
    })
});

//Handle mouseOver
function handleMouseOver() {
    d3.select(this).transition().duration(500)
        .style("stroke-width", "10px").style("opacity", 1)

    d3.select("#area").remove(); //Remove previous text.

    //console.log(d3.select(this.parentNode).select("title").text().match("Stairs"))
    console.log(d3.select(this.parentNode).select("title").text().match("Stairs") == null)
        //If I do the abovr console.log here and inside the .text function then I get opposite results. It is like if I were selecting two different elements

    var elemtitle = d3.select(this).select("title")
    var parenttitle = d3.select(this.parentNode).select("title")
    console.log(parenttitle.text())
    parenttitle.text().match("Stairs|Intercom|Kitchen") != null ? d3.select(this.parentNode).selectAll("polygon").transition().duration(1000).style("opacity", 1) : ""

    d3.select("#house-svg")
        .append("text")
        .attr("id", "area")
        //.text(d3.select(this).attr("id"))
        .text(function(d) {
            //console.log(parenttitle.text().match("Stairs") == null ? elemtitle.text() : parenttitle.text())
            return parenttitle.text().match("Stairs|Intercom|Kitchen") == null ? elemtitle.text() : parenttitle.text()
                //d3.select(this) d3.select(this).select("title").text()
        })
        .attr("x", d3.select("#house-svg").attr("width") / 4 + 50)
        .attr("y", 100)

};

//Handle mouseOut
function handleMouseOut() {
    var is_check = d3.select(this).attr("checkbox")
    d3.select(this)
        .transition()
        .duration(500)
        .style("stroke-width", "0.5px")
        .style("opacity", function() {
            return (is_check == 1) ? 1 : 0.5
        });
    var parenttitle = d3.select(this.parentNode).select("title")
    parenttitle.text().match("Stairs|Intercom|Kitchen") != null ? d3.select(this.parentNode).selectAll("polygon").transition().duration(1000).style("opacity", 0) : ""

    d3.select("#area").remove();
}

//Handle changes in Checkbox
/*function handleCheck(slider) {

    console.log(slider.checked)
    if (slider.checked) {
        //d3.select("#house-heat").style("visibility", "visible");


    } else {
        // d3.select("#house-heat").style("visibility", "hidden");
    }
}*/