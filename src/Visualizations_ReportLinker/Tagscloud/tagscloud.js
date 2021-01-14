function parserWordData(data) {

    data.aggregations.company.buckets.forEach(function(d) {
        d.category = "company",
            d.cat_color = "#005aff"

    });
    data.aggregations.indicators.buckets.forEach(function(d) {
        d.category = "indicators",
            d.cat_color = "#FF6700"
    });

    data.aggregations.sector.buckets.forEach(function(d) {
        d.category = "concept",
            d.cat_color = "#22DB8E"

    });

    var Worddata = [...data.aggregations.company.buckets, ...data.aggregations.indicators.buckets, ...data.aggregations.sector.buckets];
    console.log(Worddata)
    Worddata.forEach(function(d) {
        d.key_id = d.key.substring(0, d.key.indexOf("##"))
        d.text = d.key.substring(d.key.indexOf("##") + 2)
        d.size = d.doc_count
    })
    return Worddata
}

d3.json("../Output-Analytics.json")
    .then((data) => {
        var parser = parserWordData(data);
        drawWordChart(parser);
    })
    .catch((error) => {
        console.log('error', error);
    });


function drawWordChart(data) {
    document.addEventListener("dataviz.tagscloud.click", e => console.log(e.detail), false);

    var height = 800;
    var width = 1000;

    var margin = ({ top: 50, right: 60, bottom: 100, left: 50 })

    var svg_word = d3.select('#div-word')
        .attr("class", "svg-container")
        .style("width", "50%")
        .style("padding-bottom", "40%")
        .style("background-color", "#E7EBED")
        .append('svg')
        .attr("preserveAspectRatio", "none")
        .attr("viewBox", `0 0 ${(width+margin.right)} ${(height+ margin.bottom + margin.top)}`)
        .attr("class", " svg-content")
        .append("g")
        .attr("transform", "translate(" + margin.right + "," + margin.top + ")");


    var fontScale = d3.scaleLinear([10, 60]).domain(d3.extent(data, (d) => d.size));

    var layout = d3.layout.cloud()
        .size([width, height])
        .words(data)
        .fontSize(function(d) { return fontScale(d.size); })
        .rotate(function() { return ~~(Math.random() * 2) * 90; })
        .font("Impact")
        .on("end", draw);

    layout.start();

    function draw(words) {
        svg_word
            .append("g")
            .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
            .selectAll("text")
            .data(words)
            .enter()
            .append("text")
            .style("font-size", function(d) {
                return d.size + "px";
            })
            .attr("text-anchor", "middle")
            .style("font-family", "Impact")
            .style("fill", (d) => d.cat_color)
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) { return d.text; })
            .on("mouseover", function(event, d) {
                d3.select(this).style("cursor", "pointer");

            })
            .on("click", function(event, d) {

                var evt = new CustomEvent('dataviz.tagscloud.click', {
                    detail: {
                        type: d.category,
                        id: d.key_id
                    },
                });
                document.dispatchEvent(evt);

            });
    }
}