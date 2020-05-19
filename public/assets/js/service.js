$.urlParam = function (name) {
    const results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
};

getCardRelatedEvents = function (event) {
    return '<div class="card border-0">\n' +
        '                <img src="' + event.image_url + '" class="card-img-top rounded-circle h-30" alt="' + event.name + ' photo">\n' +
        '                <div class="card-body text-center">\n' +
        '                    <h5 class="card-title">' + event.name + '</h5>\n' +
        '                    <p class="card-text">' + event.practical_info.substr(0, 150) + '...</p>\n' +
        '                </div>\n' +
        '            </div>'
}

getCardRelatedPeople = function (person) {
    return '<div class="card border-0">\n' +
        '                <img src="' + person.image_url + '" class="card-img-top rounded-circle" alt="' + person.name +' '+ person.surname + ' profile photo">\n' +
        '                <div class="card-body text-center">\n' +
        '                    <h5 class="card-title">' + person.name + ' ' + person.surname + '</h5>\n' +
        '                    <p class="card-text">' + person.description.substr(0, 100) + '...</p>\n' +
        '                </div>\n' +
        '            </div>'
}

async function getService(id) {
    let service;
    try {
        let response = await fetch('/v1/service/by_id/' + id);
        if (response.ok) {
            service = await response.json();
            $('#service_name').html(service.name)
            $('#service_presentation').html(service.presentation)
            //TODO carousel of images
            $("#service_img").attr("src", service.image_urls[0]).attr("alt", service.name + " photo");
        } else {
            window.location.replace("../index.html");
        }
    } catch (e) {
        //Network error
        console.log(e);
    }
}

async function getEvents(id) {
    let events;
    try {
        let response = await fetch('/v1/service/by_id/' + id + '/events');
        if (response.ok) {
            events = await response.json();
            let html = "";
            events.forEach((event) => {
                html += getCardRelatedEvents(event)
            })
            $('#related-events').append(html);
        } else {
            window.location.replace("../index.html");
        }
    } catch (e) {
        //Network error
        console.log(e);
    }
}

async function getInvolvedPeople(id) {
    let people;
    try {
        let response = await fetch('/v1/service/by_id/' + id + '/people');
        if (response.ok) {
            people = await response.json();
            let html = "";
            people.forEach((person) => {
                html += getCardRelatedPeople(person)
            })
            $('#involved-people').append(html)
        } else {
            window.location.replace("../index.html");
        }
    } catch (e) {
        //Network error
        console.log(e);
    }
}

$(async function () {
    const service_id = $.urlParam("id");
    await getService(service_id)
    await getEvents(service_id)
    await getInvolvedPeople(service_id)
});
