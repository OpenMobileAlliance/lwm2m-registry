/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Create a new device observation
*
* deviceId String The identifier of the device
* createObservation CreateObservation Observation
* returns CreatedObservationResult
* */
const createDeviceObservation = ({ deviceId, createObservation }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        deviceId,
        createObservation,
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
* Delete a device observation
*
* deviceId String The identifier of the device
* observationId String The identifier of the observation
* no response value expected for this operation
* */
const deleteDeviceObservation = ({ deviceId, observationId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        deviceId,
        observationId,
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
* Get the state of a device observation
*
* deviceId String The identifier of the device
* observationId String The identifier of the observation
* returns Observation
* */
const getDeviceObservation = ({ deviceId, observationId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        deviceId,
        observationId,
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
* Get the notification of a device observation
*
* deviceId String The identifier of the device
* observationId String The identifier of the observation
* notificationId String The identifier of the notification
* returns ObservationDataNotification
* */
const getDeviceObservationNotification = ({ deviceId, observationId, notificationId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        deviceId,
        observationId,
        notificationId,
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
* Get the device observation's notifications
*
* deviceId String The identifier of the device
* observationId String The identifier of the observation
* page Integer Page number (optional)
* size Integer Page size (maximum value is 30) (optional)
* returns getDeviceObservationNotifications_200_response
* */
const getDeviceObservationNotifications = ({ deviceId, observationId, page, size }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        deviceId,
        observationId,
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
* Get all the device observations
*
* deviceId String The identifier of the device
* page Integer Page number (optional)
* size Integer Page size (maximum value is 30) (optional)
* returns getDeviceObservations_200_response
* */
const getDeviceObservations = ({ deviceId, page, size }) => new Promise(
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
  createDeviceObservation,
  deleteDeviceObservation,
  getDeviceObservation,
  getDeviceObservationNotification,
  getDeviceObservationNotifications,
  getDeviceObservations,
};
