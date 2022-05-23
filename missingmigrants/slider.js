{/* <div id="sliderColumn" class="col">

<div class="slidecontainer" title="Choose Year">
  <input type="range" min="0" max="0" value="0" class="slider" id="rangeYear" list="tickmarks" title="Year">

  <datalist id="tickmarks">
     <!-- <option value="1991" label="1991> -->

  </datalist>
  <span>JAN</span>
  <span style="float: right;">DEC</span>
  <div style="position: relative; top: -85px; font-weight: bold; font-size: 12px;">
    <div id="info1" style="position: absolute; left:0; top:0">
      <a href="#" id="infoShow1"><i class="fas fa-info-circle"></i></a>
    </div>
    <div id="info2" style="position: absolute; left:42%; top:0">
      <a href="#" id="infoShow2"><i class="fas fa-info-circle"></i></a>
    </div>
   <!-- <div id="info3" style="position: absolute; left:55%; top:0">
      <a href="#" id="infoShow3"><i class="fas fa-info-circle"></i></a>
    </div>-->
    <div id="info4" style="position: absolute; left:90%; top:0">
      <a href="#" id="infoShow4"><i class="fas fa-info-circle"></i></a>
    </div>
  </div>
</div>
</div> */}


    //##### slider update ############//


    d3.select("#rangeYear")
    .attr("min", mnths[0].key)
    .attr("max", mnths[mnths.length-1].key )
    
    
    var mapTab = document.getElementById("map");
    mapTab.addEventListener("click", function () {
        //if(!isLineCreated) {
        //isLineCreated = true;
    
        $("#varHoneyProd").click();
    
        $("#radioButtons").css("visibility", "visible");
        setTimeout("fnUpdateMapData()", 300); // Call after slight delay to render before height/width
        //}
    });
    
    
    function updateMapData(year, showProp) {
        console.log("Year is ", year);
        if (year == undefined) {
            year = currentYear;
        }
        if (showProp == undefined) {
            showProp = currentMapProp;
        }
        d3.select("#yearInfo").text(year);
        featureValues = []; // Reset array to hold current year data
    
        //console.log("updateMapData() " + year)
        var latestData = data.filter(function (d) {
            //console.log("d=", d);
            return d.year == year;
        });
    
        var prevYear = year - 1;
        if(prevYear < 1991) {
            prevYear = 1991;
        }
        var prevYearData = groupByYear.filter(obj => {
            return obj.key == prevYear.toString();
        });
    
        var yearData = groupByYear.filter(obj => {
            return obj.key == year.toString();
        });
    
        // SET MAP PROPERTY DISPLAY
        if (showProp == "varHoneyProd") {
            d3.select(".propLabel1").text("Total Production (lbs)");
            d3.select(".propLabel2").text("Avg Production (lbs)");
    
            var prevTotalProd = prevYearData[0].totalYearProd;
            var currentTotalProd = yearData[0].totalYearProd;
    
            var totalDiff = currentTotalProd - prevTotalProd;
            var totalInfo = "";
            if(totalDiff > 0 ) {
                totalInfo = "<span class='value-up'><i class='fas fa-arrow-up'></i> " + ctFormat(totalDiff) + "</span>";
            } else {
                totalInfo = "<span class='value-down'><i class='fas fa-arrow-down'></i> " + ctFormat(totalDiff) + "</span>";
            }
    
            var prevAvgProd = prevYearData[0].averageYearProd;
            var currentAvgProd = yearData[0].averageYearProd;
    
            var avgDiff = currentAvgProd - prevAvgProd;
            var avgInfo = "";
    
            if(avgDiff > 0 ) {
                avgInfo = "<span class='value-up'><i class='fas fa-arrow-up'></i> " + ctFormat(avgDiff) + "</span>";
            } else {
                avgInfo = "<span class='value-down'><i class='fas fa-arrow-down'></i> " + ctFormat(avgDiff) + "</span>";
            }
    
            if(year == 1991) {
                totalInfo = " - ";
                avgInfo = " - ";
            }
    
            d3.select("#totalProdInfoDiff").html(totalInfo);
            d3.select("#avgProdInfoDiff").html(avgInfo);
    
            d3.select("#totalProdInfo").text(ctFormat(currentTotalProd));
            d3.select("#avgProdInfo").text(ctFormat(currentAvgProd));
    
            mapExtent = totalProdExtent;
            mapColors = totalProdColors;
        }
    
        if (showProp == "varNeonic") {
            d3.select(".propLabel1").text("Total Neonicotinoids (lbs)");
            d3.select(".propLabel2").text("Avg Neonicotinoids (lbs)");
    
            var prevTotalProd = prevYearData[0].totalAllNeonic;
            var currentTotalProd = yearData[0].totalAllNeonic;
    
            var totalDiff = currentTotalProd - prevTotalProd;
            var totalInfo = "";
            if(totalDiff > 0 ) {
                totalInfo = "<span class='value-up'><i class='fas fa-arrow-up'></i> " + ctFormat(totalDiff) + "</span>";
            } else {
                totalInfo = "<span class='value-down'><i class='fas fa-arrow-down'></i> " + ctFormat(totalDiff) + "</span>";
            }
    
            var prevAvgProd = prevYearData[0].averageAllNeonic;
            var currentAvgProd = yearData[0].averageAllNeonic;
    
            var avgDiff = currentAvgProd - prevAvgProd;
            var avgInfo = "";
    
            if(avgDiff > 0 ) {
                avgInfo = "<span class='value-up'><i class='fas fa-arrow-up'></i> " + ctFormat(avgDiff) + "</span>";
            } else {
                avgInfo = "<span class='value-down'><i class='fas fa-arrow-down'></i> " + ctFormat(avgDiff) + "</span>";
            }
    
            if(year == 1991) {
                totalInfo = " - ";
                avgInfo = " - ";
            }
    
            d3.select("#totalProdInfoDiff").html(totalInfo);
            d3.select("#avgProdInfoDiff").html(avgInfo);
    
            d3.select("#totalProdInfo").text(ctFormat(yearData[0].totalAllNeonic));
            d3.select("#avgProdInfo").text(ctFormat(yearData[0].averageAllNeonic));
            mapExtent = totalNeoExtent;
            mapColors = totalNeoColors;
        }
    
        // First time setup code only runs once
        if (!isSetup) {
    
            // Convert topoJSON to geoJSON
            geoJSON = topojson.feature(usTopoJSON, usTopoJSON.objects.states);
    
            // Remove Alaska and Hawaii
            geoJSON.features = geoJSON.features.filter(function (d) {
                return d.id != "AK" && d.id != "HI" && d.id != "PR";
            });
    
            // Create a map projection from the geoJSON
            var proj = d3.geoMercator()
                .fitSize([w, h], geoJSON);
    
            // Create a path from the projection!
            var path = d3.geoPath()
                .projection(proj);
    
            mapSvg = d3.select("#my-map")
                .attr("width", w + "px")
                .attr("height", h + "px")
            /*
            var states = svg.selectAll("path")
                .data(geoJSON.features);
            */
    
    
            // Create a container for the map
            states = mapSvg.append("g")
                .style("pointer-events", "all");
    
            //Bind data and create one path per GeoJSON feature
            states.selectAll("path")
                .data(geoJSON.features)
                // .call(drag)
                .enter()
                .append("path")
                .attr("d", path)
                .attr("class", "feature");
    
    
            isSetup = true;
        } // End if(!isSetup) {...
    
    
        createLegend(mapSvg);
    
        // Get the featureValues collection of data for the current year
        $.each(geoJSON.features, function (key, value) {
            //console.log("value = ", value);
            var stateAbbr = value.id;
    
            var myDataRow = latestData.filter(obj => {
                return obj.state == stateAbbr;
            })
    
            var totalProdValue = 0;
            if (myDataRow[0] != undefined) {
                totalProdValue = myDataRow[0].totalprod; // Get total honey production
            }
    
            var totalAllNeonic = 0;
            if (myDataRow[0] != undefined) {
                totalAllNeonic = myDataRow[0].nAllNeonic; // Get total honey production
            }
    
            var dataObj = { "name": stateAbbr, "totalprod": totalProdValue, "totalAllNeonic": totalAllNeonic, "state": stateAbbr };
            featureValues.push(dataObj);
        });
    
        // Create the map
        states.selectAll("path")
            .each(function (d, i) {
                // Add information for display
                var area = d.id.toLowerCase();
    
                // Find the matching key in the list and get the value
                var found = featureValues.find(function (element) {
                    return element.name.toLowerCase() == area.toLowerCase();
                });
                var infoString = "";
                var showVal = 0;
                var myPath = d3.select(this);
    
                //console.log(found);
                if (showProp == "varHoneyProd") {
                    // Color the shape and store the value in an attribute
                    showVal = found.totalprod;
                    //console.log("varHoneyProd showVal " + showVal);
                    var myColor = mapColors(showVal);
    
                    if (showVal == 0) {
                        myColor = "#EEEEEE"; // Show gray if no data
                    }
                }
                if (showProp == "varNeonic") {
                    // Color the shape and store the value in an attribute
                    showVal = found.totalAllNeonic;
                    //console.log("varNeonic showVal " + showVal);
                    var myColor = mapColors(showVal);
                }
    
    
                myPath.style("fill", myColor);
                myPath.attr("feature-value", showVal);
                infoString = area + "<br>Value: " + showVal;
    
                // Set title for displaying info on hover
                myPath.attr("title", infoString);
    
                myPath.text(function (d, infoString) { return infoString; })
                    .on("mouseenter", function (d) {
    
                        var area = d.id;
    
                        // Highglight this bad boy
                        $(this).addClass("highLight");
                        /*
                        if(!isIE11) {
                                // Move the path to the front so the stroke in on top...
                                // But if it is IE 11 don't do this because it messes up the "mouseout" event
                                myPath.moveToFront();
                        }
                        */
                        var myVal = myPath.attr("feature-value");
    
                        // CHANGE BASED ON PROPERTY
                        if (currentMapProp == "varHoneyProd") {
                            var infoString = area + "<br>Total Honey Production: " + ctFormat(myVal);
                        }
    
                        if (currentMapProp == "varNeonic") {
                            var infoString = area + "<br>Total Neonicotinoid Use: " + ctFormat(myVal);
                        }
    
                        tooltip.html(infoString);
                        return tooltip.style("display", "block");
    
                    })
                    .on("mousemove", function () {
                        return tooltip.style("top", (d3.event.pageY - 45) + "px").style("left", (d3.event.pageX + 30) + "px");
                    })
                    .on("mouseout", function () {
                        // This "mouseout" event doesn't fire in IE 11 from the <path> element in the map for some reason
                        $(this).removeClass("highLight");
                        return tooltip.style("display", "none"); v
                    });
            });
    
    } // End "updateMapData()"...
    
    updateMapData(currentYear, currentMapProp);
    
    fnUpdateMapData = updateMapData;
    
    // Set up Year Slider
    var rngYear = document.getElementById("rangeYear");
    rngYear.addEventListener("change", handleSlider, false);
    rngYear.addEventListener("input", handleSlider, false);
    
    function handleSlider() {
        currentYear = rngYear.value;
        updateMapData(currentYear, currentMapProp);
    }
