$.urlParam = function (name) {
    const results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
};

let peopleList = []

skills_list_function = function (skills) {
    let html = ""
    skills.forEach((skill) => {
        html += '<li id="skill1">' + skill + '</li>'
    })
    return html
}

function getRow(content, active = false) {
    return '<div class="carousel-item '+ (active?' active':'') +'"><div class="card-deck">\n' +
        content +
        '            </div>' +
        '</div>';

}

function getCard(content, type) {
    let image_url = '' + content["image_url"];
    let image_urls = content["image_urls"];
    if (image_urls) image_url = image_urls[0];
    let name = content["name"];
    let presentation = content["presentation"];

    return '                    <div class="card h-100">\n' +
        '                        <img class="card-img-top img-fluid"\n' +
        '                             src="' + image_url + '"\n' +
        '                             alt="Card image cap">\n' +
        '                        <div class="card-body">\n' +
        '                            <h4 class="card-title">' + name + '</h4>\n' +
        '                            <p class="card-text">' + truncate(presentation, 100) +
        '                            </p>\n' +
        '  <a class="btn btn-secondary" href="' + type + '.html?id=' + content['id'] + '">Learn More...</a>' +

        '                        </div>\n' +
        '                    </div>\n';
}

function truncate(string, end) {
    if (string.length > end) {
        return string.substring(0, end) + '...';
    }
    return string
}

let person;

async function loadPerson(id) {

    try {
        let response = await fetch('/v1/person/by_id/' + id);
        if (response.ok) {
            person = await response.json();
            $('.name_surname').html(person.name + " " + person.surname)
            $("#brief_description").html(person.leitmotiv)
            $("#description").html(person.description)
            $("#phone_number").append(" " + person.telephone)
            $("#email").append(" " + person.email)
            $("#person_img").attr("src", person.image_url).attr("alt", person.name + person.surname + "'s profile photo")
            $('#skills_list').append(skills_list_function(person.skills))
        } else {
            window.location.replace("./404.html");
        }
    } catch (e) {
        //Network error
        console.log(e);
    }
}

async function loadEvents(id) {
    let events;
    try {
        let response = await fetch('/v1/person/by_id/' + id + '/events');
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
                    innerHTML += getCard(event, 'event');
                    i++;
                }
            )
            html += getRow(innerHTML, true);
            $('#events').append(html);
        } else {
            //window.location.replace("./404.html");
        }
    } catch (e) {
        //Network error
        console.log(e);
    }
}

async function loadServices(id) {
    let services;
    try {
        let response = await fetch('/v1/person/by_id/' + id + '/services');
        if (response.ok) {
            services = await response.json();
            console.log(services)
            let html = '';
            services.forEach(
                (event) => {
                    html += getCard(event, 'service');
                }
            )
            html = getRow(html, true);
            $('#services').append(html);
        } else {
            //window.location.replace("./404.html");
        }
    } catch (e) {
        //Network error
        console.log(e);
    }
}

function redirect(id, increment) {
    let indexOfEvent = 0;
    peopleList.forEach((person) => {
        if (person["id"] == id) {
            indexOfEvent = peopleList.indexOf(person);
        }
    })
    indexOfEvent = indexOfEvent + (increment);
    indexOfEvent = indexOfEvent < 0 ? peopleList.length - 1 : indexOfEvent;
    indexOfEvent = indexOfEvent % peopleList.length

    window.location.href = ('person.html?id=' + peopleList[indexOfEvent]["id"]);

}

async function loadPersonList() {
    try {
        let response = await fetch('/v1/people/');
        if (response.ok) {
            peopleList = await response.json();

        } else {
            //window.location.replace("./404.html");
        }
    } catch (e) {
        //Network error
        console.log(e);
    }
}

$(async function () {
    const person_id = $.urlParam("id");
    await loadPerson(person_id);
    await loadEvents(person_id);
    await loadServices(person_id);

    $("#nav_info_person").attr("href", "person.html?id=" + person_id)
    $("#nav_info_person").append("/ " + person.name + " " + person.surname)

    await loadPersonList();

    $(document).ready(function () {
        $("#next").click(function () {
            redirect(person_id, +1)
        });
        $("#prev").click(function () {
            redirect(person_id, -1)
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
