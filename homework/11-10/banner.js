var url = "https://api.thecatapi.com/v1/images/search";
d3.json(url, function(error, data) {

if (!error) {
    d3.select("#banner")
    .style("background-image", "url('" + data[0].url + "')");
}

});