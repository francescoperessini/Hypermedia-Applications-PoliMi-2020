$.urlParam = function (name) {
    const results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || "jan";
};


monthDict = {
    jan: "January",
    feb: "February",
    mar: "March",
    apr: "April",
    may: "May",
    jun: "June",
    jul: "July",
    aug: "August",
    sep: "September",
    oct: "October",
    nov: "November",
    dec: "December"
}

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


    return " <div class=\"col-md-6 col-lg-4 col-xl-3 py-2\"><div class=\" card h-100\">\n" +
        "                <img class=\"events-card-img-top card-img-top\" src=" + image_url + ">\n" +
        "                <div class=\"card-body\">\n" +
        "                    <h5 class=\"card-title\">" + name + "</h5>\n" +
        "                        <div class=\"p-1 text-left\">\n" +
        "                            \n" +
        "                        </div>\n" +
        "                        <div class=\"p-1 text-left\">\n" +
        "                            <i class='fas fa-calendar-alt'></i>  " + event_date + "\n" +
        "                        </div>\n" +
        "                    <p class=\"card-text mt-3\">" + truncate(practical_info, 100) + "</p>" +
        "                   <a class='btn btn-secondary' href='/pages/event.html?id=" + id + "'>Learn More</a>" +
        "                </div>\n" +
        "            </div></div>"

}

function truncate(string, end) {
    if (string.length > end) {
        return string.substring(0, end) + '...';
    }
    return string
}

getEmptyCard = function () {
    return "<div class=\"card \">\n" +
        "            </div>"

}
getRow = function (rowContent) {

    return '<div class="container"><div class="row my-4">\n' +
        rowContent +
        '</div></div>'


}

async function getEventsByMonth(month) {
    let events;
    try {
        let response = await fetch('/v1/events/by_month/' + month);
        if (response.ok) {
            events = await response.json();
            let html = "";
            let rowContent = "";
            events.forEach((event) => {
                rowContent += getCard(event)
            })
            html += getRow(rowContent)


            $('#events').append(html);
        } else {
            window.location.replace("../index.html");
        }
    } catch (e) {
        //Network error
        console.log(e);
    }
}

async function loadMonth(month) {
    $('#month').append(monthDict[month]);

}

function redirect(currentMonth, increment) {
    let keys = Object.keys(monthDict);
    let monthNumber = keys.indexOf(currentMonth)
    monthNumber = monthNumber + (increment * 1);
    monthNumber = monthNumber < 0 ? 11 : monthNumber;
    monthNumber = monthNumber % 12
    console.log(monthNumber)
    window.location.href = ('events_by_month.html?month=' + keys[monthNumber])


}

$(async function () {
    const month = $.urlParam("month");
    await getEventsByMonth(month)
    await loadMonth(month);
    await eventByMonth(month);
    $(document).ready(function () {
        $("#next").click(function () {
            redirect(month, +1)
        });
        $("#prev").click(function () {
            redirect(month, -1)
        });
    });
});

