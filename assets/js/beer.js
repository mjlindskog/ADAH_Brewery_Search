var mjKey = "ofeWXosGnA8zAbYrl3AtIa3oWt9qP1Tj";

var apiURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=";

apiURL = apiURL + mjKey + '&city=';

//console.log(apiURL)
var brewery = getData();
var latitude = brewery.latitude;
var longitude = brewery.longitude;
var phone = formatPhoneNumber(brewery.phone);
var url = brewery.website_url;
apiURL = apiURL + mjKey + '&city=' + brewery.city;
if(url === null) {
    url = 'No Website Listed';
    hrefURL = '#';
}
if(phone === null) {
    phone = 'No Phone Number Listed'
}

console.log(brewery)

$('#brewery-name').text(brewery.name);
$('#brewery-type').text(brewery.brewer_type);
$('#brewery-street').text(brewery.street);
$('#brewery-city').text(brewery.state);
$('#brewery-phone').text(phone);
$('#brewery-url').text(url);

//Weather
const api = {
    key: '5eb289bb53abf02581c3494d598b36af',
    base: 'http://api.openweathermap.org/data/2.5/'
}
getWeather();
function getWeather() {
    fetch (`${api.base}weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${api.key}`)
    .then (response => {
        return response.json();})
    .then((data) => {
        //console.log(data.main.temp)
        let temp = data.main.temp + 'F'
        $('#temp').text(temp);
    });
}


// Inserting the map 
var mymap = L.map('mapid').setView([latitude, longitude], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2xvbmd5NyIsImEiOiJja3BxNHpzdzcwOHJzMnNydjdpeDI2dWIxIn0.5FFHiq6sQIPXBxUYB0o_qQ', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18,
id: 'mapbox/streets-v11',
tileSize: 512,
zoomOffset: -1,
accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

// creating an "I am here" circle
L.marker([latitude, longitude], 500, {}).addTo(mymap).bindPopup(brewery.name);

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
                console.log('events')
                console.log(json._embedded.events[0]);
                let event = json._embedded.events[0];
                $('#event-name').text(event.name);
                $('#event-address').text(event._embedded.venues[0].name);
                $('#event-time').text(event.dates.start.localTime);

                // Parse the response.
                // Do other things.
                //json = JSON.parse(json);
                //console.log(json);
             },
    error: function(xhr, status, err) {
                // This time, we do not end up here!
             }
  });


  function getData(){
      let fullResults = localStorage.getItem('currentResults');
      fullResults = JSON.parse(fullResults);
      let selectedResult = localStorage.getItem('selectedResult');
      selectedResult = JSON.parse(selectedResult);
      let id = selectedResult.split('-')[1];
      //console.log(id);
      result = fullResults[id];
      //console.log(result);
      return result;
  }

  function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
}


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
