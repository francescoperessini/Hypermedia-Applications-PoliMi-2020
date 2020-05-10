'use strict';
const ErrorMessage = require("./ErrorMessage");

let sqlDb;

exports.serviceDbSetup = function (connection) {
    sqlDb = connection;
    console.log("Checking if the service table exists...");
    return sqlDb.schema.hasTable("service").then((exists) => {
        if (!exists) {
            console.log("Creating service table...");
            //TODO create the Person table if it doesn't exist
        } else {
            console.log("Service table already into the database!")
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
    return getPromiseForQuery(query,id)
}



/**
 * Returns the events related to the specified service
 *
 * id Long Id of the service.
 * returns List
 **/
exports.getServiceEvents = function (id) {
    let subquery = sqlDb("service_to_event").select("event_id").where({service_id: id})
    let query = sqlDb("event").select().where('id','in',subquery);
    return getPromiseForQuery(query,id);
}


/**
 * Returns the people related to the specified service
 *
 * id Long Id of the service.
 * returns List
 **/
exports.getServicePeople = function (id) {
    let subquery = sqlDb("person_to_service").select("person_id").where({service_id: id})
    let query = sqlDb("person").select().where('id','in',subquery);
    return getPromiseForQuery(query,id);
}


/**
 * Returns all the services offered by the association
 *
 * returns List
 **/
exports.retrieveServices = function () {
    return sqlDb("service").select();

}

function getPromiseForQuery(query, id) {
    return new Promise(async function (resolve, reject) {
        if (Number.isInteger(id)){
            let result = await query;
            if (Object.keys(result).length > 0) {
                resolve(result[Object.keys(result)[0]]);
            } else {
                const code = 404
                const message = "No result for given id"
                reject(new ErrorMessage(code,message))
            }
        } else {
            const code = 400
            const message = "Bad request"
            reject(new ErrorMessage(code,message))
        }
    });
}

