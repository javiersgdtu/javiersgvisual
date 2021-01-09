function parserMapData(t) { return t.forEach((function(t) { t.key_id = t.key.substring(0, t.key.indexOf("##")), t.key_title = t.key.substring(t.key.indexOf("##") + 2), t.doc_count = t.doc_count })), t }
var files = ["world.json", api];

function drawMapChart(t) {
    document.addEventListener("dataviz.map.click", t => {}, !1);
    var e = t[0],
        a = parserMapData(t[1].aggregations.country.buckets),
        r = new Map(a.map(t => [t.key_title, [t.doc_count, t.key_id]])),
        n = 800,
        o = d3.select("#div-map").attr("class", "svg-container").style("width", "50%").style("padding-bottom", "50%").append("svg").attr("preserveAspectRatio", "none").attr("viewBox", "0 0 800 800").attr("class", " svg-content").append("g"),
        i = o.append("defs").append("linearGradient").attr("id", "gradient-legend");
    i.attr("x1", "0%").attr("y1", "0%").attr("x2", "100%").attr("y2", "0%"), i.append("stop").attr("offset", "0%").attr("stop-color", "#d5e4ff"), i.append("stop").attr("offset", "100%").attr("stop-color", "#005aff");
    var d = d3.select("#div-map").append("div").attr("class", "mytooltip"),
        s = (d3.geoCentroid(e), d3.geoMercator().fitSize([800, n], e)),
        p = d3.geoPath().projection(s),
        l = e.features,
        c = d3.max(a, t => t.doc_count),
        f = d3.scaleLinear().domain([1, c]).range(["#d5e4ff", "#005aff"]);
    o.selectAll("path").data(l).enter().append("path").attr("d", t => p(t)).attr("fill", (function(t) { return t.total = r.get(t.properties.name) ? r.get(t.properties.name)[0] : 0, 0 == t.total ? "#F6F7F8" : f(t.total) })).on("mouseover", (function(t, e) { d3.select(this).style("cursor", "pointer"), d.transition().duration(200).style("visibility", "visible").style("left", t.layerX + 20 + "px").style("top", t.layerY - 30 + "px").text(` ${e.properties.name}: ${e.total}`) })).on("mouseout", (function(t, e) { d.transition().duration(200).style("visibility", "hidden") })).on("click", (function(t, e) {
        var a = new CustomEvent("dataviz.map.click", { detail: { geography: r.get(e.properties.name) ? r.get(e.properties.name)[1] : "" } });
        document.dispatchEvent(a);
        console.log(a.detail)
    }));
    o.append("g").attr("id", "legend").append("rect").attr("x", 40).attr("y", 700).attr("width", 200).attr("height", 20).style("stroke-width", 4).style("stroke", "none").style("opacity", .8).attr("fill", "url(#gradient-legend)"), o.select("#legend").append("text").attr("x", 20).attr("y", 714).text("1"), o.select("#legend").append("text").attr("x", 250).attr("y", 714).text(c)
}
Promise.all(files.map(t => d3.json(t))).then((function(t) { drawMapChart(t) }));