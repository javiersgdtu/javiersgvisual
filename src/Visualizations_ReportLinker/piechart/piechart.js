function parserPieData(t) { var e = d3.format(".1f"),
        a = d3.sum(t, (function(t) { return t.doc_count })); return t.forEach(t => { t.percentage = +e(t.doc_count / a * 100), t.key = t.key.substring(t.key.indexOf("##") + 2) }), t }

function drawPieChart(t) { var e = d3.min([500, 500]) / 2,
        a = d3.select("#div-pie").attr("class", "svg-container").style("width", "30%").style("padding-bottom", "30%").append("svg").attr("preserveAspectRatio", "none").attr("viewBox", "0 0 550 550").attr("class", " svg-content").append("g").attr("transform", "translate(" + (e + 10 + 5) + "," + (e + 10 + 5) + ")"),
        n = d3.pie().value(t => t.percentage)(t),
        r = d3.arc().innerRadius(100).padAngle(.02).outerRadius(e),
        i = d3.arc().innerRadius(120).padAngle(.03).outerRadius(e + 10),
        s = a.selectAll("path").data(n).enter().append("path").attr("d", r),
        o = d3.scaleOrdinal(["#22DB8E", "#E30806", "#3D4B57"]).domain(["Positive", "Negative", "Neutral"]);
    s.attr("fill", t => o(t.data.key)).attr("fill-opacity", .3).attr("stroke", t => o(t.data.key)).attr("stroke-width", "2px").attr("stroke-opacity", 1).on("mouseover", (function() { d3.select(this).transition().duration(500).attr("d", i) })).on("mouseout", (function() { d3.select(this).transition().duration(0).attr("d", r) })).on("click", (function() { var t = new CustomEvent("dataviz.sentimentpie.click", { detail: { industry: d.key_id } });
        document.dispatchEvent(t) }));
    a.selectAll("text").data(n).enter().append("text").attr("x", t => (t.center = r.centroid(t), t.center[0] - 10)).attr("y", t => t.center[1]).attr("fill", t => o(t.data.key)).attr("font-weight", "bold").text(t => t.data.percentage + " %");
    a.append("foreignObject").attr("width", 400).attr("height", 500).attr("x", -40).attr("y", -50).append("xhtml:span").html("<p style='font-size:20px'><span style='color: #22DB8E;'>Positive</span></br> <span style='color: #3D4B57;'>Neutral</span></br> <span style='color: #E30806;'>  Negative</span></p>"), document.addEventListener("dataviz.industrychart.click", t => {}, !1) }
d3.json(api).then(t => { drawPieChart(parserPieData(t.aggregations.sentiment.buckets)) }).catch(t => {});