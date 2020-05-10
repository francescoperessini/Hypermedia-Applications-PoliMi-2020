//retrieve the parameter "name" in the URL
$.urlParam = function (name) {
    const results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
};

skills_list_function = function(skills){
    let html = ""
    skills.forEach((skill) => {
        html += '<li id="skill1">' + skill + '</li>'
    })
    return html
}

async function getPerson(id) {
    let person = await (await fetch('/v1/person/by_id/' + id)).json();
    person = person[0]
    $('.name_surname').html(person.name + " " + person.surname)
    $("#brief_description").html(person.description.substring(1, 50))
    $("#description").html(person.description)
    document.getElementById("person_img").src = "../assets/img/person/" + person.image_url
    $('#skills_list').append(skills_list_function(person.skills))
}



$(async function () {
    const person_id = $.urlParam("id");
    await getPerson(person_id)
});

