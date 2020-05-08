
$(document).ready(function(){

    // City search button function



//  $("#searchButton").on( "click", function() {
      
//    let cityNameInput = $("#cityNameInput");

//    localStorage.setItem("City Name", cityNameInput.val());




    let APIKey = "a1e0d56642d0b33ce92ae916a2c804ff";
    // Hard coded for London at the moment
    let queryURL1 = "https://api.openweathermap.org/data/2.5/forecast?q=London&units=imperial&appid=" + APIKey;
    //let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityNameInput.val() + "&appid=" + APIKey;


    $.ajax({
      url: queryURL1,
      method: "GET"
    }).then(function(response) {

      console.log(response);
      // Gets and displays temperature
      let temperature = response.list[0].main.temp;
      let temperatureInteger = Math.floor(temperature);
      $("#currentTemp").append(" " + temperatureInteger + String.fromCharCode(176) + "F");
      console.log(temperatureInteger);

      // Gets and displays humidity
      let humidity = response.list[0].main.humidity;
      $("#currentHumid").append(" " + humidity + String.fromCharCode(37));
      console.log(humidity);

      // Gets and displays wind speed
      let wind = response.list[0].wind.speed;
      $("#currentWind").append(" " + wind + "/MPH");
      console.log(wind);


      // API call for UV index
      let queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + -6 + "&lon=" + 12;

      $.ajax({
        url: queryURL2,
        method: "GET"
      }).then(function(UVresponse) { 

        // Gets and displays UV index
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