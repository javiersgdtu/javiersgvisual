function parserTrendData(t) { var a = d3.utcParse("%Y-%m-%dT%H:%M:%S.%f%Z"); return t.forEach((function(t) { t.key_as_string = a(t.key_as_string) })), t }

function drawTrendChart(t) { var a = 1200,
        e = 20,
        r = 100,
        n = 40,
        i = 5,
        s = d3.select("#div-trend").attr("class", "svg-container").style("width", "80%").style("padding-bottom", "30%").append("svg").attr("preserveAspectRatio", "none").attr("viewBox", `0 0 ${a+r+i} ${400+e+n}`).attr("class", " svg-content").append("g").attr("transform", "translate(" + i + "," + e + ")"),
        o = d3.select("#div-trend").append("div").attr("class", "mytooltip"),
        d = d3.extent(t, t => t.doc_count),
        l = d3.scaleLinear().domain(d).range([400, 0]),
        c = d3.extent(t, t => t.key_as_string),
        p = (c[1] - c[0]) / 864e5,
        u = d3.scaleTime().domain(c).range([0, a]),
        y = d3.area().curve(d3.curveMonotoneX).x(t => u(t.key_as_string)).y0(l(30)).y1(t => l(t.doc_count)),
        v = d3.line().curve(d3.curveMonotoneX).x(t => u(t.key_as_string)).y(t => l(t.doc_count)),
        g = s.append("path"),
        k = s.append("path");
    g.attr("fill", "#d5e4ffff").attr("stroke", "none").attr("d", y(t)), k.attr("fill", "none").attr("stroke", "#005AFF").attr("stroke-width", 2).attr("d", v(t)); for (var _, f = d3.timeFormat("%b"), m = d3.timeFormat("%b %d"), h = (_ = d[1], 50 * Math.ceil(_ / 50)), x = [], F = 0; F <= 3; F++) x.push(F * h / 4 + h / 4); var b = d3.axisBottom(u);
    p > 60 ? b.tickFormat(f) : b.tickFormat(m); var w = d3.axisRight(l).tickValues(x).tickSize(a);
    s.append("g").selectAll("circle").data(t).enter().append("circle").attr("cx", t => u(t.key_as_string)).attr("cy", t => l(t.doc_count)).attr("r", 4).attr("fill", "#005AFF").attr("stroke", "white").attr("stroke-width", 2).on("mouseover", (function(t, a) { d3.select(this).transition().duration(1e3).attr("fill", "#F9E254").attr("r", 6), o.transition().duration(200).style("visibility", "visible").style("left", t.layerX + 20 + "px").style("top", t.layerY - 30 + "px").text(`${m(a.key_as_string)}- Count: ${a.doc_count}`) })).on("mouseout", (function(t, a) { d3.select(this).transition().duration(200).attr("fill", "#005AFF").attr("r", 4), o.transition().duration(200).style("visibility", "hidden") }));
    s.append("g").attr("class", "axisY").call(w).call(t => t.select(".domain").remove()).call(t => t.selectAll(".tick line").attr("stroke-opacity", .5).attr("stroke-dasharray", "2,2")).call(t => t.selectAll(".tick text").attr("x", 4).attr("dy", -4)), s.append("g").attr("class", "axisX").attr("transform", "translate(0, 400)").call(b) }
d3.json(api).then(t => { drawTrendChart(parserTrendData(t.aggregations.hits_over_time.buckets)) }).catch(t => {});