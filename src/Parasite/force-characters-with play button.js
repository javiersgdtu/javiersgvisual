//force layout creation
/*var n = 20, // nb of circles
    m = 3 // d3.selectAll("path").size(), // nb of clusters= nb of areas in house
maxRadius = 12,
    xCenter = [100, 300, 500]; //center of all rooms */

/*var RoomLoc = [{
            'name': 'Da'
        },
        {

        }
    ]*/
//var nodes;
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

/*var playButton = d3.select("#play-button");

var xScale = d3.scaleLinear()
    .domain([0, 132]) //Mins of duration.
    .range([0, width])
    .clamp(true);


var slider = svg.append("g")
    .attr("class", "slider")
    .attr("transform", "translate(" + 50 + "," + 100 + ")");

slider.append("line")
    .attr("class", "track")
    .attr("x1", xScale.range()[0])
    .attr("x2", xScale.range()[1])
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

var handle = slider.insert("circle", ".track-overlay")
    .attr("class", "handle")
    .attr("r", 9);

var label = slider.append("text")
    .attr("class", "label")
    .attr("text-anchor", "middle")
    .text(0)
    .attr("transform", "translate(0," + (-25) + ")")*/

forceCharacters();

function forceCharacters(selection) {
    var nodes_filt = [];
    d3.json("data/data_out/scenes.json").then(function(nodes) {
        /*d3.select("#house-color")
            .append("circle")
            .attr("r", 5)
            .attr("cx", 400)
            .attr("cy", 340);*/

        var xScenes = [...new Set(nodes.map(d => d.scene))];
        var durationScenes = [...new Set(nodes.map(d => d.dt_sub))];

        var sumDuration = d3.sum(durationScenes);
        console.log(d3.extent(durationScenes))
        console.log(sumDuration)
        console.log(nodes)
        nodes = nodes.map(function(d, i) {
            return {
                scene: d.scene,
                character: d.character,
                location: d.sublocation, //If you add fiels to the input data with map you have to specify here the attr that you want to keep
                radius: d.difference / 10,
                difference: d.difference
                    //category: i % 3
            }
        });
        //console.log(nodes)
        //console.log(d3.schemePaired)
        var characters = [...new Set(nodes.map(d => d.character))].sort();
        //Momentary solution to quit First Chauffer and Party attendants
        characters = characters.filter(function(d) { return (d != ("First chaufer") & d != ("Party attendants")) });
        //console.log(characters)
        var colorCharacter = d3.scaleOrdinal(d3.schemePaired)
            .domain(characters)
            //console.log(colorCharacter("Ki Woo"))
            //console.log(d3.extent(nodes, function(d) { return d.difference }))
        var scaleCharacter = d3.scaleLog([5, 30])
            .domain(d3.extent(nodes, function(d) { return d.difference }))
            //here you have to filter the scene that you want to plot (or maybe not here to have at the beggining all points)
            //One thing are scenes= legends; another thing are locations.
        var simulation = d3.forceSimulation(nodes)
            .force('charge', d3.forceManyBody().strength(25))
            //To center it  'x' & 'y'
            .force('x', d3.forceX().x(function(d) {
                //console.log(d.scene, d.location, d.radius);
                //console.log(d.location - 1)
                //return xLocation[d.category];
                //console.log("#center-" + d.location)
                //console.log(d3.select("#center-" + d.location).attr("cx"))
                return (d3.select("#center-" + d.location).attr("cx"));

            }))
            .force('y', d3.forceY().y(function(d) {
                return (d3.select("#center-" + d.location).attr("cy"));
                // return xLocation[d.category];
            })) //or any pixel: eg:50
            //x,y or 'center'
            //.force('center', d3.forceCenter(width / 4, height / 4))
            .force('collision', d3.forceCollide().radius(function(d) {
                // return d.radius
                return scaleCharacter(d.difference)
            }))
            .on('tick', ticked);

        var node = svg.append("g").attr("class", "force").selectAll(".node");
        console.log(node)
        nodes_filt = nodes;

        //restart();  // Not to have any starting force when loading the page

        //circles = data
        //drawPlot(circles); //at the beggining i dont want to see all the  circles plotted

        //Creation of circle radius according to scene
        /*circles.forEach(function(d, i) {
            d.radius = 5 + (i);
        });*/


        //Create Scene "Legend" => Future Timeline of the film.
        //var rectwidth = (width / 2) / xScenes.length;
        console.log(width)

        var rectwidth = ((width / 2) / xScenes.length) / 2;
        var scaleScene = d3.scaleLinear().domain(d3.extent(durationScenes)).range([rectwidth, (4 * rectwidth)])
        var offset = 0;
        var legend = d3.select("#house-svg")
            .append("g")
            .attr("id", "legend-force")
            .selectAll('rect')
            .data(durationScenes)
            .enter()
            .append('rect')
            .attr("id", (d, i) => "rect" + i)
            .attr("class", "rect-scene")
            .attr("x", function(d, i) {
                var x = offset;
                offset = scaleScene(d) + x + 5; //5 px of gap.
                console.log(offset)
                return (900 + x)

            })
            .attr("y", 90)
            .attr("width", function(d) {
                return scaleScene(d)
            })
            .attr("height", 30)
            .attr("fill", "orange")
            .on("click", function(d, i) {
                d3.selectAll(".rect-scene").attr("fill", "orange");
                d3.select(this).attr("fill", "#670398");
                //console.log(d)
                update(i);
                // ticked();
            })
            .on("mouseover", function(d) { d3.select(this).style("cursor", "pointer"); })


        if (!selection) {
            console.log(selection)

            //Text legend
            offset = 0;
            var text_legend = svg.select("#legend-force").append("g")
                .attr("class", "text-legend")
                .selectAll("text")
                .data(durationScenes)
                .enter()
                .append("text")
                .attr("x", function(d, i) {
                    var x = offset;
                    offset = scaleScene(d) + x + 5; //5 px of gap.
                    return 900 + x + (scaleScene(d) / 2)
                })
                .attr("y", 140)
                .text((d, i) => i + 1)
                .attr("font-size", 15)
                //Legend title
            var title = svg.select(".text-legend")
                .append("text")
                .attr("x", 1200)
                .attr("y", 70)
                .text("SCENES")
                .attr("font-family", "parasite")
                .attr("font-size", 20);
        } else {
            console.log(selection)
            d3.selectAll(".rect-scene").attr("fill", "orange");
            d3.select("#rect" + (selection - 1)).attr("fill", "#670398");
            update(selection - 1);
            //3.select(".force").attr("id", "first")

            //selection = 0;
        }

        /*playButton
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
        })*/

        function ticked() {

            node.attr("cx", function(d) {
                    return d.x;
                })
                .attr("cy", function(d) {
                    return d.y;
                })
        };

        function restart() {
            //if (!selection) {
            // node = node.enter().merge(node)
            //   console.log(node)
            //}
            // Apply the general update pattern to the nodes.
            //After the selectAll .data()
            console.log(node)
            node = node.data(nodes_filt, function(d) {
                console.log(d.id)
                return d.id;
            }); //If I remove function(d) the circles overlap Why?? Definition: https://github.com/d3/d3-selection#selection_data I don't get it. Explanation:
            ///stackoverflow.com/questions/24175624/d3-key-function#:~:text=The%20key%20function%20explains%20how,is%20the%20selector%2C%20e.g.%20d3.
            console.log(node)
                //To remove the existing ones. 
            node.exit()
                .transition()
                //.duration(1000)
                .attr("r", 0)
                .remove();
            node = node.enter().append("circle")
                .attr("fill", function(d) {
                    return colorCharacter(d.character)
                })
                .call(function(node) {
                    node.transition().attr('r', function(d) {
                        //return d.radius
                        return scaleCharacter(d.difference)
                    });
                })
                .merge(node)
                .on("mouseover", function(d) {
                    d3.select(this).attr("fill", "orange")

                    tooltip.transition()
                        .duration(200)
                        .style("visibility", "visible")
                        .style("opacity", .9)
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY - 30) + "px")
                        .text(d.scene + " .Location " + d.location + " ." +
                            d.character + " duration: " + d.difference + ".Radius: " + d.radius + "  scale:" + scaleCharacter(d.difference));
                })
                .on("mouseout", function(d) {
                    d3.select(this).attr("fill", colorCharacter(d.character))


                    tooltip.transition()
                        .duration(200)
                        .style("visibility", "hidden")
                });
            console.log(node)
            simulation.nodes(nodes_filt);
            simulation.alpha(1).restart();

        };

        function update(i) {
            //ticked();
            console.log(nodes)
            console.log(i)
                // i = (!selection) ? i : selection
                //console.log(selection == 'null')
                //console.log(!selection)
                // console.log(selection)


            //console.log(i)

            //here you have to filter the scene that you want to plot.
            //nodes_filt = [];
            nodes_filt = nodes.filter(function(d) {
                // return d.scene == i + 1;
                return d.scene == i + 3;
            });
            console.log(nodes_filt)
                //---
                //Needed to update the circles with new circle values. For the first case of random circle plotting.
                /* nodes = nodes.map(function(d, i) {
                     return {
                         radius: Math.random() * 24,
                         category: i % 3

                     }
                 });*/

            /*nodes = nodes.filter(function(el) {
                return el.scene == i + 1
            });*/

            console.log(nodes)

            //console.log(d3.selectAll("circle"))
            restart();


        }
    });
}



/*function ticked() {
    var u = d3.select('svg')
        .selectAll('circle')
        .data(nodes)

    u.enter()
        .append('circle')
        .attr('r', function(d) {
            return scaleCharacter(d.difference) // d.radius;
        })
        .merge(u)
        .attr('cx', function(d) {
            return d.x
        })
        .attr('cy', function(d) {
            return d.y
        })

    u.exit().remove()
}*/

/*function step() {
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
}*/

/*function drawPlot(data) {

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
            return scaleCharacter(d.difference) //d.radius
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

//}


//Update the circle handle position. Beware!!! There are 2 update functions.
/*function update(h) {
    var roundMinute = formatMinute(h);
    // update position and text of label according to slider scale
    handle.attr("cx", xScale(h));
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

}*/