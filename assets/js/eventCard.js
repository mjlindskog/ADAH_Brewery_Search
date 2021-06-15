function renderEventCards(events) {
    let i = 0;
    events.forEach(el => {
        //console.log(el)
        let card = 'eventCard-' + i;
        let name = 'eventName-' + i;
        let address = 'eventAddress-' + i;
        let time = 'eventTime-' + i;
        let ticket = 'ticketButton-' + i;
        let timeValue = militaryToNormal(el.dates.start.localTime)
        let date = 'eventDate-' + i;
        let dateValue = formatDate(el.dates.start.localDate);
        let item = `<div class="card m-25" id="${card}" style="width: 300px;"><div class="card-divider"><h4 class="event-name" id="${name}">${el.name}</h4></div><div class="card-section"><p id="${address}">${el._embedded.venues[0].name}</p><p id="${date}">${dateValue}</p><p id="${time}">${timeValue}</p><a id="${ticket}">Buy Ticket</a></div></div>`;
        $('#event-box').append(item);
        ticket = '#' + ticket;
        $(ticket).attr('href', el.url)
        $(ticket).attr('target', "_blank")
        i++;
    });
}

function militaryToNormal(time){
    let hour = time.split(":")[0]
    let minute = time.split(":")[1]
    //console.log(hour);
    if(hour > 12){
        hour -= 12;
        time = hour + ':' + minute + ' PM'
    } else {
        time = hour + ':' + minute + ' AM';
    }
    return time;
}

function formatDate(date) {
    date = date.split('-');
    let month = date[1];
    let day = date[2];
    let year = date[0];

    date = month + '/' + day + '/' + year;
    return date;
}