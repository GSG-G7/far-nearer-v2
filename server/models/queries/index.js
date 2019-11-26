const { get: getEmptyBuildings } = require('./emptyBuildings');
const { postUsers } = require('./users');
const mailList = require('./mailList');

module.exports = {
  getEmptyBuildings,
  postUsers,
  mailList,
};
