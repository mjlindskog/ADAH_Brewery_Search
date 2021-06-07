//Search Bar Event Listener
$('#search-button').click(() => {
    event.preventDefault()
    let val = $('#search-bar').val();
    url = 'https://api.openbrewerydb.org/breweries/search?query=' + val;
    fetch(url)
        .then(response => response.json())
        .then(data => renderSearch(data));
})

function renderSearch(data) {
    //console.log(data);
    $('#search-results').empty();
    $('#search-results').removeClass('hide');
    $('#search-form').removeClass('m-0-bottom');

    data = paginateResults(data);
    renderResultElement(data[0]);
    Foundation.reInit('accordion');
}

function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
}

function renderResultElement(data) {
    data.forEach(el => {
        let i = 0;
        let result = 'result-' + i;
        let content = 'content-' + i;
        let phone = formatPhoneNumber(el.phone)
        let url = el.website_url;
        let hrefURL = el.website_url;
        if(url === null) {
            url = 'No Website Listed';
            hrefURL = '#';
        }
        if(phone === null) {
            phone = 'No Phone Number Listed'
        }
        let contentHref = '#content-' + i;
        let item = '<li class="accordion-item" data-accordion-item><a href="' + contentHref + '" role="tab" class="accordion-title" id="' + result + '">'+ el.name + '</a><div class="accordion-content" role="tabpanel" data-tab-content id="' + content + '"><h3 class="border-bottom-black">' + el.brewery_type.toUpperCase() + '</h3><h4>' + el.street + '</h4><h4 class="border-bottom-black">' + el.city + ', ' + el.state + '</h4><h5>' + phone + '</h5><a href="' + hrefURL + '" target="_blank">' + url + '</a></div></li>'
        $('#search-results').append(item);
        i++;
    })
}

function paginateResults(data) {
    let arr = [];
    for(let i = 0; i < data.length; i++) {
        let smallArr = [];
        for(let c = 0; c < 10; c++) {
            if(data[i]) {
                smallArr.push(data[i])
                i++;
            } else {
                break;
            }
        }
        arr.push(smallArr);
    }
    console.log(arr);
    return arr;
}

function paginationButtons(data) {
    $()
}