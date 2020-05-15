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
            //TODO
        } else {
            window.location.replace("../index.html");
        }
    } catch (e) {
        //Network error
        console.log(e);
    }
}

async function getEventOrganizer(id) {
    let person;
    try {
        let response = await fetch('/v1/event/by_id/' + id + '/organizer');
        if (response.ok) {
            person = await response.json();
            //TODO
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
            //TODO
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
    await getEventOrganizer(event_id)
    await getEventService(event_id)
});
