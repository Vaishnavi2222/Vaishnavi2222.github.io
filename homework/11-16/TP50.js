
function drawBubbles(data){

// set the dimensions and margins of the graph
var width = 800
var height = 600

var margin = {left: 50, right: 50, top: 50, bottom: 50}
var innerWidth = width- margin.left-margin.right;
var innerHeight = height - margin.top-margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#chart1")
.attr("width", width)
.attr("height", height);
console.log("dd",data); 

// A scale that gives a X target position for each group
var x = d3.scaleOrdinal()
.domain([1, 2, 3])
.range([50, 200, 340])

// A color scale
var color = d3.scaleOrdinal()
.domain([1, 2, 3, 4, 5, 6])
.range([ "#29CC3A", "#1DB954", "#1DB930","#41C817", "#78F74F", "#20AA2E"])

var radiusScale = d3.scaleLinear()
.domain([25, 80])
.range([30, 5]);

//Tooltip style
let tooltip = d3.select("#tooltip").append("div")
    .attr("class","d3-tooltip")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("padding", "30px")
    .style("background", "white")
    .style("border-radius", "20px")
    .style("color", "#121212")
    .style("box-shadow","10px 5px 15px #1DB948")
    .style("font-family","futura");

// Initialize the circle: all located at the center of the svg area
var node = svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("g")
    .append("circle")
    .attr("r", function(d){return radiusScale(d.Liveness);})
    .attr("cx", innerWidth / 2)
    .attr("cy", innerHeight / 2)
    .style("fill", function(d){ return color(d.Genre);})
    .style("fill-opacity", 0.8)
.call(d3.drag() // call specific function when circle is dragged
.on("start", dragstarted)
.on("drag", dragged)
.on("end", dragended))

.on("mouseover", function(d) {
tooltip.html(

"Song: <b>" +
d.TrackName+
"</b></br>Artist: <b>" +
d.ArtistName+
"</b></br>Genre: <b>" +
d.Genre+
"</b></br>Rank in Top 50: <b>" +
d.Rank+
"</b>")
.style("visibility", "visible")
.style("top", d3.event.pageY + 10 + "px")
.style("left", d3.event.pageX + 10 + "px")
;


console.log("hover");
})
.on("mouseout", function() {
tooltip.html(``).style("visibility", "hidden");
});

//Circle labels
var txt = svg.selectAll("g").append("text");
txt.attr("y",width / 5)
.attr("x",height / 5)
.text(function(d)
{
return d.Rank;
})
.attr("baseline-shift", "-50%");


//Start simulation (collection of forces)
var simulation = d3.forceSimulation()


//Moving them to center of SVG
.force("xCenter", d3.forceX(width/2).strength(.04))
.force("yCenter", d3.forceY(height/2).strength(.05))


//collision to avoid)
.force("noCollision", d3.forceCollide(function (d) {
return radiusScale(d.Liveness) + 3;
}))

// Apply these forces to the nodes and update their positions.
// Once the force algorithm is good with positions ('alpha' value is low enough), simulations will stop.

    simulation
    .nodes(data)
    .on("tick", function(d){
    node
    .attr("cx", function(d){ return d.x; })
    .attr("cy", function(d){ return d.y; });

    txt
    .attr("x", function(d){ return d.x; })
    .attr("y", function(d){ return d.y; });
    });


// When a circle is dragged?
    function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(.03).restart();
    d.fx = d.x;
    d.fy = d.y;
    }
    function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
    }
    function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(.03);
    d.fx = null;
    d.fy = null;
    }
    }