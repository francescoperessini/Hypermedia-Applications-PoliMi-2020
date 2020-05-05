'use strict';


/**
 * Get events by id
 *
 *
 * id String The id that needs to be fetched.
 * returns Event
 **/
exports.getEventById = function (id) {
    return new Promise(function (resolve, reject) {
        var examples = {};
        examples['application/json'] = {
            "presentation": "presentation",
            "image_url": "image_url",
            "event_date": "2000-01-23T04:56:07.000+00:00",
            "name": "name",
            "practical_info": "practical_info",
            "id": 5
        };
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}


/**
 * Get events by month
 *
 *
 * month String The month that needs to be fetched.
 * returns Event
 **/
exports.getEventsByMonth = function (month) {
    return new Promise(function (resolve, reject) {
        var examples = {};
        examples['application/json'] = [{
            "presentation": "presentation",
            "image_url": "../assets/img/sample/49547733258_2d17a4ed9f_o.jpg",
            "event_date": "2000-01-23T04:56:07.000+00:00",
            "name": "name",
            "practical_info": "practical_info",
            "id": 5
        }, {
            "presentation": "presentation",
            "image_url": "../assets/img/sample/49547733258_2d17a4ed9f_o.jpg",
            "event_date": "2000-01-23T04:56:07.000+00:00",
            "name": "name",
            "practical_info": "practical_info",
            "id": 5
        }, {
            "presentation": "presentation",
            "image_url": "../assets/img/sample/49547733258_2d17a4ed9f_o.jpg",
            "event_date": "2000-01-23T04:56:07.000+00:00",
            "name": "name",
            "practical_info": "practical_info",
            "id": 5
        }, {
            "presentation": "presentation",
            "image_url": "../assets/img/sample/49547733258_2d17a4ed9f_o.jpg",
            "event_date": "2000-01-23T04:56:07.000+00:00",
            "name": "name",
            "practical_info": "practical_info",
            "id": 5
        }, {
            "presentation": "presentation",
            "image_url": "../assets/img/sample/49547733258_2d17a4ed9f_o.jpg",
            "event_date": "2000-01-23T04:56:07.000+00:00",
            "name": "name",
            "practical_info": "practical_info",
            "id": 5
        }, ];
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}

