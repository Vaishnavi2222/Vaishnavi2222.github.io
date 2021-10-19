var svg = d3.select("svg");

var twoSqColors = ["purple"];
var twoSqColors=["BLUE"];


function drawSquares(width,colors) {

    squares=svg.selectAll(".square");
    var colorData = squares.data(colors);

    colorData.enter().append("rect")
        .attr("class", "square")
        .attr("x", function(d,i) {return i*width+5;})
        .attr("y", 5)
        .attr("width", width)
        .attr("height", width)
        .attr("fill", function(d) {return d;});
        
    colorData
        .attr("x", function(d,i) {return i*width+5;})
        //.attr("y", 5)
        .attr("width", width)
        .attr("height", width)
        .attr("fill", function(d) {return d;});

    colorData.exit().remove();

    
    
}