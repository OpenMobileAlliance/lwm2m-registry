/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Get device information
*
* deviceId String Identifier of the device
* returns Device
* */
const getDevice = ({ deviceId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        deviceId,
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
  getDevice,
};
