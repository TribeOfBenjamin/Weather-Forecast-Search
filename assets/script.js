
$(document).ready(function(){

    // City search button function



//  $("#searchButton").on( "click", function() {
      
//    let cityNameInput = $("#cityNameInput");

//    localStorage.setItem("City Name", cityNameInput.val());




    let APIKey = "a1e0d56642d0b33ce92ae916a2c804ff";
    // Hard coded for London at the moment
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=London&units=imperial&appid=" + APIKey;
    //let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityNameInput.val() + "&appid=" + APIKey;


    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      console.log(response);
      // Gets and displays temperature
      let temperature = response.list[0].main.temp;
      let temperatureInteger = Math.floor(temperature);
      $("#currentTemp").append(" " + temperatureInteger + String.fromCharCode(176));
      console.log(temperatureInteger);

      // Gets and displays humidity
      let humidity = response.list[0].main.humidity;
      $("#currentHumid").append(" " + humidity + String.fromCharCode(37));
      console.log(humidity);

      // Gets and displays wind speed

    });

  //});


    
    // Generates Date and Time in Header
    let todaysDate = $("<p>").text(moment().format("dddd, MMMM Do, YYYY"));
    $("#todaysDate").append(todaysDate);
    
})