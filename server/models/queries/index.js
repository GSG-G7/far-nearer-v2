const { get: getEmptyBuildings } = require('./emptyBuildings');
const { postUsers, getUserByEmail } = require('./users');
const mailList = require('./mailList');

module.exports = {
  getEmptyBuildings,
  postUsers,
  getUserByEmail,
  mailList,
};
