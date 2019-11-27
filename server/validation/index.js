const validateEmail = require('./validateEmail');
const buildingSchema = require('./buildingSchema');
const { signInSchema } = require('./userSchema');

module.exports = { validateEmail, buildingSchema, signInSchema };
