getRow = function (person, i) {
    if (i % 2 === 0) {
        return '<div class="row mt-5"> <!-- PERSON SECTION -->\n' +
            '        <div class="col-md-1"></div>\n' +
            '        <div class="col-md-9">\n' +
            '            <div class="row badge-light ">\n' +
            '                <!--USER PHOTO-->\n' +
            '                <div class="col-md-3 text-center">\n' +
            '                    <img class="rounded-circle custom-rounded-circle mt-4 mb-4 ml-4" src="../assets/img/person/person_1.png">\n' +
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
    } else {
        return '<div class="row mt-5"> <!-- PERSON SECTION -->\n' +
            '        <div class="col-md-2"></div>\n' +
            '        <div class="col-md-9">\n' +
            '            <div class="row badge-light " >\n' +
            '                <!--USER DESCRIPTION-->\n' +
            '                <div class="col-md-9 align-self-center text-center">\n' +
            '                    <a href="/pages/person.html?id=' + person.id + '"> <h4>' + person.name + ' ' + person.surname + '</h4></a>\n' +
            '                    <p class="mt-4">' + person.description + '</p>\n' +
            '                </div>\n' +
            '                <!--USER PHOTO-->\n' +
            '                <div class="col-md-3 text-center"">\n' +
            '                    <img class="rounded-circle custom-rounded-circle mt-4 mb-4 mr-4" src="../assets/img/person/person_2.png">\n' +
            '                </div>\n' +
            '\n' +
            '            </div>\n' +
            '        </div>\n' +
            '        <div class="col-md-1"></div>\n' +
            '    </div>'
    }


}

async function getPeople() {
    const people = await (await fetch('/v1/people/')).json();
    let html = ""
    let i = 0
    people.forEach((person) => {
        html += getRow(person, i)
        i++
    })

    $('#container').append(html)
}


$(async function () {
    await getPeople()
});

