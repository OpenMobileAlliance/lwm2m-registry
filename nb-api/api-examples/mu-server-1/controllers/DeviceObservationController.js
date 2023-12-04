/**
 * The DeviceObservationController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/DeviceObservationService');
const createDeviceObservation = async (request, response) => {
  await Controller.handleRequest(request, response, service.createDeviceObservation);
};

const deleteDeviceObservation = async (request, response) => {
  await Controller.handleRequest(request, response, service.deleteDeviceObservation);
};

const getDeviceObservation = async (request, response) => {
  await Controller.handleRequest(request, response, service.getDeviceObservation);
};

const getDeviceObservationNotification = async (request, response) => {
  await Controller.handleRequest(request, response, service.getDeviceObservationNotification);
};

const getDeviceObservationNotifications = async (request, response) => {
  await Controller.handleRequest(request, response, service.getDeviceObservationNotifications);
};

const getDeviceObservations = async (request, response) => {
  await Controller.handleRequest(request, response, service.getDeviceObservations);
};


module.exports = {
  createDeviceObservation,
  deleteDeviceObservation,
  getDeviceObservation,
  getDeviceObservationNotification,
  getDeviceObservationNotifications,
  getDeviceObservations,
};
