const { getBuilding } = require('../../models/queries/');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  try {
    const building = await getBuilding(id);
    res.send({ data: building, statusCode: 200 });
  } catch (err) {
    next(err);
  }
};
