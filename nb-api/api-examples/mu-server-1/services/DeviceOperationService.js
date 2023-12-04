/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Create a new device operation
*
* deviceId String The identifier of the device
* createOperation CreateOperation Operation
* returns CreatedOperationResult
* */
const createDeviceOperation = ({ deviceId, createOperation }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        deviceId,
        createOperation,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Delete a completed device operation
*
* deviceId String The identifier of the device
* operationId String The identifier of the operation
* no response value expected for this operation
* */
const deleteDeviceOperation = ({ deviceId, operationId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        deviceId,
        operationId,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Get the state of a device operation
*
* deviceId String The identifier of the device
* operationId String The identifier of the operation
* returns DeviceOperation
* */
const getDeviceOperation = ({ deviceId, operationId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        deviceId,
        operationId,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Get device operation error targets
*
* deviceId String The identifier of the device
* operationId String The identifier of the operation
* page Integer Page number (optional)
* size Integer Page size (maximum value is 30) (optional)
* returns getDeviceOperationErrorTargets_200_response
* */
const getDeviceOperationErrorTargets = ({ deviceId, operationId, page, size }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        deviceId,
        operationId,
        page,
        size,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Get device operation success targets
*
* deviceId String The identifier of the device
* operationId String The identifier of the operation
* page Integer Page number (optional)
* size Integer Page size (maximum value is 30) (optional)
* returns getDeviceOperationSuccessTargets_200_response
* */
const getDeviceOperationSuccessTargets = ({ deviceId, operationId, page, size }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        deviceId,
        operationId,
        page,
        size,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Get all the device operations
*
* deviceId String The identifier of the device
* page Integer Page number (optional)
* size Integer Page size (maximum value is 30) (optional)
* returns getDeviceOperations_200_response
* */
const getDeviceOperations = ({ deviceId, page, size }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        deviceId,
        page,
        size,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  createDeviceOperation,
  deleteDeviceOperation,
  getDeviceOperation,
  getDeviceOperationErrorTargets,
  getDeviceOperationSuccessTargets,
  getDeviceOperations,
};
