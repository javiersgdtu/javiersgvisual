//Input Data formatting function.
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

    }); //I am Using sector aggregation because i didnt find concepts in the json file.

    var Worddata = [...data.aggregations.company.buckets, ...data.aggregations.indicators.buckets, ...data.aggregations.sector.buckets];

    Worddata.forEach(function(d) {
        d.key_id = d.key.substring(0, d.key.indexOf("##"))
        d.text = d.key.substring(d.key.indexOf("##") + 2)
        d.size = d.doc_count
    })
    return Worddata
}

/* If you are using 3 different search API result files, to load data from the 3 of them you can use (instead of d3.json()):

Promise.all(["companyAPIresult","indicatorsAPIresult","conceptsAPIresult"].map(url => d3.json(url))).then(function(data) {
    var parser = parserWordData(data);
    drawWordChart(parser)
});

*/
d3.json("../Output-Analytics.json") //using output Analytics.json file. Search API results.
    .then((data) => {

        var parser = parserWordData(data);
        //console.log(parser) //Json extrack. Search API results.
        drawWordChart(parser);
    })
    .catch((error) => {
        console.log('error', error);
    });

//function to draw the Tags Cloud
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


    var fontScale = d3.scaleLinear([10, 60]).domain(d3.extent(data, (d) => d.size)); //If you want the tags' font size to be bigger change the [10,60] array. 10 = min size of the tags(px);60 = max size of the tags(px)

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