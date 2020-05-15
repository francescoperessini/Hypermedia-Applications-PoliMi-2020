$.urlParam = function (id) {
    const results = new RegExp('[\?&]' + id + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
};

async function getEvent(id) {
    let event;
    try {
        let response = await fetch('/v1/event/by_id/' + id);
        if (response.ok) {
            event = await response.json();
            let event = event[0]
            let [date, time] = event["event_date"].split("T");
            time = time.split('.')[0]
            $('#date').append(date)
            $('#hour').append(time)
            $('#event_name').append(event["name"])
            $('#event_description').append(event["presentation"])
            $('#image').attr("src",event["image_url"])
        } else {
            window.location.replace("../index.html");
        }
    } catch (e) {
        //Network error
        console.log(e);
    }

}

function getCard(content) {
    let image_url = '' + content["image_url"];
    let image_urls = content["image_urls"];
    if (image_urls) image_url = '../assets/img/service/' + image_urls[0];
    let name = content["name"];
    let presentation = content["presentation"] || content["description"];

    return '    <div class="col-md-8 col-lg-6 col-xl-6 py-2 mx-auto"><div class="card h-100">\n' +
        '                        <img class="card-img-top  img-fluid"\n' +
        '                             src="' + image_url + '"\n' +
        '                             alt="Card image cap">\n' +
        '                        <div class="card-body">\n' +
        '                            <h4 class="card-title">' + name + '</h4>\n' +
        '                            <p class="card-text">' + truncate(presentation ,100) +
        '                                </p>\n' +

        '\n' +
        '                        </div>\n' +
        '                    </div></div>\n';
}

function truncate(string, end) {
    if (string.length > end) {
        return string.substring(0, end) + '...';
    }
    return string
}

async function loadPersonService(id){
    let organizer = getEventOrganizer(id);
    organizer = organizer[0];
    let service = getEventService(id)
    service = service[0];

    let row = '<div class="container"><div class="row my-4">\n' +
        getCard(organizer) + getCard(service) +
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
            window.location.replace("../index.html");
        }
    } catch (e) {
        //Network error
        console.log(e);
    }
}

async function getEventService(id) {
    let service;
    try {
        let response = await fetch('/v1/event/by_id/' + id + '/service');
        if (response.ok) {
            service = await response.json();
            return service
        } else {
            window.location.replace("../index.html");
        }
    } catch (e) {
        //Network error
        console.log(e);
    }
}

$(async function () {
    const event_id = $.urlParam("id");
    await getEvent(event_id)
    await loadPersonService(event_id)
});
