//retrieve the parameter "name" in the URL
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

async function loadPerson(id) {
    let person = await (await fetch('/v1/person/by_id/' + id)).json();
    person = person[0]
    $('.name_surname').html(person.name + " " + person.surname)
    $("#brief_description").html(person.description.substring(1, 50))
    $("#description").html(person.description)
    document.getElementById("person_img").src = "../assets/img/person/" + person.image_url
    $('#skills_list').append(skills_list_function(person.skills))
}

function getRow(content) {
    return '<div class="row mt-3">\n' +
        content +
        '            </div>';

}

function getCard(content) {
    let image_url = content["image_url"];
    let name = content["name"];
    let presentation = content["presentation"];

    return    '       <div class="col-md-4">\n' +
    '                    <div class="card mb-3">\n' +
    '                        <img class="card-img-top "\n' +
    '                             src="' + image_url + '"\n' +
    '                             alt="Card image cap">\n' +
    '                        <div class="card-body">\n' +
    '                            <h4 class="card-title">' + name + '</h4>\n' +
    '                            <p class="card-text">' + presentation +
    '                                </p>\n' +
    '                            <div class="d-flex justify-content-center">\n' +
    '                                <a class="btn btn-primary alert-dark">Button</a>\n' +
    '                            </div>\n' +
    '\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>';
}



async function loadEvents(id) {
    let events = await (await fetch('/v1/person/by_id/' + id + '/events')).json();

    let html = '';
    events.forEach(
        (event) => {
            html += getCard(event);
        }
    )
    html = getRow(html);
    $('#events').append(html);
}

async function loadServices(id) {
    let services = await (await fetch('/v1/person/by_id/' + id + '/services')).json();
    console.log(services)
    let html = '';
    services.forEach(
        (event) => {
            html += getCard(event);
        }
    )
    html = getRow(html);
    $('#services').append(html);

}


$(async function () {
    const person_id = $.urlParam("id");
    await loadPerson(person_id);
    await loadEvents(person_id);
    await loadServices(person_id)


});

