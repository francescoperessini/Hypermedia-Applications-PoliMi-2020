getRow = function (person) {
    return '<div class="row mt-5"> <!-- PERSON SECTION -->\n' +
        '        <div class="col-md-1"></div>\n' +
        '        <div class="col-md-9">\n' +
        '            <div class="row badge-light ">\n' +
        '                <!--USER PHOTO-->\n' +
        '                <div class="col-md-3 text-center">\n' +
        '                    <img class="rounded-circle custom-rounded-circle mt-4 mb-4 mr-4" src="' + person.image_url + '">\n' +
        '                </div>\n' +
        '                <!--USER DESCRIPTION-->\n' +
        '                <div class="col-md-9 align-self-center text-center">\n' +
        '                    <a href="/pages/person.html?id=' + person.id + '"> <h4>' + person.name + ' ' + person.surname + '</h4></a>\n' +
        '                    <p class="mt-4">' + person.description + '</p>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="col-md-2"></div>\n' +
        '    </div>'
}

async function getPeople() {
    let people;
    try {
        let response = await fetch('/v1/people/');
        if (response.ok) {
            people = await response.json();
            let html = ""
            people.forEach((person) => {
                html += getRow(person)
            })
            $('#container').append(html)
        } else {
            window.location.replace("../index.html");
        }
    } catch (e) {
        //Network error
        console.log(e);
    }
}

$(async function () {
    await getPeople()
});
