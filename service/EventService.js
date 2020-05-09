'use strict';


/**
 * Returns the event by its ID
 *
 * id Long Id of the event to be retrieved.
 * returns Event
 **/
exports.getEventById = function (id) {
    return new Promise(function (resolve, reject) {
        var examples = {};
        examples['application/json'] = {
            "id": 1,
            "name": "event name",
            "date_time": "2017-07-21T17:32:28Z",
            "presentation": "event presentation",
            "practical_info": "event practical_info",
            "skill_level": "skill level required",
            "image_url": "image_url"
        };
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}


/**
 * Returns the organizer of the specified event
 *
 * id Long Id of the event.
 * returns Person
 **/
exports.getEventOrganizer = function (id) {
    return new Promise(function (resolve, reject) {
        var examples = {};
        examples['application/json'] = {
            "id": 1,
            "name": "Stefano",
            "surname": "Maini",
            "email": "stefano.maini@mail.com",
            "telephone": "0123456789",
            "description": "person description",
            "leitmotiv": "It Won’t Fail Because of Me",
            "skills": ["Python pro master", "Illustrator lover"],
            "image_url": "image_url"
        };
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}


/**
 * Returns the service presented in the specified event
 *
 * id Long Id of the event.
 * returns Service
 **/
exports.getEventService = function (id) {
    return new Promise(function (resolve, reject) {
        var examples = {};
        examples['application/json'] = {
            "id": 1,
            "name": "service name",
            "presentation": "service presentation",
            "practical_info": "service practical_info",
            "images_url": ["image_url_1", "image_url_2", "image_url_3"]
        };
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}


/**
 * Returns all the events for the specified month
 *
 * month String Month for which events need to be retrieved.
 * returns List
 **/
exports.getEventsByMonth = function (month) {
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

