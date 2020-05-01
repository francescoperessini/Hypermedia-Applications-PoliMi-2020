'use strict';

var utils = require('../utils/writer.js');
var Person = require('../service/PersonService');

module.exports.getUserByID = function getUserByID (req, res, next) {
  var id = req.swagger.params['id'].value;
  Person.getUserByID(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.retrieveUsers = function retrieveUsers (req, res, next) {
  Person.retrieveUsers()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
