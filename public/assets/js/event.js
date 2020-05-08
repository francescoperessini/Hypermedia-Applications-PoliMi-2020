//retrieve the parameter "name" in the URL
$.urlParam = function (id) {
    const results = new RegExp('[\?&]' + id + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
};


async function getEvent(id) {
    console.log("#####" + id)
    const person = await (await fetch('/v1/person/by_id/' + id)).json();
    console.log(person)

}


//retrieve the author id from URL and fill the page
$(async function () {
    console.log("SONO DENTRO")
    const event_id = $.urlParam("id");
    getEvent(event_id)

});


