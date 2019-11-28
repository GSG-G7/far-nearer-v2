const { get: getEmptyBuildings, getBuilding } = require('./emptyBuildings');
const { postUsers, getUserByEmail } = require('./users');
const mailList = require('./mailList');

module.exports = {
  getEmptyBuildings,
  getBuilding,
  postUsers,
  getUserByEmail,
  mailList,
};
