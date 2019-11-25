const { reportBuilding, get } = require('../../models/queries/emptyBuildings');
const { buildingSchema } = require('../../validation');
const upload = require('../../utils/upload.js');

const postEmptyBuilding = async (req, res, next) => {
  const { data } = req.body;
  try {
    const newBuild = await buildingSchema.validate(data, {
      abortEarly: false,
    });

    const getData = await get();
    const isExist = getData.find(building => {
      return (
        building.longitude === newBuild.longitude &&
        building.latitude === newBuild.latitude
      );
    });

    if (isExist) {
      res
        .status(409)
        .send({ statusCode: 409, message: 'Building already exist' });
    } else {
      if (req.files && req.files.thumbnail) {
        const { thumbnail } = req.files;
        const { public_id: publicId, format } = await upload(thumbnail.path);
        newBuild.thumbnail = `${publicId}.${format}`;
      }

      await reportBuilding(newBuild);
      res.status(201).send({
        statusCode: 201,
        message: 'Building was added successfully',
        data: newBuild,
      });
    }
  } catch (error) {
    if (error.name === 'ValidationError')
      res.status(400).send({ statusCode: 400, error: error.errors });
    else next(error);
  }
};

module.exports = postEmptyBuilding;
