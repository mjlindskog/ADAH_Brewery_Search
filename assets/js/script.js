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

function renderSearch(data, index) {
    //console.log(data);
    $('#search-results').empty();
    $('#search-results').removeClass('hide');
    $('#search-form').removeClass('m-0-bottom');

    //data = paginateResults(data);
    renderResultElement(data[index]);
    paginationButtons(data, index);
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
    localStorage.setItem('currentResults', JSON.stringify(data));
    //console.log('data=');
    //console.log(data);
    let i = 0;
    data.forEach(el => {
        let result = 'result-' + i;
        let content = 'content-' + i;
        let button = 'button-' + i;
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
        let item = '<li class="accordion-item" data-accordion-item><a href="' + contentHref + '" role="tab" class="accordion-title" id="' + result + '">'+ el.name + '</a><div class="accordion-content" role="tabpanel" data-tab-content id="' + content + '"><div class="flex-row justify-space-between border-bottom-black"><h3 class="">' + el.brewery_type.toUpperCase() + '</h3><a href="beer.html" class="button" id="' + button + '">Learn More</a></div><h4>' + el.street + '</h4><h4 class="border-bottom-black">' + el.city + ', ' + el.state + '</h4><h5>' + phone + '</h5><a href="' + hrefURL + '" target="_blank">' + url + '</a></div></li>'
        $('#search-results').append(item);
        i++;
        setButtonListener(button);
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
    //console.log(arr);
    return arr;
}

function paginationButtons(data, index) {
    $('#pagination-buttons').empty();
    let prev = '<li class="pagination-previous" id="previous-page"><a href="#" aria-label="Previous page">Previous</a></li>';
    $('#pagination-buttons').append(prev);

    for(let i = 0; i < data.length; i++) {
        let pageNum = 'page-' + i;
        let displayPage = i + 1;
        //let element = '<li id="' + pageNum + '">' + i + '</li>'
        let element = '<li id="' + pageNum + '"><a href="#" aria-label="Page ' + displayPage + '">' + displayPage + '</a></li>'
        $('#pagination-buttons').append(element);
        //console.log('events')
        pageNum = '#' + pageNum;
        $(pageNum).click(() => {
            console.log(pageNum)
            event.preventDefault();
            paginationEvents(data, pageNum)
        });
        //console.log('i=' + i);
        //console.log('index=' + index);
        index = parseInt(index);
        let plus2 = index + 2;
        let minus3 = data.length - 3;
        if(minus3 < 0) {
            minus3 = 0;
        }
        //console.log('2+index=' + plus2);
        //console.log('minus2=' + minus2)
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
    let next = '<li class="pagination-next" id="next-page"><a href="#" aria-label="Next page">Next</a></li>'
    $('#pagination-buttons').append(next);
    let active = '#page-' + index;
    $(active).addClass('current');
    $('#previous-page').click(() => {
        event.preventDefault()
        prevEvents(data, active)
    });
    $('#next-page').click(() => {
        event.preventDefault();
        nextEvents(data, active)
    });
    if(index == 0) {
        $('#previous-page').empty();
        $('#previous-page').off();
        $('#previous-page').text('Previous');
        $('#previous-page').addClass('disabled');
    } else if(index == (data.length-1)) {
        $('#next-page').empty();
        $('#next-page').off();
        $('#next-page').text('Next');
        $('#next-page').addClass('disabled');
    }
    $('#pagination-nav').removeClass('hide');
}

function setButtonListener(id) {
    let JQid = '#' + id;
    $(JQid).click(el => {
        localStorage.setItem('selectedResult', JSON.stringify(id));
    })
}

function paginationEvents(data, pageNum) {
    //console.log(data)
    event.preventDefault();
    let index = pageNum.split('-')[1];
    //console.log('index=' + index);
    renderSearch(data, index);
}

function nextEvents(data, pageNum) {
    //console.log(data)
    event.preventDefault();
    let index = pageNum.split('-')[1];
    index = addToString(index, 1);
    //console.log('index=' + index);
    renderSearch(data, index);
}

function prevEvents(data, pageNum) {
    //console.log(data)
    event.preventDefault();
    let index = pageNum.split('-')[1];
    index = addToString(index, -1);
    //console.log('index=' + index);
    renderSearch(data, index);
}

function addToString(el, add) {
    el = parseInt(el) + add;
    el = el.toString();
    return el
}

