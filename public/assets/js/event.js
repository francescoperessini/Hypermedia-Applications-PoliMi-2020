$.urlParam = function (id) {
    const results = new RegExp('[\?&]' + id + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
};


let eventList = []

async function getEvent(id) {
    let event;
    try {
        let response = await fetch('/v1/event/by_id/' + id);
        if (response.ok) {
            event = await response.json();
            let [date, time] = event["event_date"].split("T");
            time = time.split('.')[0]
            $('#date').append(date)
            $('#hour').append(time)
            $('#event_name').append(event["name"])
            $('#event_description').append(event["presentation"])
            $('#image').attr("src", event["image_url"])
            $('#image').attr("alt", event["name"] + '_image')
        } else {
            window.location.replace("../index.html");
        }
    } catch (e) {
        //Network error
        console.log(e);
    }

}

function getCard(content, type) {
    let image_url = content["image_url"];
    let image_urls = content["image_urls"];
    if (image_urls) image_url = image_urls[0];
    let name = content["name"];
    let presentation = content["presentation"] || content["description"];
    let id = content['id'];
    let title
    if(type === 'person'){
        title = '<h1 class="text-center">Organized by</h1>'
    }else if (type === 'service'){
        title = '<h1 class="text-center">Related service</h1>'
    }
    return '    <div class="col-md-8 col-lg-6 col-xl-6 py-2">' + title +
        '<div class="card custom-mobile-card mx-auto">\n' +
        '                        <img class="card-img-top  img-fluid"\n' +
        '                             src="' + image_url + '"\n' +
        '                             alt="' + name + '">\n' +
        '                        <div class="card-body">\n' +
        '                            <h4 class="card-title">' + name + '</h4>\n' +
        '                            <p class="card-text">' + truncate(presentation, 100) +
        '                                </p>\n' +

        '<a class=\'btn btn-secondary\' href=\'/pages/' + type + '.html?id=' + id + '\'>Learn More</a>' +
        '                        </div>\n' +
        '                    </div></div>\n';
}

function truncate(string, end) {
    if (string.length > end) {
        return string.substring(0, end) + '...';
    }
    return string
}

async function loadPersonService(id) {
    let organizer = await getEventOrganizer(id);
    let service = await getEventService(id);

    let row = '<div class="container"><div class="row my-4">\n' +
        getCard(organizer, 'person') + getCard(service, 'service') +
        '</div></div>'

    $('#person_service').append(row);


}


async function getEventOrganizer(id) {
    let person;
    try {
        let response = await fetch('/v1/event/by_id/' + id + '/organizer');
        if (response.ok) {
            person = await response.json();
            return person
        } else {
            //window.location.replace("../index.html");
        }
    } catch (e) {
        //Network error
        console.log(e);
    }
    return undefined
}

async function getEventService(id) {
    let service;
    try {
        let response = await fetch('/v1/event/by_id/' + id + '/service');
        if (response.ok) {
            service = await response.json();
            return service
        } else {
            //window.location.replace("../index.html");
        }
    } catch (e) {
        //Network error
        console.log(e);
    }
    return undefined
}

function redirect(id, increment, month) {
    let indexOfEvent = 0;
    eventList.forEach((event) => {
        if (event["id"] == id) {
            indexOfEvent = eventList.indexOf(event);
        }
    })
    indexOfEvent = indexOfEvent + (increment);
    indexOfEvent = indexOfEvent < 0 ? eventList.length - 1 : indexOfEvent;
    indexOfEvent = indexOfEvent % eventList.length

    console.log('event.html?id=' + eventList[indexOfEvent] )

    window.location.href = ('event.html?id=' + eventList[indexOfEvent]["id"] );


}

async function loadMonthEvents(id) {
    let events;
    try {
        let response = await fetch('/v1/event/by_id/'+ id +'/related_events');
        if (response.ok) {
            events = await response.json();
            events.forEach((event) => {
                eventList.push(event)
            })

        } else {
            //window.location.replace("../index.html");
        }
    } catch (e) {
        //Network error
        console.log(e);
    }

}

$(async function () {
    const event_id = $.urlParam("id");

    try {
        await getEvent(event_id)
        await loadMonthEvents(event_id)
        await loadPersonService(event_id)

    } catch (e) {
        console.log(e)
    } finally {
        $(document).ready(function () {
            $("#next").click(function () {
                redirect(event_id, +1)
            });
            $("#prev").click(function () {
                redirect(event_id, -1)
            });
        });
    }


});
