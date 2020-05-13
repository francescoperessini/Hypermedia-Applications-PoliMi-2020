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
                table.increments("id").primary("pk_person_id");
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

exports.personToServiceDbSetup = function (connection) {
    sqlDb = connection;
    console.log("Checking if the person_to_service table exists...");
    return sqlDb.schema.hasTable("person_to_service").then((exists) => {
        if (!exists) {
            console.log("Creating person_to_service table...");
            return sqlDb.schema.createTable("person_to_service", table => {
                table.integer("person_id");
                table.integer("service_id");
                table.primary(["person_id", "service_id"], "pk_person_to_service");
                table.foreign("person_id", "person_fk").references("id").inTable("person");
                table.foreign("service_id", "service_fk").references("id").inTable("service");
            });
        } else {
            console.log("person_to_service table already into the database!")
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


exports.personToEventDbSetup = function (connection) {
    sqlDb = connection;
    console.log("Checking if the person_to_event table exists...");
    return sqlDb.schema.hasTable("person_to_event").then((exists) => {
        if (!exists) {
            console.log("Creating person_to_event table...");
            return sqlDb.schema.createTable("person_to_event", table => {
                table.integer("event_id").primary("person_to_event_pk");
                table.integer("person_id");
                table.foreign("event_id", "event_fk").references("id").inTable("event");
                table.foreign("person_id", "person_fk").references("id").inTable("person");
            });
        } else {
            console.log("person_to_event table already into the database!")
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

