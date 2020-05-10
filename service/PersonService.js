'use strict';
const getPromiseForQuery = require('./Helper').getPromiseForQuery

let sqlDb;

exports.personDbSetup = function (connection) {
    sqlDb = connection;
    console.log("Checking if the person table exists...");
    return sqlDb.schema.hasTable("person").then((exists) => {
        if (!exists) {
            console.log("Creating person table...");
            //TODO create the person table if it doesn't exist
        } else {
            console.log("person table already into the database!")
        }
    })
}


/**
 * Returns the member of the association by his/her ID
 *
 * id Long Id of the person to be retrieved.
 * returns Person
 **/
exports.getUserByID = function (id) {
    let query = sqlDb("person").select().where({id: id});
    return getPromiseForQuery(query, id)
}


/**
 * Returns the events related to the specified member of the association
 *
 * id Long Id of the person.
 * returns List
 **/
exports.getUserEvents = function (id) {
    let subquery = sqlDb("person_to_event").select("event_id").where({person_id: id});
    let query = sqlDb("event").select().where('id', 'in', subquery);
    return getPromiseForQuery(query, id)
}


/**
 * Returns the services related to the specified member of the association
 *
 * id Long Id of the person.
 * returns List
 **/
exports.getUserServices = function (id) {
    let subquery = sqlDb("person_to_service").select("service_id").where({person_id: id});
    let query = sqlDb("service").select().where('id', 'in', subquery);
    return getPromiseForQuery(query, id)
}


/**
 * Returns all the member of the association
 *
 * returns List
 **/
exports.retrieveUsers = async () => {
    return await sqlDb("person").select("id", "name", "surname", "email", "telephone", "description", "leitmotiv",
        "skills", "image_url")
}

