//retrieve the parameter "name" in the URL
$.urlParam = function (name) {
    const results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
};


async function getService(id) {
    let service = await (await fetch('/v1/service/by_id/' + id)).json();
    service = service[0]
    $('#service_name').html(service.name)
    $('#service_presentation').html(service.presentation)
    document.getElementById("service_img").src = "../assets/img/services/" + service.image_urls[0]
}

getCardRelatedEvents = function (event) {
    return '<div class="card border-0">\n' +
        '                <img src="' + event.image_url + '" class="card-img-top rounded-circle h-30" alt="image">\n' +
        '                <div class="card-body text-center">\n' +
        '                    <h5 class="card-title">' + event.name + '</h5>\n' +
        '                    <p class="card-text">' + event.practical_info.substr(0, 150) + '...</p>\n' +
        '                </div>\n' +
        '            </div>'
}

getCardRelatedPeople = function (person) {
    return '<div class="card border-0">\n' +
        '                <img src="../assets/img/person/' + person.image_url + '" class="card-img-top rounded-circle" alt="...">\n' +
        '                <div class="card-body text-center">\n' +
        '                    <h5 class="card-title">' + person.name + ' ' + person.surname + '</h5>\n' +
        '                    <p class="card-text">' + person.description.substr(0, 100) + '...</p>\n' +
        '                </div>\n' +
        '            </div>'
}

async function getInvolvedPeople(id) {
    const people = await (await fetch('/v1/service/by_id/' + id + '/people')).json();
    let html = "";
    people.forEach((person) => {
        html += getCardRelatedPeople(person)
    })
    $('#involved-people').append(html)
}

async function getEvents(id) {
    const events = await (await fetch('/v1/service/by_id/' + id + '/events')).json();
    let html = "";
    events.forEach((event) => {
        html += getCardRelatedEvents(event)
    })

    $('#related-events').append(html);
}

$(async function () {
    const service_id = $.urlParam("service");

    await getService(service_id)
    await getEvents(service_id)
    await getInvolvedPeople(service_id)
});

