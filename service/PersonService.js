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
  "surname" : "Tribbiani",
  "image_url" : "../assets/img/person.jpg",
  "name" : "Joey",
  "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel lectus et diam congue porta. Sed semper neque libero, eu suscipit odio aliquet ut. Integer velit metus, congue quis consequat in, molestie ac tortor. Nunc dignissim, libero id pretium aliquam, neque velit maximus mi, nec volutpat quam eros eu ligula. Ut ex magna, feugiat nec faucibus non, accumsan sit amet metus. Fusce congue neque et ligula gravida, at tristique risus accumsan. Nulla facilisis et tellus eget pulvinar. Nullam ligula nisi, lobortis at vestibulum quis, posuere eget turpis. Vivamus nec risus ex. Proin in tempus purus. Cras quam metus, rhoncus at mollis sed, imperdiet tincidunt risus. Pellentesque aliquam felis justo, eget euismod tellus bibendum non. Nam consequat vestibulum sem, sed gravida ligula aliquet nec. Morbi egestas lobortis sapien ac eleifend. Maecenas tincidunt ac mi sed viverra. Nulla ultrices pulvinar est, id fringilla diam egestas nec.",
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
    var examples = {};
    examples['application/json'] = [{
      "surname" : "Surname 1",
      "image_url" : "image_url",
      "name" : "Name 1",
      "description" : "Bellaaaa",
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
    }, {
      "surname" : "Surname 2",
      "image_url" : "image_url",
      "name" : "Name 2",
      "description" : "Bellaaaa",
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
    }, {
      "surname" : "Surname 3",
      "image_url" : "image_url",
      "name" : "Name 3",
      "description" : "Bellaaaa",
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
    }];

    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
    resolve(examples);
  });
}

