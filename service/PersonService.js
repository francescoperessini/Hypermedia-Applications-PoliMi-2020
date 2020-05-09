'use strict';

let sqlDb;

exports.personDbSetup = function (connection) {
    sqlDb = connection;
    console.log("Checking if the person table exists...");
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
 * Returns the member of the association by his/her ID
 *
 * id Long Id of the person to be retrieved.
 * returns Person
 **/
exports.getUserByID = async (id) => {
    const user = await sqlDb("person").select("id", "name", "surname", "email", "telephone", "description", "leitmotiv",
        "skills", "image_url").where("id", "=", id);
    //TODO error handling

}


/**
 * Returns the events related to the specified member of the association
 *
 * id Long Id of the person.
 * returns List
 **/
exports.getUserEvents = function (id) {
    return new Promise(function (resolve, reject) {
        var examples = {};
        examples['application/json'] = [{
            "id": 1,
            "name": "event name",
            "date_time": "2017-07-21T17:32:28Z",
            "presentation": "event presentation",
            "practical_info": "event practical_info",
            "skill_level": "skill level required",
            "image_url": "image_url"
        }, {
            "id": 1,
            "name": "event name",
            "date_time": "2017-07-21T17:32:28Z",
            "presentation": "event presentation",
            "practical_info": "event practical_info",
            "skill_level": "skill level required",
            "image_url": "image_url"
        }];
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}


/**
 * Returns the services related to the specified member of the association
 *
 * id Long Id of the person.
 * returns List
 **/
exports.getUserServices = function (id) {
    return new Promise(function (resolve, reject) {
        var examples = {};
        examples['application/json'] = [{
            "id": 1,
            "name": "service name",
            "presentation": "service presentation",
            "practical_info": "service practical_info",
            "images_url": ["image_url_1", "image_url_2", "image_url_3"]
        }, {
            "id": 1,
            "name": "service name",
            "presentation": "service presentation",
            "practical_info": "service practical_info",
            "images_url": ["image_url_1", "image_url_2", "image_url_3"]
        }];
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
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

