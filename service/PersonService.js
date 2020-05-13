'use strict';
const getPromiseForQuery = require('./Helper').getPromiseForQuery

let sqlDb;

exports.personDbSetup = function (connection) {
    sqlDb = connection;
    console.log("Checking if the person table exists...");
    return sqlDb.schema.hasTable("person").then((exists) => {
        if (!exists) {
            console.log("Creating person table...");
            return sqlDb.schema.createTable("person", table => {
                table.increments("id").primary();
                table.string("name", 100);
                table.string("surname", 100);
                table.string("description", 1000);
                table.string("image_url", 500);
                table.specificType("skills", "varchar(50) []");
                table.string("email", 50);
                table.string("telephone", 20);
                table.string("leitmotiv", 200);
            });
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
exports.getUserEvents = async function (id) {
    let subquery = sqlDb("person_to_event").select("event_id").where({person_id: id});
    let query = await sqlDb("event").select().where('id', 'in', subquery);
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

