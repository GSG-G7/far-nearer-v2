const { get: getEmptyBuildings, getBuilding } = require('./emptyBuildings');
const mailList = require('./mailList');
const users = require('./users');

module.exports = {
  getEmptyBuildings,
  getBuilding,
  mailList,
  users,
};
