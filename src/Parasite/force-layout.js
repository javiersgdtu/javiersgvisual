var svg = d3.select("svg")

var width = svg.attr("width") / 2;
var height = svg.attr("height") / 2;
var formatMinute = d3.format(".0f")
var currentValue = 0;
var moving = false; //Variable informativa
//var circles = [];


//force layout creation
var n = 20, // nb of circles
    m = 3 // d3.selectAll("path").size(), // nb of clusters= nb of areas in house
maxRadius = 12,
    xCenter = [100, 300, 500]; //center of all rooms
var nodes;
//var clusters = new Array(m);

/*var nodes = d3.range(n).map(function() { //create it dinamically according to each scene.
    var i = Math.floor(Math.random() * m),
        r = Math.sqrt((i + 1) / m * -Math.log(Math.random())) * maxRadius, //
        d = {
            cluster: i,
            radius: r
        };
    //if (!clusters[i] || (r > clusters[i].radius)) clusters[i] = d;
    return d;
});
console.log(nodes)

var simulation = d3.forceSimulation(nodes)
    .force('charge', d3.forceManyBody().strength(5))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius(function(d) {
        return d.radius
    }))
    .force('x', d3.forceX().x(function(d) {
        return xCenter[d.cluster]; //or d.category
    }))
    .on('tick', ticked);*/

//slider creation
var playButton = d3.select("#play-button");


d3.json("circles-v2.json").then(function(data) {

    var xScale = d3.scaleLinear()
        .domain(d3.extent(data, function(d) {
            return d.scene_lenght
        })) //Max duration
        .range([0, width])
        .clamp(true);


    var slider = svg.append("g")
        .attr("class", "slider")
        .attr("transform", "translate(" + 50 + "," + 100 + ")");

    slider.selectAll("line")
        .data(data)
        .enter()
        .append("line")
        .attr("class", "track")
        .attr("x1", xScale(d.scene_lenght)) //xScale.range()[0]
        .attr("x2", xScale.range()[1]) //xScale.range()[1]
        //.attr("y1", 30)
        //.attr("y2", 30)
        .select(function() {
            //console.log(this.parentNode)
            return this.parentNode.appendChild(this.cloneNode(true)); //select the g element and append a new line,
            //cloned from the same one=> same attributes
        })
        .attr("class", "track-inset")
        .select(function() {
            return this.parentNode.appendChild(this.cloneNode(true));
        })
        .attr("class", "track-overlay")
        .call(d3.drag()
            .on("start.interrupt", function() {
                slider.interrupt();
            })
            .on("start drag", function() {
                currentValue = d3.event.x;
                console.log(xScale.invert(currentValue))
                update(xScale.invert(currentValue)); //invert: given the value of a range gives back its correspondant domain.
            })
        );

    slider.insert("g", ".track-overlay") //Insert an element before the first track-overlay classed element that we find.
        .attr("class", "ticks")
        .attr("transform", "translate(0," + 18 + ")")
        .selectAll("text")
        .data(xScale.ticks(10))
        .enter()
        .append("text")
        .attr("x", xScale)
        //.attr("y", 40)
        .attr("text-anchor", "middle")
        .text(function(d) {
            return d
        });

    //Circle on slider
    /*var handle = slider.insert("circle", ".track-overlay")
        .attr("class", "handle")
        .attr("r", 9);*/

    var label = slider.append("text")
        .attr("class", "label")
        .attr("text-anchor", "middle")
        .text(0)
        .attr("transform", "translate(0," + (-25) + ")")

    circles = data
        //drawPlot(circles); //at the beggining i dont want to see all the  circles plotted

    //Creation of circle radius according to scene
    circles.forEach(function(d, i) {
        d.radius = 5 + (i);
    });

    playButton
        .on("click", function() {
            var button = d3.select(this);
            if (button.text() == "Pause") {
                moving = false; //Variable informativa
                clearInterval(timer);
                // timer = 0;
                button.text("Play");
            } else {
                moving = true;
                timer = setInterval(step, 100); //Do step every 100 miliseconds
                button.text("Pause");
            }
            console.log("Slider moving: " + moving);
        })
});




//Handle MouseOver and MouseOut Paths
d3.selectAll("path").style("opacity", 0.5)
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);



//Handle mouseOver
function handleMouseOver() {
    d3.select(this).transition().duration(500)
        .style("stroke-width", "10px").style("opacity", 1)

    d3.select("#area").remove(); //Remove previous text

    d3.select("svg")
        .append("text")
        .attr("id", "area")
        .text(d3.select(this).attr("id"))
        .attr("x", d3.select("svg").attr("width") / 4 + 50)
        .attr("y", 100)

};

//Handle mouseOut
function handleMouseOut() {
    d3.select(this)
        .transition()
        .duration(500)
        .style("stroke-width", "0.5px")
        .style("opacity", 0.5);

    d3.select("#area").remove();
}

function step() {
    update(xScale.invert(currentValue));
    currentValue = currentValue + (width / 151); //to decide the step length.
    console.log(currentValue)
    if (currentValue > width) {
        moving = false;
        currentValue = 0;
        clearInterval(timer);
        // timer = 0;
        playButton.text("Play");
        console.log("Slider moving: " + moving);
    }
}

//Update the circle handle position
function update(h) {
    var roundMinute = formatMinute(h);
    // update position and text of label according to slider scale
    //handle.attr("cx", xScale(h));
    label
        .attr("x", xScale(h))
        .text(roundMinute);


    console.log(circles)
        // filter data set and redraw plot
    var dataFilt = circles.filter(function(d) {
        console.log(roundMinute)
        return (roundMinute == d.minute) ? d.character : ""
    })


    console.log(dataFilt)
    drawPlot(dataFilt);

}

function drawPlot(data) {

    nodes = data.map(function(d) { //create it dinamically according to each scene.
        //var i =d.,
        // r = , //Math.sqrt((i + 1) / 3 * -Math.log(Math.random())) * maxRadius, 
        d = {
            cluster: d.location,
            radius: d.radius
        };
        //if (!clusters[i] || (r > clusters[i].radius)) clusters[i] = d;
        return d;
    });
    console.log(nodes)

    var simulation = d3.forceSimulation(nodes)
        //.force('charge', d3.forceManyBody().strength(5))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(function(d) {
            return d.radius
        }))
        .force('x', d3.forceX().x(function(d) {
            return xCenter[d.cluster]; //or d.category
        }))
        .on('tick', ticked);

    console.log(data)

    /*var dataselect = d3.select("#livingroom")
        .selectAll("circle")
        .data(data)


    dataselect.enter()
        .append("circle")
        .merge(dataselect)
        .attr("id", (d) => d.character)
        .attr("cx", (d) => 200 + (d.character * 80))
        .attr("cy", 200)
        .transition()
        .duration(20)
        .ease(d3.easeCircle)
        .attr("r", (d) => d.radius);*/

    //dataselect.exit().remove();

}

function ticked() {
    var u = d3.select('svg')
        .selectAll('circle')
        .data(nodes)

    u.enter()
        .append('circle')
        .attr('r', function(d) {
            return d.radius;
        })
        .merge(u)
        .attr('cx', function(d) {
            return d.x
        })
        .attr('cy', function(d) {
            return d.y
        })

    u.exit().remove()
}