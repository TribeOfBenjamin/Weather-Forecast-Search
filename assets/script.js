
$(document).ready(function(){

    // City search button function (commented out)



//  $("#searchButton").on( "click", function() {
      
//    let cityNameInput = $("#cityNameInput");

//    localStorage.setItem("City Name", cityNameInput.val());




    let APIKey = "a1e0d56642d0b33ce92ae916a2c804ff";
    // Current Weather API call (hard coded for London for now)
    let queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=" + APIKey;
    //let queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + cityNameInput.val() + "&units=imperial&appid=" + APIKey;

    $.ajax({
      url: queryURL1,
      method: "GET"
    }).then(function(response) {

      console.log(response);
      // Gets and displays temperature
      let temperature = response.main.temp;
      let temperatureInteger = Math.floor(temperature);
      $("#currentTemp").append(" " + temperatureInteger + String.fromCharCode(176) + "F");
      console.log(temperatureInteger);

      // Gets and displays humidity
      let humidity = response.main.humidity;
      $("#currentHumid").append(" " + humidity + String.fromCharCode(37));
      console.log(humidity);

      // Gets and displays wind speed
      let wind = response.wind.speed;
      $("#currentWind").append(" " + wind + "/MPH");
      console.log(wind);

      // Gets and displays weather icon
      let weatherIconCode = response.weather[0].icon;
      weatherIconURL = "http://openweathermap.org/img/w/" + weatherIconCode + ".png";
      $("#weatherIcon").attr("src", weatherIconURL);
      console.log(weatherIconCode);

      // Gets latitude and longitude
      let lat = response.coord.lat;
      let lon = response.coord.lon;

      console.log(lat);
      console.log(lon);

      // UV Index API call (using latitude and longitude from Current Weather API)
      let queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;

      $.ajax({
        url: queryURL2,
        method: "GET"
      }).then(function(UVresponse) { 

        // Gets and displays UV index, changing background color accordingly
        let UV = UVresponse.value;

        if ( UV < 3 ) {

          $("#currentUV").append(" " + UV);
          $("#currentUV").css("background-color", "green");
        } else if ( UV >= 3 && UV < 6 ) {

          $("#currentUV").append(" " + UV);
          $("#currentUV").css("background-color", "yellow");
        } else if ( UV >= 6 && UV < 8 ) {

          $("#currentUV").append(" " + UV);
          $("#currentUV").css("background-color", "orange");
        } else if ( UV >= 8 && UV < 11 ) {

          $("#currentUV").append(" " + UV);
          $("#currentUV").css("background-color", "orangered");
        } else if ( UV >= 11 ) {

          $("#currentUV").append(" " + UV);
          $("#currentUV").css("background-color", "red");
        }

        console.log(UVresponse);

      })

    });



  //});


    
    // Generates Date and Time in Header
    let todaysDate = $("<p>").text(moment().format("dddd, MMMM Do, YYYY"));
    $("#todaysDate").append(todaysDate);
    
})