'use strict';
const getPromiseForQuery = require('./Helper').getPromiseForQuery

let sqlDb;

exports.serviceDbSetup = function (connection) {
    sqlDb = connection;
    console.log("Checking if the service table exists...");
    return sqlDb.schema.hasTable("service").then((exists) => {
        if (!exists) {
            console.log("Creating service table...");
            return sqlDb.schema.createTable("service", table => {
                table.increments("id").primary("pk_service_id");
                table.string("name", 200);
                table.string("presentation", 1000);
                table.specificType("image_urls", "character varying[]");
                table.string("practical_info", 1000);
            });
        } else {
            console.log("service table already into the database!")
        }
    })
}


exports.serviceToEventDbSetup = function (connection) {
    sqlDb = connection;
    console.log("Checking if the service_to_event table exists...");
    return sqlDb.schema.hasTable("service_to_event").then((exists) => {
        if (!exists) {
            console.log("Creating service_to_event table...");
            return sqlDb.schema.createTable("service_to_event", table => {
                table.integer("event_id").primary("service_to_event_pk");
                table.integer("service_id");
                table.foreign("event_id", "event_fk").references("id").inTable("event");
                table.foreign("service_id", "service_fk").references("id").inTable("service");
            });
        } else {
            console.log("service_to_event table already into the database!")
        }
    })
}


/**
 * Returns the service by its ID
 *
 * id Long Id of the service to be retrieved.
 * returns Service
 **/
exports.getServiceById = function (id) {
    let query = sqlDb("service").select().where({id: id});
    return getPromiseForQuery(query, id, "Service not found.", false)
}


/**
 * Returns the events related to the specified service
 *
 * id Long Id of the service.
 * returns List
 **/
exports.getServiceEvents = async function (id) {
    let subquery = sqlDb("service_to_event").select("event_id").where({service_id: id});
    let query = sqlDb("event").select().where('id', 'in', subquery);
    return getPromiseForQuery(query, id, "Service not found.")
}


/**
 * Returns the people related to the specified service
 *
 * id Long Id of the service.
 * returns List
 **/
exports.getServicePeople = function (id) {
    let subquery = sqlDb("person_to_service").select("person_id").where({service_id: id});
    let query = sqlDb("person").select().where('id', 'in', subquery);
    return getPromiseForQuery(query, id, "Service not found.")
}


/**
 * Returns all the services offered by the association
 *
 * returns List
 **/
exports.retrieveServices = function () {
    return sqlDb("service").select()
}

