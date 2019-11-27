const { sign } = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { postUsers, getUserByEmail } = require('../../models/queries/users');
const { signUpSchema } = require('../../validation/userSchema');

module.exports = async (req, res, next) => {
  const key = process.env.KEY;

  try {
    const { email: newEmail } = req.body;
    const userExist = await getUserByEmail(newEmail);
    if (userExist) {
      res.send({
        statusCode: 200,
        message: 'Email already exists',
        data: { newEmail },
      });
    } else {
      const userInfo = await signUpSchema.validate(req.body, {
        abortEarly: false,
      });
      const { email, password: userPassword, username } = userInfo;
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(userPassword, salt);
      const addUser = await postUsers({ email, hashPassword, username });
      const [{ id }] = addUser;
      const token = sign({ userId: id }, key);
      res.cookie('token', token, { maxAge: 8400000, httpOnly: true });
      res.status(201).send({
        statusCode: 201,
        message: 'user was sign up successfully',
        data: { username, email },
      });
    }
  } catch (error) {
    if (error.name === 'ValidationError')
      res.status(400).send({ statusCode: 400, error: error.errors });
    else next(error);
  }
};
