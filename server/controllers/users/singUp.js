const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { postUsers } = require('../../models/queries/users');
const { signUpSchema } = require('../../validation/userSchema');

module.exports = async (req, res, next) => {
  const SecretKey = process.env.SECRET_KEY;

  try {
    const userInfo = await signUpSchema.validate(req.body, {
      abortEarly: false,
    });
    const { email, password: userPassword, username } = userInfo;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(userPassword, salt);
    const addUser = await postUsers({ email, hashPassword, username });

    const [
      {
        fields: { password },
      },
    ] = addUser;
    const token = jwt.sign({ password }, SecretKey);
    res.cookie('access', token);
    res.status(201).send({
      statusCode: 201,
      message: 'user was sign up successfully',
      data: { username, email },
    });
  } catch (error) {
    if (error.name === 'ValidationError')
      res.status(400).send({ statusCode: 400, error: error.errors });
    else next(error);
  }
};
