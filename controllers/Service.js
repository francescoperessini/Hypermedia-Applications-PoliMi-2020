'use strict';

var utils = require('../utils/writer.js');
var Service = require('../service/ServiceService');

module.exports.getServiceById = function getServiceById(req, res, next) {
    var id = req.swagger.params['id'].value;
    Service.getServiceById(id)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.getServiceEvents = function getServiceEvents(req, res, next) {
    var id = req.swagger.params['id'].value;
    Service.getServiceEvents(id)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.getServicePeople = function getServicePeople(req, res, next) {
    var id = req.swagger.params['id'].value;
    Service.getServicePeople(id)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.retrieveServices = function retrieveServices(req, res, next) {
    Service.retrieveServices()
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};
