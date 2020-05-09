'use strict';


/**
 * Returns the service by its ID
 *
 * id Long Id of the service to be retrieved.
 * returns Service
 **/
exports.getServiceById = function (id) {
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
 * Returns the events related to the specified service
 *
 * id Long Id of the service.
 * returns List
 **/
exports.getServiceEvents = function (id) {
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
 * Returns the people related to the specified service
 *
 * id Long Id of the service.
 * returns List
 **/
exports.getServicePeople = function (id) {
    return new Promise(function (resolve, reject) {
        var examples = {};
        examples['application/json'] = [{
            "id": 1,
            "name": "Stefano",
            "surname": "Maini",
            "email": "stefano.maini@mail.com",
            "telephone": "0123456789",
            "description": "person description",
            "leitmotiv": "It Won’t Fail Because of Me",
            "skills": ["Python pro master", "Illustrator lover"],
            "image_url": "image_url"
        }, {
            "id": 1,
            "name": "Stefano",
            "surname": "Maini",
            "email": "stefano.maini@mail.com",
            "telephone": "0123456789",
            "description": "person description",
            "leitmotiv": "It Won’t Fail Because of Me",
            "skills": ["Python pro master", "Illustrator lover"],
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
 * Returns all the services offered by the association
 *
 * returns List
 **/
exports.retrieveServices = function () {
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

