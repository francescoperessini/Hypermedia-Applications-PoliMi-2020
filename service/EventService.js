'use strict';
const getPromiseForQuery = require('./Helper').getPromiseForQuery

let sqlDb;

exports.eventDbSetup = function (connection) {
    sqlDb = connection;
    console.log("Checking if the event table exists...");
    return sqlDb.schema.hasTable("event").then((exists) => {
        if (!exists) {
            console.log("Creating event table...");
            return sqlDb.schema.createTable("event", table => {
                table.increments("id").primary();
                table.string("name", 100);
                //table.timestamp("event_date")
                table.string("practical_info", 1000);
                table.string("image_url", 500);
                table.string("presentation", 1000);
                table.string("skill_level", 100);
            });
        } else {
            console.log("event table already into the database!")
        }
    })
}


/**
 * Returns the event by its ID
 *
 * id Long Id of the event to be retrieved.
 * returns Event
 **/
exports.getEventById = function (id) {
    let query = sqlDb("event").select().where({id: id});
    return getPromiseForQuery(query, id)
}


/**
 * Returns the organizer of the specified event
 *
 * id Long Id of the event.
 * returns Person
 **/
exports.getEventOrganizer = function (id) {
    let subquery = sqlDb("person_to_event").select("person_id").where({event_id: id});
    let query = sqlDb("person").select().where('id', 'in', subquery);
    return getPromiseForQuery(query, id)
}


/**
 * Returns the service presented in the specified event
 *
 * id Long Id of the event.
 * returns Service
 **/
exports.getEventService = function (id) {
    let subquery = sqlDb("service_to_event").select("service_id").where({event_id: id});
    let query = sqlDb("service").select().where('id', 'in', subquery);
    return getPromiseForQuery(query, id)
}


/**
 * Returns all the events for the specified month
 *
 * month String Month for which events need to be retrieved.
 * returns List
 **/
exports.getEventsByMonth = function (month) {
    let m;
    switch (month) {
        case "jan":
            m = 0
            break;
        case "feb":
            m = 1
            break;
        case "mar":
            m = 2
            break;
        case "apr":
            m = 3
            break;
        case "may":
            m = 4
            break;
        case "jun":
            m = 5
            break;
        case "jul":
            m = 6
            break;
        case "aug":
            m = 7
            break;
        case "sep":
            m = 8
            break;
        case "oct":
            m = 9
            break;
        case "nov":
            m = 10
            break;
        case "dec":
            m = 11
            break;
    }
    const current_year = new Date().getFullYear();
    const days = new Date(current_year, m + 1, 0).getDate();
    const from = current_year + "-" + (m + 1) + "-1T00:00:00Z";
    const to = current_year + "-" + (m + 1) + "-" + days + "T23:59:59Z";

    return sqlDb("event").select().whereBetween('event_date', [from, to]);
}

