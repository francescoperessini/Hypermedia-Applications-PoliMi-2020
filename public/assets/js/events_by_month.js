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

getCard = function (event, month) {

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
        "                <img class=\"\" src=" + image_url + " alt=\""+name+"\">\n" +
        "                <div class=\"card-body\">\n" +
        "                    <h5 class=\"card-title\">" + name + "</h5>\n" +
        "                        <div class=\"p-1 text-left\">\n" +
        "                            \n" +
        "                        </div>\n" +
        "                        <div class=\"p-1 text-left\">\n" +
        "                            <svg class=\"bi bi-calendar\" width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
        "                        <path fill-rule=\"evenodd\" d=\"M14 0H2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z\" clip-rule=\"evenodd\"/>\n" +
        "                        <path fill-rule=\"evenodd\" d=\"M6.5 7a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm-9 3a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm-9 3a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2z\" clip-rule=\"evenodd\"/>\n" +
        "                    </svg>  " + event_date + "\n" +
        "                        </div>\n" +
        "                    <p class=\"card-text mt-3\">" + truncate(practical_info, 100) + "</p>" +
        "                   <a class='btn btn-secondary' href='/pages/event.html?id=" + id + "&month=" + month + "'>Learn More</a>" +
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

async function loadEventsByMonth(month) {
    let events;
    try {
        let response = await fetch('/v1/events/by_month/' + month);
        if (response.ok) {
            events = await response.json();
            let html = "";
            let rowContent = "";
            events.forEach((event) => {
                rowContent += getCard(event,month)
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
    let monthNumber = getAdjacentMonth(currentMonth, increment)
    console.log(monthNumber)
    window.location.href = ('events_by_month.html?month=' + keys[monthNumber])


}

function getAdjacentMonth(currentMonth, increment = +1) {
    let keys = Object.keys(monthDict);
    let monthNumber = keys.indexOf(currentMonth)
    monthNumber = monthNumber + (increment);
    monthNumber = monthNumber < 0 ? 11 : monthNumber;
    return monthNumber % 12
}

function getPreviousMonth(currentMonth) {
    return getAdjacentMonth(currentMonth, -1);
}

function getNextMonth(currentMonth) {
    return getAdjacentMonth(currentMonth, +1);
}

$(async function () {
    const month = $.urlParam("month");
    await loadEventsByMonth(month)
    await loadMonth(month);
    $("#next").prepend(monthDict[Object.keys(monthDict)[getNextMonth(month)]]);
    $("#prev").append(monthDict[Object.keys(monthDict)[getPreviousMonth(month)]])

    $("#nav_info_events_by_month").attr("href", "events_by_month.html?month="+month)
    $("#nav_info_events_by_month").append("/ "+ monthDict[month] )


    $(document).ready(function () {
        $("#next").click(function () {
            redirect(month, +1)
        });
        $("#prev").click(function () {
            redirect(month, -1)
        });
    });
});

