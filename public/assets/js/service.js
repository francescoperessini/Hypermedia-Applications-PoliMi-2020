$.urlParam = function (name) {
    const results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
};

let serviceList = []

function truncate(string, end) {
    if (string.length > end) {
        return string.substring(0, end) + '...';
    }
    return string
}


function getCardRelatedEvents (content, type) {
    let image_url = '' + content["image_url"];
    let image_urls = content["image_urls"];
    if (image_urls) image_url = image_urls[0];
    let name = content["name"];
    let presentation = content["presentation"];
    let skill_level = content["skill_level"];

    return '                    <div class="card">\n' +
        '                        <img class="card-img-top img-fluid"\n' +
        '                             src="' + image_url + '"\n' +
        '                             alt="Card image cap">\n' +
        '                        <div class="card-body">\n' +
        '                            <h4 class="card-title">' + name + '</h4>\n' +
        '<p class="card-text alert alert-secondary">' + skill_level + '</p>' +
        '                            <p class="card-text">' + truncate(presentation, 100) +
        '                            </p>\n' +
        '  <a class="btn btn-secondary" href="' + type + '.html?id=' + content['id'] + '">Learn More...</a>' +

        '                        </div>\n' +
        '                    </div>\n';
}
function getCardRelatedPeople (person) {
    return '<div class="card ">\n' +
        '                <img src="' + person.image_url + '" class="card-img-top" alt="' + person.name + ' ' + person.surname + ' profile photo">\n' +
        '                <div class="card-body text-center">\n' +
        '                    <h5 class="card-title">' + person.name + ' ' + person.surname + '</h5>\n' +
        '                    <p class="card-text">' + person.description.substr(0, 100) + '...</p>\n' +
        '<a href="/pages/person.html?id=' + person.id + '"><button type="button" class="btn btn-secondary">View More</button></a>' +
        '                </div>\n' +
        '            </div>'
}
let service

async function getService(id) {
    //let service;
    console.log("entrato")
    try {
        let response = await fetch('/v1/service/by_id/' + id);
        if (response.ok) {
            service = await response.json();
            $('#service_name').html(service.name)
            $('#service_presentation').html(service.presentation)
            //TODO carousel of images
            $("#service_img").attr("src", service.image_urls[0]).attr("alt", service.name + " photo");
        } else {
            window.location.replace("./404.html");
        }
    } catch (e) {
        //Network error
        console.log(e);
    }
}

function getRow(content, active = false) {
    return '<div class="carousel-item '+ (active?' active':'') +'"><div class="card-deck">\n' +
        content +
        '            </div>' +
        '</div>';

}

async function getEvents(id) {
    let events;
    try {
        let response = await fetch('/v1/service/by_id/' + id + '/events');
        if (response.ok) {
            events = await response.json();
            let html = '';
            let i = 0;
            let innerHTML = '';
            events.forEach(
                (event) => {
                    if (!(i % 4) && i !== 0) {
                        html += getRow(innerHTML);
                        innerHTML = '';
                    }
                    innerHTML += getCardRelatedEvents(event, 'event');
                    i++;
                }
            )
            html += getRow(innerHTML, true);
            $('#related-events').append(html);
        } else {
            window.location.replace("./404.html");
        }
    } catch (e) {
        //Network error
        console.log(e);
    }
}

function truncate(string, end) {
    if (string.length > end) {
        return string.substring(0, end) + '...';
    }
    return string
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
            window.location.replace("./404.html");
        }
    } catch (e) {
        //Network error
        console.log(e);
    }
}

function redirect(id, increment) {
    let indexOfEvent = 0;
    serviceList.forEach((service) => {
        if (service["id"] == id) {
            indexOfEvent = serviceList.indexOf(service);
        }
    })
    indexOfEvent = indexOfEvent + (increment);
    indexOfEvent = indexOfEvent < 0 ? serviceList.length - 1 : indexOfEvent;
    indexOfEvent = indexOfEvent % serviceList.length

    window.location.href = ('service.html?id=' + serviceList[indexOfEvent]["id"]);

}

async function loadServiceList() {
    try {
        let response = await fetch('/v1/services/');
        if (response.ok) {
            serviceList = await response.json();

        } else {
            window.location.replace("./404.html");
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

    $("#nav_infos_service_name").attr("href", "service.html?id=" + service_id).append("/ " + service.name)



    await loadServiceList()


    $(document).ready(function () {
        $("#next").click(function () {
            redirect(service_id, +1)
        });
        $("#prev").click(function () {
            redirect(service_id, -1)
        });
    });
});

(function ($) {
    "use strict";

    // manual carousel controls
    $('.next').click(function () {
        $('.carousel').carousel('next');
        return false;
    });
    $('.prev').click(function () {
        $('.carousel').carousel('prev');
        return false;
    });

})(jQuery);
