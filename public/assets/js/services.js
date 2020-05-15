async function getServices() {
    let services;
    try {
        let response = await fetch('/v1/services/');
        if (response.ok) {
            services = await response.json();
            //TODO
        } else {
            window.location.replace("../index.html");
        }
    } catch (e) {
        //Network error
        console.log(e);
    }
}

$(async function () {
    await getServices()
});