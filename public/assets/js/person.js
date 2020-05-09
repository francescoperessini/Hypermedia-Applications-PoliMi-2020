//retrieve the parameter "name" in the URL
$.urlParam = function (name) {
    const results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
};


async function getPerson(id) {
    const person = await (await fetch('/v1/person/by_id/' + id)).json();
    console.log(person.name)
    console.log("---------")
    console.log("-->" + person.name + "-->" + person.surname)
    $('.name_surname').html(person.name + " " + person.surname)
    $("#brief_description").html(person.description.substring(1, 50))
    $("#description").html(person.description)
    document.getElementById("person_img").src = person.image_url
}


$(async function () {
    const person_id = $.urlParam("id");
    console.log(person_id)
    await getPerson(person_id)
});

