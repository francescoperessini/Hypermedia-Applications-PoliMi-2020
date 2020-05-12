//retrieve the parameter "name" in the URL
$.urlParam = function (name) {
    const results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || "jan";
};

getCard = function (event) {

    let name = ""
    let event_date = ""
    let presentation = ""
    let image_url = ""
    let practical_info = ""
    let id = ""

    if (event !== undefined) {
        name = event["name"]
        event_date = event["event_date"].split("T")[0]
        presentation = event["presentation"]
        image_url = event["image_url"]
        practical_info = event["practical_info"]
        id = event["id"]
    }


    let html = "<div class=\"card bg-light border \">\n" +
        "                <img class=\"events-card-img-top card-img-top\" src=\"" + image_url + "\" alt=\"Card image cap\">\n" +
        "                <div class=\"card-body\">\n" +
        "                    <h5 class=\"card-title\">" + name + "</h5>\n" +
        "                    <div class=\"row\">\n" +
        "                        <div class=\"col-md-4 text-right\">\n" +
        "                            <i class='fas fa-calendar-alt'></i>\n" +
        "                        </div>\n" +
        "                        <div class=\"col-md-8 text-left\">\n" +
        "                            " + event_date + "\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "\n" +
        "                    <p class=\"card-text mt-3\">" + presentation + "</p>\n" +
        "                </div>\n" +
        "            </div>"
    return html

}
getEmptyCard = function () {

    let html = "<div class=\"card bg-light border \">\n" +
        "                <div class=\"card-body\">\n" +
        "                    <h5 class=\"card-title\"></h5>\n" +
        "                    <div class=\"row\">\n" +
        "                        <div class=\"col-md-4 text-right\">\n" +
        "                        </div>\n" +
        "                        <div class=\"col-md-8 text-left\">\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "\n" +
        "                    <p class=\"card-text mt-3\"></p>\n" +
        "                </div>\n" +
        "            </div>"
    return html

}
getRow = function (rowContent) {

    let html = '<div class="row mt-3">\n' +
        '    <div class="col-md-1"></div>\n' +
        '    <div class="col-md-10">\n' +
        '        <div class="card-deck text-center">\n' +
        rowContent +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="col-md-1"></div>\n' +
        '</div>'
    return html


}

//retrieve the books written by the author and fill the template for each one
async function eventByMonth(month) {
    const events = await (await fetch('/v1/event/by_month/' + month)).json();

    let html = "";
    let rowContent = "";


    let i = 0;
    const num_events = events.length;
    events.forEach((event) => {

        if (i % 4 === 0) {
            html += i === 0 ? '' : getRow(rowContent)
            rowContent = ''
            rowContent += getCard(event)

        } else {
            rowContent += getCard(event)
        }

        if (i === num_events - 1) {
            let emptySpace = 3 - (i % 4)
            if (emptySpace !== 4) {
                for (const _ of Array(emptySpace).keys()) {
                    rowContent += getEmptyCard()
                }
            }
        }
        i++



    })
    html += getRow(rowContent)


    $('#events').append(html);
}


$(async function () {
    const month = $.urlParam("month");
    eventByMonth(month)
});


