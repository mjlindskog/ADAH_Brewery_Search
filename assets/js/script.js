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
    .then (current => {
        return current.json();})
    .then(showWeather);
}
// show weather on screen
function showWeather (current) {
        console.log(current);
    }
// })