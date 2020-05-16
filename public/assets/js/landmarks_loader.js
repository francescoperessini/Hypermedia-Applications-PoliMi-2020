$("#navbar").load("../pages/components/navbar.html");
$("#footer").load("../pages/components/footer.html");


let options = {
    "association.html":"association",
    "event.html":"events_nav",
    "events.html":"events_nav",
    "events_by_month.html":"events_nav",
    "service.html":"services_nav",
    "services.html":"services_nav",
    "people.html":"people_nav",
    "person.html":"people_nav"
}

$(async function () {
    $(window).on('load',function () {
        let pageName = window.location.pathname.split("/").pop();
        const name = '#'+options[pageName];
        console.log(pageName);
        $(name).css("text-decoration","underline");
    });
});






