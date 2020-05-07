'use strict';

let sqlDb;

exports.personDbSetup = function (connection) {
    sqlDb = connection;
    console.log("Checking if the person table exists");
    return sqlDb.schema.hasTable("person").then((exists) => {
        if (!exists) {
            console.log("Creating person table...");
            //TODO create the Person table if it doesn't exist
        } else {
            console.log("person table already into the database!")
        }
    })
}

/**
 * Get user by id
 *
 *
 * id String The id that needs to be fetched.
 * returns Person
 **/
exports.getUserByID = function (id) {
    return sqlDb("person").select().where("id", "=", id)
    //TODO gestisci errore
}


/**
 * Get all the users
 * This can be done by everyone
 *
 * no response value expected for this operation
 **/
exports.retrieveUsers = function () {
    return sqlDb("person").select()
}