//Search Bar Event Listener
$('#search-button').click(() => {
    let val = $('#search-bar').val();
    url = 'https://api.openbrewerydb.org/breweries/search?query=' + val;
    fetch(url)
        .then(response => response.json())
        .then(data => renderSearch(data));
})

function renderSearch(data) {
    $('#search-results').removeClass('hide');
    $('#search-form').removeClass('m-0-bottom');
    let i = 0;
    data.forEach(el => {
        let result = 'result-' + i;
        let content = 'content-' + i;
        let contentHref = '#content-' + i;
        let item = '<li class="accordion-item" data-accordion-item><a href="' + contentHref + '" role="tab" class="accordion-title" id="' + result + '">'+ el.name + '</a><div class="accordion-content" role="tabpanel" data-tab-content id="' + content + '"><h3>' + el.brewery_type + '</h3><h4>' + el.city + ', ' + el.state + '</h4><h5>' + el.street + '</h5><h5>' + el.phone + '</h5><a>' + el.website_url + '</a></div></li>'
        $('#search-results').append(item);
        i++;
    })
}