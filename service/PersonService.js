'use strict';


/**
 * Get user by id
 * 
 *
 * id String The id that needs to be fetched.
 * returns Person
 **/
exports.getUserByID = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "surname" : 1,
  "image_url" : "image_url",
  "name" : 6,
  "description" : "description",
  "id" : 0,
  "services" : [ {
    "presentation" : "presentation",
    "name" : "name",
    "image_urls" : [ "image_urls", "image_urls" ],
    "practical_info" : "practical_info",
    "id" : 5,
    "events" : [ {
      "presentation" : "presentation",
      "image_url" : "image_url",
      "event_date" : "2000-01-23T04:56:07.000+00:00",
      "name" : "name",
      "practical_info" : "practical_info",
      "id" : 5
    }, {
      "presentation" : "presentation",
      "image_url" : "image_url",
      "event_date" : "2000-01-23T04:56:07.000+00:00",
      "name" : "name",
      "practical_info" : "practical_info",
      "id" : 5
    } ]
  }, {
    "presentation" : "presentation",
    "name" : "name",
    "image_urls" : [ "image_urls", "image_urls" ],
    "practical_info" : "practical_info",
    "id" : 5,
    "events" : [ {
      "presentation" : "presentation",
      "image_url" : "image_url",
      "event_date" : "2000-01-23T04:56:07.000+00:00",
      "name" : "name",
      "practical_info" : "practical_info",
      "id" : 5
    }, {
      "presentation" : "presentation",
      "image_url" : "image_url",
      "event_date" : "2000-01-23T04:56:07.000+00:00",
      "name" : "name",
      "practical_info" : "practical_info",
      "id" : 5
    } ]
  } ],
  "events" : [ {
    "presentation" : "presentation",
    "image_url" : "image_url",
    "event_date" : "2000-01-23T04:56:07.000+00:00",
    "name" : "name",
    "practical_info" : "practical_info",
    "id" : 5
  }, {
    "presentation" : "presentation",
    "image_url" : "image_url",
    "event_date" : "2000-01-23T04:56:07.000+00:00",
    "name" : "name",
    "practical_info" : "practical_info",
    "id" : 5
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get all the users
 * This can be done by everyone
 *
 * no response value expected for this operation
 **/
exports.retrieveUsers = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

