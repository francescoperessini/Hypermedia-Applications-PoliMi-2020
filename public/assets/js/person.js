$.urlParam = function (name) {
    const results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
};

skills_list_function = function (skills) {
    let html = ""
    skills.forEach((skill) => {
        html += '<li id="skill1">' + skill + '</li>'
    })
    return html
}

function getRow(content) {
    return '<div class="card-deck">\n' +
        content +
        '            </div>';

}

function getCard(content) {
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
        '                                </p>\n' +

        '\n' +
        '                        </div>\n' +
        '                    </div>\n';
}

function truncate(string, end) {
    if (string.length > end) {
        return string.substring(0, end) + '...';
    }
    return string
}

async function loadPerson(id) {
    let person;
    try {
        let response = await fetch('/v1/person/by_id/' + id);
        if (response.ok) {
            person = await response.json();
            $('.name_surname').html(person.name + " " + person.surname)
            $("#brief_description").html(person.leitmotiv)
            $("#description").html(person.description)
            $("#phone_number").append(" " + person.telephone)
            $("#email").append(" " + person.email)
            document.getElementById("person_img").src = person.image_url
            $('#skills_list').append(skills_list_function(person.skills))
        } else {
            window.location.replace("../index.html");
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
            events.forEach(
                (event) => {
                    html += getCard(event);
                }
            )
            html = getRow(html);
            $('#events').append(html);
        } else {
            //window.location.replace("../index.html");
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
                    html += getCard(event);
                }
            )
            html = getRow(html);
            $('#services').append(html);
        } else {
            //window.location.replace("../index.html");
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
});
