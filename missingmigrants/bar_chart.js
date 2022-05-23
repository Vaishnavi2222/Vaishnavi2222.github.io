function runbars(){

    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 90, left: 40},
        width = 760 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
    var svg_bar = d3.select("#my_dataviz")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
    
    // Parse the Data
    d3.csv("overall_data.csv", function(data) {
    
            // X axis
            var x = d3.scaleBand()
            .range([ 0, width ])
            .domain(data.map(function(d) { 
                return d.incident_year; }))
            .padding(0.2);

            svg_bar.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .append("text")
            .text("Year of Incidents")
            .attr("text-anchor", "center")
            .attr("x","380")
            .attr("y","50")
            .attr("font-family", "Open Sans,Arial,Verdana,sans-serif")
            .attr("font-size", "12px")
            .attr("fill","black");
    

            // Add Y axis
            var y = d3.scaleLinear()
            .domain([0, 2000])
            .range([ height, 0]);
            svg_bar.append("g")
            .call(d3.axisLeft(y))
            .attr("display","none");
    
            // Bars
            svg_bar.selectAll("mybar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class","rects")
            .attr("x", function(d) { 
                return x(d.incident_year); })
            .attr("width", x.bandwidth())
            .attr("fill", "#000")
            // no bar at the beginning thus:
            .attr("height", function(d) { return height - y(0); }) // always equal to 0
            .attr("y", function(d) { return y(0); });


            // Animation
            svg_bar.selectAll("rect")
            .data(data)
            .attr("class","rects")
            .transition().duration(1400)
            .attr("y", function(d) { 
                return y(d.deaths);
            })
            .attr("height", function(d) { return height - y(d.deaths); })
            .delay(function(d,i){console.log(i) ; return(i*100)})
            .attr("fill",function(d)
            {
                if(d.incident_year==="2021")
                {
                    return "#992222"
                }
                else
                {
                    return "#000"
                }
            });


            svg_bar.selectAll("text.num")
            .data(data)
            .enter()
            .append("text")
            .attr("class","num")
            .attr("x", function(d) { 
                return x(d.incident_year); 
            })
            .attr("y", function(d) { return y(d.deaths)-2; })
            .text(function(d){
                return d.deaths
            })
            .attr("text-anchor", "left")
            .attr("font-family", "Open Sans,Arial,Verdana,sans-serif")
            .attr("font-size", "0px")
            .attr("font-weight", "bolder")
            .attr("fill",function(d)
            {
                if(d.incident_year==="2021")
                {
                    return "#992222"
                }
                else
                {
                    return "#000"
                }
            })
            .transition().delay(1400)
            .attr("font-size", "22px");


    })
}