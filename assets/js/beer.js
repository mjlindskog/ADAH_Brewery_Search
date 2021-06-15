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

//console.log(brewery)

$('#brewery-name').text(brewery.name);
$('#brewery-type').text(brewery.brewery_type);
$('#brewery-street').text(brewery.street);
$('#brewery-city').text(brewery.state);
$('#brewery-phone').text(phone);
$('#brewery-url').text(url);

const api = {
    key: '5eb289bb53abf02581c3494d598b36af',
    base: 'https://api.openweathermap.org/data/2.5/'
}

if(latitude != null){
    //Weather

    getWeather();
    // Inserting the map 
    var mymap = L.map('mapid').setView([latitude, longitude], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2xvbmd5NyIsImEiOiJja3BxNHpzdzcwOHJzMnNydjdpeDI2dWIxIn0.5FFHiq6sQIPXBxUYB0o_qQ', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright" class="pointer">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/" class="pointer">Mapbox</a>',
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
            //console.log('json')
        // console.log(json)
            //console.log('events');
            if(json._embedded == null) {
                //console.log('embeded null')
                $('#event-box').empty();
                $('#event-box').text('No events found 🥲')
            } else {
                renderEventCards(json._embedded.events);
            }
        },
        error: function(xhr, status, err) {
                    // This time, we do not end up here!
                }
    });
} else {
    $('#mapid').addClass('hide');
    $('#weather').addClass('hide');
    $('#event-box').text("No events found 🥲")
}


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