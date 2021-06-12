var mjKey = "ofeWXosGnA8zAbYrl3AtIa3oWt9qP1Tj";

var apiURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=";

apiURL = apiURL + mjKey + '&city=Columbus';

console.log(apiURL)

// possible parameters
var eventTime = "&localStartDateTime=";
var eventCity = "&city=";
var eventLocation = "&latlong=";
var locationPreferred = "&geoPoint=";
var eventRadius = "&radius=";
var eventDistance = "&unit=5";

$.ajax({
    type:"GET",
    url: apiURL,
    async:true,
    dataType: "json",
    success: function(json) {
                console.log(json);
                // Parse the response.
                // Do other things.
                //json = JSON.parse(json);
                console.log(json);
             },
    error: function(xhr, status, err) {
                // This time, we do not end up here!
             }
  });











$(document).ready(function() {


});


/*
WeatherBox
// Weather App Functionality//
// setting the API key
// $(document).ready(function() {
    // $(“.currentDate”).text(currentDate);

const api = {
    key: '5eb289bb53abf02581c3494d598b36af',
    base: 'http://api.openweathermap.org/data/2.5/'
}
// capturing zip code
var button = $(".submitBtn");
$(button).on('click', function(event){
    zipcode = $("#zip-code").val();
    console.log(zipcode);
    getWeather(zipcode);
});

// grabbing weather info from the API
function getWeather(zipcode) {
    fetch (`${api.base}weather?zip=${zipcode}&units=imperial&appid=${api.key}`)
    .then (response => {
        return response.json();})
    .then(showWeather);
}
// show weather on screen
function showWeather (response) {
        console.log(response);
        let location = document.querySelector('.location');
        location.innerText = response.name;
        let currentTemp = document.querySelector('.current-temp');
        currentTemp.innerText = `${response.main.temp}°F`;
        let highLow =  document.querySelector('.high-low');
        highLow.innerHTML = `${response.main.temp_max}°F / ${response.main.temp_min}°F`;
        let description = document.querySelector('.description');
        description.innerText = response.weather[0].description;
    }

beer-updates

    .then (response => {
        return response.json();})
    .then(showWeather);
}
main
// show weather on screen
function showWeather (response) {
        console.log(response);
    }
beer-updates
// })

// })
main */