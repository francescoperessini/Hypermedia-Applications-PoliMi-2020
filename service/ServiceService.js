'use strict';


/**
 * Get service by id
 * 
 *
 * id String The id that needs to be fetched.
 * returns Service
 **/
exports.getServiceById = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "presentation" : "presentation",
  "name" : "name",
  "image_urls" : [ "../assets/img/sample/49547732753_0be8847913_o.jpg", "image_urls" ],
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
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get all the services
 * This can be done by everyone
 *
 * no response value expected for this operation
 **/
exports.retrievesServices = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

