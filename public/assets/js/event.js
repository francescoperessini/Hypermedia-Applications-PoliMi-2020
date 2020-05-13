//retrieve the parameter "name" in the URL
$.urlParam = function (id) {
    const results = new RegExp('[\?&]' + id + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
};


async function getEvent(id) {
    const person = await (await fetch('/v1/person/by_id/' + id)).json();
}


$(async function () {
    const event_id = $.urlParam("id");
    await getEvent(event_id)
});

