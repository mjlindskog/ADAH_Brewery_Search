//Search Bar Event Listener
$('#search-button').click(() => {
    event.preventDefault()
    let val = $('#search-bar').val();
    url = 'https://api.openbrewerydb.org/breweries/search?query=' + val;
    fetch(url)
        .then(response => response.json())
        .then(data => paginateResults(data))
        .then(data => renderSearch(data, 0));
})
//Render Search Results
function renderSearch(data, index) {
    //console.log(data);
    //empty out div
    $('#search-results').empty();
    //show div
    $('#search-results').removeClass('hide');
    //remove extra margin from the bottom
    $('#search-form').removeClass('m-0-bottom');

    //data = paginateResults(data);
    //render each individual result element
    renderResultElement(data[index]);
    //Render page buttons
    paginationButtons(data, index);
    //Reinitialize Foundation Accordion Javascript
    Foundation.reInit('accordion');
}
//Format phone number
function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
}
//Render each individual result element
function renderResultElement(data) {
    //function performed on each element in the data array
    let i = 0;
    data.forEach(el => {
        //Generate unique IDs for each element
        let result = 'result-' + i;
        let content = 'content-' + i;
        //Get useful info stored
        let phone = formatPhoneNumber(el.phone)
        let url = el.website_url;
        let hrefURL = el.website_url;
        //check that there is a url listed
        if(url === null) {
            url = 'No Website Listed';
            hrefURL = '#';
        }
        //check that there is a phone number listed
        if(phone === null) {
            phone = 'No Phone Number Listed'
        }
        //generate content element ID
        let contentHref = '#content-' + i;
        let item = '<li class="accordion-item" data-accordion-item><a href="' + contentHref + '" role="tab" class="accordion-title" id="' + result + '">'+ el.name + '</a><div class="accordion-content" role="tabpanel" data-tab-content id="' + content + '"><h3 class="border-bottom-black">' + el.brewery_type.toUpperCase() + '</h3><h4>' + el.street + '</h4><h4 class="border-bottom-black">' + el.city + ', ' + el.state + '</h4><h5>' + phone + '</h5><a href="' + hrefURL + '" target="_blank">' + url + '</a><button class="button eventResults" onclick="pageRedirect()">See Nearby Events</button></div></li>'
        $('#search-results').append(item);
        i++;
    })
};

var selectedBrewLocation = response.latitude && response.longitude;

function pageRedirect(){
    window.location.replace("./beer.html");
    
    $(document).ready(function(){
        localEvents;
    });
};

function localEvents() {
    var mjKey = "ofeWXosGnA8zAbYrl3AtIa3oWt9qP1Tj";

    var apiURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey="+mjKey;

    // possible parameters
    var eventTime = "&localStartDateTime=";
    var eventCity = "&city=";
    var eventLocation = "&latlong=";
    var locationPreferred = "&geoPoint=";
    var eventRadius = "&radius=";
    var eventDistance = "&unit=5";
    $.ajax({
        url:"https://app.ticketmaster.com/discovery/v2/events.json?apikey="+mjKey+"&latlong="+selectedBrewLocation+"&unit=5",
        method:"GET"
    }).then(function (response) {
        $(".card-divider").text(response._embedded.venues.name);
        $(".event-name").text(response._embedded.attractions.name);
        $(".event-address").text(response._embedded.venues.adress);
        $(".event-time").text(response.dates.start.localTime);
        $(".buy-ticket").text(response._embedded.venues.url);
    });
};

