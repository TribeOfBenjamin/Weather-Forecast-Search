$(document).ready(function(){

  let APIKey = "a1e0d56642d0b33ce92ae916a2c804ff";


  function citySearch(cityNameInput) {

      let queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + cityNameInput + "&units=imperial&appid=" + APIKey;

      $.ajax({
        url: queryURL1,
        method: "GET"
      }).then(function(response) {
  
          let cityWeatherInfo = response;

          console.log(cityWeatherInfo);

          displayCurrentWeather(cityWeatherInfo);
          fiveDayForecast(cityNameInput);

      });
  };

  function saveCityToLocal(cityNameInput) {

      localStorage.setItem("City Name", cityNameInput);

  };

  function getCityFromLocal() {

      let cityName = localStorage.getItem("City Name");

      citySearch(cityName);

  }

  function displayCurrentWeather(response) {

      // Gets and displays city name
      $("#currentCity").text(response.name);

      // Gets and displays current weather icon
      let currentIconCode = response.weather[0].icon;
      currentIconURL = "https://openweathermap.org/img/w/" + currentIconCode + ".png";
      $("#currentIcon").attr("src", currentIconURL);

      // Gets and displays current date
      $("#todaysDate").text(moment().format("dddd, MMMM Do, YYYY"));

      // Gets and displays current temperature
      let temperature = response.main.temp;
      let temperatureInteger = Math.floor(temperature);
      $("#currentTemp").text("Temperature: " + temperatureInteger + String.fromCharCode(176) + "F");

      // Gets and displays current humidity
      let humidity = response.main.humidity;
      $("#currentHumid").text("Humidity: " + humidity + String.fromCharCode(37));

      // Gets and displays current wind speed
      let wind = response.wind.speed;
      $("#currentWind").text("Wind Speed: " + wind + " MPH");

      // Gets latitude and longitude
      let lat = response.coord.lat;
      let lon = response.coord.lon;

      console.log(lat);
      console.log(lon);

      // UV Index API call (using latitude and longitude from Current Weather API)
      let queryURL2 = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;

      $.ajax({
        url: queryURL2,
        method: "GET"
      }).then(function(UVresponse) { 

        // Gets and displays UV index, changing background color accordingly
        let UV = UVresponse.value;

        if ( UV < 3 ) {

          $("#currentUV").text(" " + UV);
          $("#currentUV").css("background-color", "green");
        } else if ( UV >= 3 && UV < 6 ) {

          $("#currentUV").text(" " + UV);
          $("#currentUV").css("background-color", "yellow");
        } else if ( UV >= 6 && UV < 8 ) {

          $("#currentUV").text(" " + UV);
          $("#currentUV").css("background-color", "orange");
        } else if ( UV >= 8 && UV < 11 ) {

          $("#currentUV").text(" " + UV);
          $("#currentUV").css("background-color", "orangered");
        } else if ( UV >= 11 ) {

          $("#currentUV").text(" " + UV);
          $("#currentUV").css("background-color", "red");
        }

      })

    }
    
    
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
        oneDayIconURL = "https://openweathermap.org/img/w/" + oneDayIconCode + ".png";
        $("#oneDayIcon").attr("src", oneDayIconURL);
    
        let oneDayTemp = fiveResponse.list[7].main.temp;
        let oneDayTempInteger = Math.floor(oneDayTemp);
        $("#oneDayTemp").text("Temp: " + oneDayTempInteger + String.fromCharCode(176) + "F");
    
        let oneDayHumid = fiveResponse.list[7].main.humidity;
        $("#oneDayHumid").text("Humidity: " + oneDayHumid + String.fromCharCode(37));
    
        //Day Two Forecast
        $("#twoDayDate").text(moment().add(2, "days").format("L"));
    
        let twoDayIconCode = fiveResponse.list[15].weather[0].icon;
        twoDayIconURL = "https://openweathermap.org/img/w/" + twoDayIconCode + ".png";
        $("#twoDayIcon").attr("src", twoDayIconURL);
    
        let twoDayTemp = fiveResponse.list[15].main.temp;
        let twoDayTempInteger = Math.floor(twoDayTemp);
        $("#twoDayTemp").text("Temp: " + twoDayTempInteger + String.fromCharCode(176) + "F");
    
        let twoDayHumid = fiveResponse.list[15].main.humidity;
        $("#twoDayHumid").text("Humidity: " + twoDayHumid + String.fromCharCode(37));
    
        //Day Three Forecast
        $("#threeDayDate").text(moment().add(3, "days").format("L"));
    
        let threeDayIconCode = fiveResponse.list[23].weather[0].icon;
        threeDayIconURL = "https://openweathermap.org/img/w/" + threeDayIconCode + ".png";
        $("#threeDayIcon").attr("src", threeDayIconURL);
    
        let threeDayTemp = fiveResponse.list[23].main.temp;
        let threeDayTempInteger = Math.floor(threeDayTemp);
        $("#threeDayTemp").text("Temp: " + threeDayTempInteger + String.fromCharCode(176) + "F");
    
        let threeDayHumid = fiveResponse.list[23].main.humidity;
        $("#threeDayHumid").text("Humidity: " + threeDayHumid + String.fromCharCode(37));
    
        //Day Four Forecast
        $("#fourDayDate").text(moment().add(4, "days").format("L"));
    
        let fourDayIconCode = fiveResponse.list[31].weather[0].icon;
        fourDayIconURL = "https://openweathermap.org/img/w/" + fourDayIconCode + ".png";
        $("#fourDayIcon").attr("src", fourDayIconURL);
    
        let fourDayTemp = fiveResponse.list[31].main.temp;
        let fourDayTempInteger = Math.floor(fourDayTemp);
        $("#fourDayTemp").text("Temp: " + fourDayTempInteger + String.fromCharCode(176) + "F");
    
        let fourDayHumid = fiveResponse.list[31].main.humidity;
        $("#fourDayHumid").text("Humidity: " + fourDayHumid + String.fromCharCode(37));
    
        //Day Five Forecast
        $("#fiveDayDate").text(moment().add(5, "days").format("L"));
    
        let fiveDayIconCode = fiveResponse.list[31].weather[0].icon;
        fiveDayIconURL = "https://openweathermap.org/img/w/" + fiveDayIconCode + ".png";
        $("#fiveDayIcon").attr("src", fiveDayIconURL);
    
        let fiveDayTemp = fiveResponse.list[31].main.temp;
        let fiveDayTempInteger = Math.floor(fiveDayTemp);
        $("#fiveDayTemp").text("Temp: " + fiveDayTempInteger + String.fromCharCode(176) + "F");
    
        let fiveDayHumid = fiveResponse.list[31].main.humidity;
        $("#fiveDayHumid").text("Humidity: " + fiveDayHumid + String.fromCharCode(37));
    
        console.log(fiveResponse);
    
    
      });
  
    };
    
    function addCityToHistory(cityName) {

      let cityHistory = $("<li>").text(cityName);
      cityHistory.addClass("list-group-item");
      $("ul").append(cityHistory);

    }
    // I think this should work but it doesn't
    $("li").on ( "click", function(event) {
      event.preventDefault();

      let cityName = $(this).val();

      citySearch(cityName);
      fiveDayForecast(cityName);

    })
  
    $("#searchButton").on( "click", function(event) {
      event.preventDefault();
        
      let cityNameInput = $("#cityNameInput").val();
  
      console.log(cityNameInput);

      citySearch(cityNameInput);
      saveCityToLocal(cityNameInput);
      addCityToHistory(cityNameInput);
  
  });

  getCityFromLocal();
  
  });