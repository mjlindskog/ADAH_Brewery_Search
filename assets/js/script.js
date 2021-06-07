//Search Bar Event Listener
$('#search-button').click(() => {
    let val = $('#search-bar').val();
    url = 'https://api.openbrewerydb.org/breweries/search?query=' + val;
    fetch(url)
        .then(response => response.json())
        .then(data => renderSearch(data));
})

function renderSearch(data) {
    $('#search-results').empty();
    $('#search-results').removeClass('hide');
    $('#search-form').removeClass('m-0-bottom');
    let i = 0;
    data.forEach(el => {
        let result = 'result-' + i;
        let content = 'content-' + i;
        let phone = formatPhoneNumber(el.phone)
        if(phone === null) {
            phone = 'No Phone Number Listed'
        }
        let contentHref = '#content-' + i;
        let item = '<li class="accordion-item" data-accordion-item><a href="' + contentHref + '" role="tab" class="accordion-title" id="' + result + '">'+ el.name + '</a><div class="accordion-content" role="tabpanel" data-tab-content id="' + content + '"><h3 class="border-bottom-black">' + el.brewery_type.toUpperCase() + '</h3><h4>' + el.street + '</h4><h4 class="border-bottom-black">' + el.city + ', ' + el.state + '</h4><h5>' + phone + '</h5><a href="' + el.website_url + '" target="_blank">' + el.website_url + '</a></div></li>'
        $('#search-results').append(item);
        i++;
    })
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