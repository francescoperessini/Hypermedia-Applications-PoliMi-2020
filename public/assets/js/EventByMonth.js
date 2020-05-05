//retrieve the parameter "name" in the URL
$.urlParam = function (name) {
    const results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || "jan";
};

//fill the template of a single book
function fillBook(book) {
    const img = "../assets/images/books/" + book.book.imgpath;
    const title = book.book.title;
    const book_link = "/pages/book.html?id=" + book.book_id;

    return `<div class="card author-book-card">
                        <a class="outgoing" href="` + book_link + `"><img class="card-img-top" src="` + img + `" alt="Card image cap"></a>
                        <div class="card-body">
                            <h5 class="card-title">` + title + `</h5>
                        </div>
                        <div class="card-footer">
                            <div class="row">
                                <div class="col padding-10px">
                                    <a href="` + book_link + `" class="btn btn-big btn-outline-primary btn-sm outgoing">
                                        <i class="fa fa-book"></i>
                                        <div>View Book</div></a>
                                </div>
                                <div class="col padding-10px cart-btn-col">
                                    <a id="` + book.book_id + `" href="#" class="btn btn-big btn-outline-primary btn-sm cart">
                                        <i class="fa fa-shopping-cart"></i> <div>Add to cart</div></a>
                                </div>
                            </div>
                        </div>
                    </div>`;
}

//retrieve the author of the book and fill the template
async function appendAuthor(author_id) {
    let author;
    try {
        author = await (await fetch('/v2/authors/' + author_id)).json();
    } catch (error) {
        location.replace("/404.html");
    }

    $("#author-picture").attr("src", "../assets/images/authors/" + author.imgpath);
    $("#author-name").text(author.name + " " + author.surname);
    $("title").text(author.name + " " + author.surname);
    $("#biography").text(author.biography);
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

        if(i === num_events-1){
            let emptySpace = 3 - (i % 4)
            console.log(emptySpace)
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


//retrieve the author id from URL and fill the page
$(async function () {
    const month = $.urlParam("month");
    eventByMonth(month)
});


