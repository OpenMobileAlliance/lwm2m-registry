/**
 * The DeviceOperationController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/DeviceOperationService');
const createDeviceOperation = async (request, response) => {
  await Controller.handleRequest(request, response, service.createDeviceOperation);
};

const deleteDeviceOperation = async (request, response) => {
  await Controller.handleRequest(request, response, service.deleteDeviceOperation);
};

const getDeviceOperation = async (request, response) => {
  await Controller.handleRequest(request, response, service.getDeviceOperation);
};

const getDeviceOperationErrorTargets = async (request, response) => {
  await Controller.handleRequest(request, response, service.getDeviceOperationErrorTargets);
};

const getDeviceOperationSuccessTargets = async (request, response) => {
  await Controller.handleRequest(request, response, service.getDeviceOperationSuccessTargets);
};

const getDeviceOperations = async (request, response) => {
  await Controller.handleRequest(request, response, service.getDeviceOperations);
};


module.exports = {
  createDeviceOperation,
  deleteDeviceOperation,
  getDeviceOperation,
  getDeviceOperationErrorTargets,
  getDeviceOperationSuccessTargets,
  getDeviceOperations,
};
