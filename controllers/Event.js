'use strict';

var utils = require('../utils/writer.js');
var Event = require('../service/EventService');

module.exports.getEventById = function getEventById (req, res, next) {
  var id = req.swagger.params['id'].value;
  Event.getEventById(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getEventsByMonth = function getEventsByMonth (req, res, next) {
  var month = req.swagger.params['month'].value;
  Event.getEventsByMonth(month)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
