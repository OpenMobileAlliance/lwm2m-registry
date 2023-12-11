/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Get device information
*
* deviceId String Identifier of the device
* returns Device
* */

const devices = {
  device1: {
    endpointName: '123',
    binding: 'U',
    lwM2MVersion: '1.0',
    registration: new Date().toISOString(),
    lifetime: 300,
    objects: [{ objectId: 1, objectInstanceId: 0, objectVersion: '1.0' }],
  },
};

const getDevice = ({ deviceId }) => new Promise(
  async (resolve, reject) => {
    try {
      if (!devices[deviceId]) {
        throw { message: 'Device not found', status: 404 };
      }
      resolve(Service.successResponse(devices[deviceId]));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  getDevice,
};
