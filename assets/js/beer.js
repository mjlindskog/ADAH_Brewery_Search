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