function parserBarData(t) { return (t = t.filter((function(t, e) { return e < 10 }))).forEach((function(t) { t.key_id = t.key.substring(0, t.key.indexOf("##")), t.key_title = t.key.substring(t.key.indexOf("##") + 2), t.doc_count = t.doc_count })), t }

function drawBarChart(t) {
    document.addEventListener("dataviz.industrychart.click", t => {}, !1);
    var e = 50,
        n = 100,
        a = 100,
        r = d3.select("#div-bar").attr("class", "svg-container").style("width", "60%").style("padding-bottom", "40%").style("background-color", "#E7EBED").append("svg").attr("preserveAspectRatio", "none").attr("viewBox", `0 0 ${600+n} ${400+a+e}`).attr("class", " svg-content").append("g").attr("transform", "translate(" + n + "," + e + ")"),
        i = d3.select("#div-bar").append("div").attr("class", "mytooltip"),
        o = d3.scaleBand().domain(t.map((function(t) { return t.key_title }))).range([0, 400]).padding(.1),
        s = d3.scaleLinear().domain([0, d3.max(t, (function(t) { return t.doc_count }))]).range([0, 500]),
        d = d3.axisLeft(o),
        c = r.selectAll("rect").data(t).enter().append("rect").attr("fill", "#005aff");
    c.attr("x", 0).attr("y", t => o(t.key_title)).attr("width", 0).attr("height", o.bandwidth()).attr("rx", "1").on("mouseover", (function(t, e) {
        var n;
        d3.select(this).style("cursor", "pointer"), d3.select(this).attr("class", "").attr("fill", "#fcd35c"), i.transition().duration(200).style("visibility", "visible").style("left", t.layerX + 20 + "px").style("top", t.layerY - 30 + "px").text(" Count: " + (5 == (n = e.doc_count).toString().length ? (1e4 * Math.round(n / 1e4)).toString().substring(0, 2) + "k" : 4 == n.toString().length ? "+" + (1e3 * Math.round(n / 1e3)).toString().substring(0, 1) + "K" : 3 == n.toString().length ? 10 * Math.round(n / 10) : n))
    })).on("mouseout", (function() { d3.select(this).attr("fill", "#005aff"), i.transition().duration(200).style("visibility", "hidden") })).on("click", (function(t, e) {
        var n = new CustomEvent("dataviz.industrychart.click", { detail: { industry: e.key_id } });
        document.dispatchEvent(n);
        console.log(n.detail)
    })), c.transition().duration(1e3).attr("width", (function(t) { return s(t.doc_count) })), r.append("g").attr("class", "axisY").call(d).call(t => t.select(".domain").remove())
}
d3.json(api).then(t => { drawBarChart(parserBarData(t.aggregations.sector.buckets)) }).catch(t => {});