// data from https://www.kaggle.com/leonardopena/top50spotify2019?select=top50.csv
d3.csv("/homework/top50.csv", function(error, data) {
    console.log("csv data error:", error);
    console.log("csv contents:", data);
    data.forEach ( 
        function(d){ 
            d.TrackName = d.Track(d.Rank); // Name of Track
            d.Artist.Name = d.Artist; // Name of the Artist
            d.Genre = d.Genre; // Song Genre
            d.Beats.Per.Minute = parseInt(d.Beats.Per.Minute); // Beats Per Minute
            d.Danceability= parseInt(d.Danceability); // Ability to Dance
            d.Liveness = parseInt(d.Liveness); // Liveness
            d.Length = d.Length; // Song Length
            d.Speechiness = d.Speechiness; // Song Speech
            d.Popularity = d.Popularity; // Song Popularity

            d.Popularity = parseFloat(d.Popularity) * 1000; // Song Popularity
            
        
            // console.log(d);
        }
    );
    console.log(data);
});

