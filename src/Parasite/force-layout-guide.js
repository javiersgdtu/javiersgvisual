//Maybe next step here: Test interactivity.
//var numNodes = 10
var xLocation = [100, 300, 500]
    //Needed for the random array number generation 
    /*var nodes = d3.range(numNodes).map(function(d, i) {
        return {
            radius: Math.random() * 25,
            category: i % 3

        }
    });*/ //Creates an array and populate it with random radius. 
    //When using nodes in the code below the  array will be filled with different atributes x,y,vx,vy...

//console.log(nodes)

var svg = d3.select("svg").append("g").attr("transform", "translate(0,200)"),
    width = +d3.select("svg").attr("width"),
    height = +d3.select("svg").attr("height");
console.log(width / xLocation.length)

var nodes_filt = [];
d3.json("circles-v2.json").then(function(nodes) {
    console.log(nodes)
    nodes = nodes.map(function(d, i) {
        return {
            scene: d.scene,
            location: d.location, //If you add fiels to the input data with map you have to specify here the attr that you want to keep
            radius: d.duration / 2,
            //category: i % 3

        }
    });
    //here you have to filter the scene that you want to plot (or maybe not here to have at the beggining all points)
    //One thing are scenes= legends; another thing are locations.
    var simulation = d3.forceSimulation(nodes)
        .force('charge', d3.forceManyBody().strength(25))
        //To center it  'x' & 'y'
        .force('x', d3.forceX().x(function(d) {
            //console.log(d.location - 1)
            //return xLocation[d.category];
            return (xLocation[d.location - 1]);

        }))
        /*.force('y', d3.forceY().y(function(d) {
            return xLocation[d.category];
        }))*/ //or any pixel: eg:50
        //x,y or 'center'
        //.force('center', d3.forceCenter(width / 4, height / 4))
        .force('collision', d3.forceCollide().radius(function(d) {
            return d.radius
        }))
        .on('tick', ticked);

    var node = svg.append("g").selectAll(".node");
    nodes_filt = nodes;

    restart();

    //Create "Legend" => Future Timeline of the film
    var rectwidth = (width / 2) / xLocation.length;
    var legend = d3.select("svg")
        .append("g")
        .selectAll('rect')
        .data(xLocation)
        .enter()
        .append('rect')
        .attr("x", function(d, i) {
            return (i * (rectwidth + 10))
        })
        .attr("y", 50)
        .attr("width", rectwidth)
        .attr("height", 30)
        .attr("fill", "orange")
        .on("click", (d, i) => {
            console.log(i)
            update(i);
            //  ticked();

        })


    function ticked() {

        node.attr("cx", function(d) {
                return d.x;
            })
            .attr("cy", function(d) {
                return d.y;
            })

        //Traditional way of initializing the force layout.

        /* var u = d3.select('g')
             .selectAll('circle')
             .data(nodes)

         u.enter()
             .append('circle')
             .attr('id', function(d) {
                 return "id" + d.category
             })
             .attr('r', function(d) {
                 return d.radius
             })
             .merge(u)
             .attr('cx', function(d) {
                 return d.x
             })
             .attr('cy', function(d) {
                 return d.y
             })
             .attr("fill", "orange")

         u.exit().remove()*/
    }

    function restart() {
        // Apply the general update pattern to the nodes.
        //After the selectAll .data()
        node = node.data(nodes_filt, function(d) {
            return d.id;
        }); //If I remove function(d) the circles overlap Why?? Definition: https://github.com/d3/d3-selection#selection_data I don't get it. Explanation:
        ///stackoverflow.com/questions/24175624/d3-key-function#:~:text=The%20key%20function%20explains%20how,is%20the%20selector%2C%20e.g.%20d3.

        //To remove the existing ones. 
        node.exit()
            .transition()
            //.duration(1000)
            .attr("r", 0)
            .remove();

        node = node.enter().append("circle")
            .attr("fill", "orange")
            .call(function(node) {
                node.transition().attr('r', function(d) {
                    return d.radius
                });
            })
            .merge(node);

        simulation.nodes(nodes_filt);
        simulation.alpha(1).restart();

    }

    function update(i) {
        //ticked();
        console.log(nodes)
        console.log(i)
            //here you have to filter the scene that you want to plot.
            //nodes_filt = [];
        nodes_filt = nodes.filter(function(d) {
            return d.scene == i + 1;
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

        //With the code below we can eliminate all circles,eliminate all circles from a specific legend, etc...

        //nodes.pop().// Esto te elimina el ultimo elemento del array nodes
        //d3.selectAll("circle").transition().duration(1000).attr("r", 5).remove() // This transition only works when first transition(the one give by the simulation) ends.
        //d3.selectAll("#id0").transition().duration(1000).attr("r", 5).remove() // This transition only works when first transition(the one give by the simulation) ends.
        // d3.selectAll("#id" + i).transition().duration(1000).attr("r", 5).remove()
        //d3.selectAll("circle").transition().duration(1000).attr("r", 5).remove()

    }

});