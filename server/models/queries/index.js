const { get: getEmptyBuildings } = require('./emptyBuildings');
const { postUsers } = require('./users');
const mailList = require('./mailList');
const users = require('./users');

module.exports = {
  getEmptyBuildings,
  postUsers,
  mailList,
  users,
};
