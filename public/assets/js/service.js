//retrieve the parameter "name" in the URL
$.urlParam = function (name) {
    const results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
};


async function getPerson(id) {
    const service = await (await fetch('/v1/service/by_id/' + id)).json();
    console.log(service)
    $('#service_name').html(service.name)
    $('#service_presentation').html(service.presentation)
    document.getElementById("service_img").src = service.image_urls[0]
    console.log(service.image_urls)
}


//retrieve the author id from URL and fill the page
$(async function () {
    const service = $.urlParam("service");
    console.log(service)
    getPerson(service)
});

