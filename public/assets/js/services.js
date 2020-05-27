getCard = function (service, i) {
    html = '<div class="card mb-4 border-0">\n' +
        '                    <img src="' + service.image_urls[0] + '" class="card-img-top rounded-circle" alt="' + service.name + ' photo">\n' +
        '                    <div class="card-body text-center">\n' +
        '                        <a href="/pages/service.html?id=' + service.id + '"><h5 class="card-title">' + service.name + '</h5></a>\n' +
        '                        <p class="card-text">' + service.practical_info + '</p>\n' +
        '                    </div>\n' +
        '                </div> '
    if (i == 1) {
        html += '<div class="w-100 d-none d-sm-block d-xl-none"><!-- wrap every 2 on sm--></div>\n'
    } else if (i == 3) {
        html += '<div class="w-100 d-none d-sm-block d-xl-none"><!-- wrap every 2 on sm--></div>\n'
        html += '<div class="w-100 d-none d-lg-block d-md-none"><!-- wrap every 4 on lg--></div>\n'
    }
    return html
}

getRow = function (services_html) {
    return '<div class="card-deck border-0">\n' + services_html + ' </div>'
}

async function getServices() {
    let services;
    try {
        let response = await fetch('/v1/services/');
        let content_html = "";
        if (response.ok) {
            services = await response.json();
            let i = 0;
            services.forEach((service) => {

                content_html += getCard(service, i)
                i++;
            })
            html = getRow(content_html)
            $("#servcices_container").html(html)

        } else {
            window.location.replace("./404.html");
        }
    } catch (e) {
        //Network error
        console.log(e);
    }
}

$(async function () {
    await getServices()
});