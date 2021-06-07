// Weather App Functionality//

// setting the API key
const api = {
    key: '5eb289bb53abf02581c3494d598b36af',
    base: 'http://api.openweathermap.org/data/2.5/'
}

// capturing the information from the button
var zipcode = document.querySelector('#zip-code').value;
var button = document.querySelector('.submitBtn');
button.addEventListener('click', saveLocation);

var saveLocation = () =>{
    localStorage.setItem('location', zipcode);
    console.log(zipcode);
}

function getWeather(zipcode) {
    fetch (`${api.base}weather?zip=${zipcode}&units=imperial&APPID=${api.key}`)
    .then(current => {
        return current.json();
    }).then(showWeather);

    function showWeather (weather) {
        console.log(current);
    }
}