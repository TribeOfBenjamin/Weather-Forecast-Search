
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
      // Gets and displays current temperature
      let temperature = response.main.temp;
      let temperatureInteger = Math.floor(temperature);
      $("#currentTemp").append(" " + temperatureInteger + String.fromCharCode(176) + "F");

      // Gets and displays current humidity
      let humidity = response.main.humidity;
      $("#currentHumid").append(" " + humidity + String.fromCharCode(37));

      // Gets and displays current wind speed
      let wind = response.wind.speed;
      $("#currentWind").append(" " + wind + " MPH");

      // Gets and displays current weather icon
      let currentIconCode = response.weather[0].icon;
      currentIconURL = "http://openweathermap.org/img/w/" + currentIconCode + ".png";
      $("#currentIcon").attr("src", currentIconURL);

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

      })

    });



  //});

  // 5-Day Forecast API call (hard coded for London for now)
  let queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?q=London&units=imperial&appid=" + APIKey;
  
  $.ajax({
    url: queryURL3,
    method: "GET"
  }).then(function(fiveResponse) {

    // Day One Forecast
    // Referenced this SO question to do date for futures: https://stackoverflow.com/questions/35441820/moment-js-tomorrow-today-and-yesterday
    let oneDayDate = $("#oneDayDate").text(moment().add(1, "days").format("L"));

    let oneDayIconCode = fiveResponse.list[7].weather[0].icon;
    oneDayIconURL = "http://openweathermap.org/img/w/" + oneDayIconCode + ".png";
    $("#oneDayIcon").attr("src", oneDayIconURL);

    console.log(oneDayIconCode);

    let oneDayTemp = fiveResponse.list[7].main.temp;
    let oneDayTempInteger = Math.floor(oneDayTemp);
    $("#oneDayTemp").append(" " + oneDayTempInteger + String.fromCharCode(176) + "F");

    let oneDayHumid = fiveResponse.list[15].main.humidity;
    $("#oneDayHumid").append(" " + oneDayHumid + String.fromCharCode(37));

    console.log(fiveResponse);


  });

    
    // Generates Date and Time in Header
    let todaysDate = $("<p>").text(moment().format("dddd, MMMM Do, YYYY"));
    $("#todaysDate").append(todaysDate);
    
})