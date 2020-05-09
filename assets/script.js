
$(document).ready(function(){

  let APIKey = "a1e0d56642d0b33ce92ae916a2c804ff";

  

  $("#searchButton").on( "click", function(event) {
    event.preventDefault();
      
    let cityNameInput = $("#cityNameInput");

    localStorage.setItem("City Name", cityNameInput.val());

    console.log(cityNameInput.val());



    // Current Weather API call (hardcoded for London for now)
    //let queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=" + APIKey;
    let queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + cityNameInput.val() + "&units=imperial&appid=" + APIKey;

    $.ajax({
      url: queryURL1,
      method: "GET"
    }).then(function(response) {

      console.log(response);
      // Gets and displays current weather icon
      let currentIconCode = response.weather[0].icon;
      currentIconURL = "http://openweathermap.org/img/w/" + currentIconCode + ".png";
      $("#currentIcon").attr("src", currentIconURL);

      // Gets and displays current date
      $("#todaysDate").text(moment().format("dddd, MMMM Do, YYYY"));

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

fiveDayForecast(cityNameInput.val());

  });

  // 5-Day Forecast API call (hardcoded for London for now)
  // *location* is essentially a var; "cityNameInput..." is the value defining the var
  function fiveDayForecast(location) {

    let queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&units=imperial&appid=" + APIKey;
  
    $.ajax({
      url: queryURL3,
      method: "GET"
    }).then(function(fiveResponse) {
  
      // Day One Forecast
      // Referenced this SO question to do date for futures: https://stackoverflow.com/questions/35441820/moment-js-tomorrow-today-and-yesterday
      $("#oneDayDate").text(moment().add(1, "days").format("L"));
  
      let oneDayIconCode = fiveResponse.list[7].weather[0].icon;
      oneDayIconURL = "http://openweathermap.org/img/w/" + oneDayIconCode + ".png";
      $("#oneDayIcon").attr("src", oneDayIconURL);
  
      let oneDayTemp = fiveResponse.list[7].main.temp;
      let oneDayTempInteger = Math.floor(oneDayTemp);
      $("#oneDayTemp").append(" " + oneDayTempInteger + String.fromCharCode(176) + "F");
  
      let oneDayHumid = fiveResponse.list[7].main.humidity;
      $("#oneDayHumid").append(" " + oneDayHumid + String.fromCharCode(37));
  
      //Day Two Forecast
      $("#twoDayDate").text(moment().add(2, "days").format("L"));
  
      let twoDayIconCode = fiveResponse.list[15].weather[0].icon;
      twoDayIconURL = "http://openweathermap.org/img/w/" + twoDayIconCode + ".png";
      $("#twoDayIcon").attr("src", twoDayIconURL);
  
      let twoDayTemp = fiveResponse.list[15].main.temp;
      let twoDayTempInteger = Math.floor(twoDayTemp);
      $("#twoDayTemp").append(" " + twoDayTempInteger + String.fromCharCode(176) + "F");
  
      let twoDayHumid = fiveResponse.list[15].main.humidity;
      $("#twoDayHumid").append(" " + twoDayHumid + String.fromCharCode(37));
  
      //Day Three Forecast
      $("#threeDayDate").text(moment().add(3, "days").format("L"));
  
      let threeDayIconCode = fiveResponse.list[23].weather[0].icon;
      threeDayIconURL = "http://openweathermap.org/img/w/" + threeDayIconCode + ".png";
      $("#threeDayIcon").attr("src", threeDayIconURL);
  
      let threeDayTemp = fiveResponse.list[23].main.temp;
      let threeDayTempInteger = Math.floor(threeDayTemp);
      $("#threeDayTemp").append(" " + threeDayTempInteger + String.fromCharCode(176) + "F");
  
      let threeDayHumid = fiveResponse.list[23].main.humidity;
      $("#threeDayHumid").append(" " + threeDayHumid + String.fromCharCode(37));
  
      //Day Four Forecast
      $("#fourDayDate").text(moment().add(4, "days").format("L"));
  
      let fourDayIconCode = fiveResponse.list[31].weather[0].icon;
      fourDayIconURL = "http://openweathermap.org/img/w/" + fourDayIconCode + ".png";
      $("#fourDayIcon").attr("src", fourDayIconURL);
  
      let fourDayTemp = fiveResponse.list[31].main.temp;
      let fourDayTempInteger = Math.floor(fourDayTemp);
      $("#fourDayTemp").append(" " + fourDayTempInteger + String.fromCharCode(176) + "F");
  
      let fourDayHumid = fiveResponse.list[31].main.humidity;
      $("#fourDayHumid").append(" " + fourDayHumid + String.fromCharCode(37));
  
      //Day Five Forecast
      $("#fiveDayDate").text(moment().add(5, "days").format("L"));
  
      let fiveDayIconCode = fiveResponse.list[31].weather[0].icon;
      fiveDayIconURL = "http://openweathermap.org/img/w/" + fiveDayIconCode + ".png";
      $("#fiveDayIcon").attr("src", fiveDayIconURL);
  
      let fiveDayTemp = fiveResponse.list[31].main.temp;
      let fiveDayTempInteger = Math.floor(fiveDayTemp);
      $("#fiveDayTemp").append(" " + fiveDayTempInteger + String.fromCharCode(176) + "F");
  
      let fiveDayHumid = fiveResponse.list[31].main.humidity;
      $("#fiveDayHumid").append(" " + fiveDayHumid + String.fromCharCode(37));
  
      console.log(fiveResponse);
  
  
    });

  };
  
  

    

    
})