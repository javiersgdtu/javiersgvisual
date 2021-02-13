d3.csv("/assets/data/data_circ.csv", function(d, e) {
    var b = chordMpr(e);
    b.addValuesToMap("root")
        .addValuesToMap("node")
        .setFilter(function(c, b, d) {
            return c.root === b.name && c.node === d.name;
        })
        .setAccessor(function(b, d, e) {
            return b[0] ? +b[0].index : 0;
        });
    drawChords(b.getMatrix(), b.getMap());
});

function drawChords(d, e) {
    var b = 1e3 / 2.2 - 110,
        c = d3
        .chord()
        .padAngle(0.05)
        .sortSubgroups(d3.descending)
        .sortChords(d3.descending),
        h = d3
        .arc()
        .innerRadius(b)
        .outerRadius(b + 20),
        k = d3.ribbon().radius(b),
        
        f = d3
        .select(".container")
        .append("div")
        .attr("class","divgraph")
        .append("svg:svg")
        //.attr("width", 800)
        //.attr("height", 800)
        .attr("viewBox", "-800 50 1600 900")
        .append("svg:g")
        .attr("id", "circle")
        .attr("transform", "translate(100,500)")
        .datum(c(d));
    f.append("circle").attr("r", b + 20);
    var l = chordRdr(d, e),
        g = d3.scaleOrdinal(d3.schemeCategory20).domain(e);
    console.log(c(d));
    c = f
        .selectAll("g.group")
        .data(function(a) {
            return a.groups;
        })
        .enter()
        .append("svg:g")
        .attr("class", "group");
    c.append("svg:path")
        .style("stroke", "grey")
        .style("fill", function(a, b) {
            return g(b);
        })
        .attr("d", h)
        .on("mouseover", function(a, b) {
            console.log(a)
            f.selectAll("path.chord").classed("fade", function(a) {
                return a.source.index != b && a.target.index != b;
            });
            // console.log(f.selectAll("path.chord"));
        });
    c.append("svg:text")
        .each(function(a) {
            a.angle = (a.startAngle + a.endAngle) / 2;
        })
        .attr("dy", ".35em")
        .style("font-family", "helvetica, arial, sans-serif")
        .style("font-size", "15px")
        .attr("text-anchor", function(a) {
            return a.angle > Math.PI ? "end" : null;
        })
        .attr("transform", function(a) {
            return (
                "rotate(" +
                ((180 * a.angle) / Math.PI - 90) +
                ")translate(" +
                (b + 26) +
                ")" +
                (a.angle > Math.PI ? "rotate(180)" : "")
            );
        })
        .text(function(a) {
            return l(a).gname;
        });
    f.selectAll("path.chord")
        .data(function(a) {
            return a;
        })
        .enter()
        .append("svg:path")
        .attr("opacity", 0)
        .transition()
        .duration(2e3)
        .attr("opacity", 1)
        .attr("class", "chord")
        .style("stroke", "grey")
        .attr("fill", function(a) {
            return g(a.source.index);
        })
        .attr("d", k.radius(b));
}
d3.select(".container")
    .append("div")
    .attr("class", "divtext")
    .html(
        "<span style='font-size:16px;'>Patient flow in hospital</span> <br><br><span font-size:12.5px;>This chord graph represents the different stages in which patients stay in a clinic. The width of the different flows represents the amount of patients going from one stage to another.</span><span style='font-size:14px;color:#A9A9A9'> Made with D3</span> "
    );