//paginate result data
function paginateResults(data) {
    //initiate array of arrays
    let arr = [];
    //start iterating through array elements
    for(let i = 0; i < data.length; i++) {
        //initiate new array of 10 results
        let smallArr = [];
        //add all 10 results
        for(let c = 0; c < 10; c++) {
            if(data[i]) {
                smallArr.push(data[i])
                i++;
            } else {
                break;
            }
        }
        //push smaller array of 10 results into array of arrays
        arr.push(smallArr);
    }
    //console.log(arr);
    //return array of arrays
    return arr;
}
//create pagination buttons
function paginationButtons(data, index) {
    //empty out button holder
    $('#pagination-buttons').empty();
    //create previous button sentax button sentax
    let prev = '<li class="pagination-previous" id="previous-page"><a href="#" aria-label="Previous page">Previous</a></li>';
    //Add previous button to button holder
    $('#pagination-buttons').append(prev);
    //Truncate results buttons if there are more than 9 resuts returned
    for(let i = 0; i < data.length; i++) {
        //generate unique button ID
        let pageNum = 'page-' + i;
        //create button text to be displayed
        let displayPage = i + 1;
        //generate button sentax
        let element = '<li id="' + pageNum + '"><a href="#" aria-label="Page ' + displayPage + '">' + displayPage + '</a></li>'
        //append button to button holder
        $('#pagination-buttons').append(element);
        //console.log('events')
        //Add syntax to utilize jquery dynamically
        pageNum = '#' + pageNum;
        //add event listener
        $(pageNum).click(() => {
            console.log(pageNum)
            event.preventDefault();
            //paginate results
            paginationEvents(data, pageNum)
        });
        //console.log('i=' + i);
        //console.log('index=' + index);
        //turn index string into integer
        index = parseInt(index);
        //add two to index for comparison
        let plus2 = index + 2;
        //subtract 3 from data length for comparison
        let minus3 = data.length - 3;
        //ensure no negative numbers
        if(minus3 < 0) {
            minus3 = 0;
        }
        //console.log('2+index=' + plus2);
        //console.log('minus2=' + minus2)
        //Logic statements for placement of ellipsis
        if (data.length > 9) {
            if(i > plus2 && i < minus3) {
                $(pageNum).addClass('hide')
            } else if (i < index && i > 2 && i < data.length-3) {
                $(pageNum).addClass('hide')
                //$(pageNum).before('<li class="ellipsis" aria-hidden="true"></li>')
            } else if (i === plus2 && i < minus3) {
                $(pageNum).after('<li class="ellipsis" aria-hidden="true"></li>');
            } else if (i > 3  && i === index && i < minus3) {
                $(pageNum).before('<li class="ellipsis" aria-hidden="true"></li>')
            } else if(i === minus3 && index >= minus3){
                $(pageNum).before('<li class="ellipsis" aria-hidden="true"></li>')
            }
        }  
    }
    //generate next button syntax
    let next = '<li class="pagination-next" id="next-page"><a href="#" aria-label="Next page">Next</a></li>'
    //append next button to button holder
    $('#pagination-buttons').append(next);
    //generate syntax to dynamically use jQuery on active button
    let active = '#page-' + index;
    //add active class to active page button
    $(active).addClass('current');
    //set previous page button event listener
    $('#previous-page').click(() => {
        event.preventDefault()
        prevEvents(data, active)
    });
    //set next page button event listener
    $('#next-page').click(() => {
        event.preventDefault();
        nextEvents(data, active)
    });
    //if starting button is activated disable the previous button
    if(index == 0) {
        $('#previous-page').empty();
        $('#previous-page').off();
        $('#previous-page').text('Previous');
        $('#previous-page').addClass('disabled');
        //deactivate next button if on last button
    } else if(index == (data.length-1)) {
        $('#next-page').empty();
        $('#next-page').off();
        $('#next-page').text('Next');
        $('#next-page').addClass('disabled');
    }
    //show pagination nav
    $('#pagination-nav').removeClass('hide');
}
//create index and render
function paginationEvents(data, pageNum) {
    //console.log(data)
    event.preventDefault();
    let index = pageNum.split('-')[1];
    //console.log('index=' + index);
    renderSearch(data, index);
}
//Get next array of results
function nextEvents(data, pageNum) {
    //console.log(data)
    event.preventDefault();
    let index = pageNum.split('-')[1];
    index = addToString(index, 1);
    //console.log('index=' + index);
    renderSearch(data, index);
}
//get previous array of results
function prevEvents(data, pageNum) {
    //console.log(data)
    event.preventDefault();
    let index = pageNum.split('-')[1];
    index = addToString(index, -1);
    //console.log('index=' + index);
    renderSearch(data, index);
}
//add to a string containing a number
function addToString(el, add) {
    el = parseInt(el) + add;
    el = el.toString();
    return el
}

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

// show weather on screen
function showWeather (response) {
        console.log(response);
    }
// })

// })