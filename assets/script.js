
$(document).ready(function(){

    let APIKey = "a1e0d56642d0b33ce92ae916a2c804ff";
    //Hard coded for London at the moment
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=London&appid=" + APIKey;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      console.log(response);
      let temperature = (response.list[0].main.temp - 273.15) * 1.80 + 32;
      let temperatureInteger = Math.floor(temperature);
      console.log(temperatureInteger);

    });

    // Generates Date and Time in Header
    let todaysDate = $("<p>").text(moment().format("dddd, MMMM Do, YYYY"));
    $("#todaysDate").append(todaysDate);

    console.log(todaysDate);





    
})