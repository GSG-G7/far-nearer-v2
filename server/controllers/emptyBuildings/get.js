const { getEmptyBuildings } = require('../../models/queries/');

module.exports = async (req, res, next) => {
  try {
    const buildings = await getEmptyBuildings();
    res.send({ data: buildings, statusCode: 200 });
  } catch (err) {
    next(err);
  }
};
