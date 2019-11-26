const { compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const {
  users: { getUsers },
} = require('../../models/queries');

const { signInSchema } = require('../../validation/');

module.exports = async (req, res, next) => {
  const key = process.env.KEY;
  try {
    const { email, password } = await signInSchema.validate(req.body, {
      abortEarly: false,
    });
    const users = await getUsers();
    const isExist = users.find(async user => {
      if (email === user.email) {
        const correctPassword = await compare(password, user.password);
        return correctPassword;
      }
      return false;
    });
    if (isExist) {
      const token = sign({ userInfo: { email, password } }, key);
      res.cookie('token', token, { maxAge: 8400000, httpOnly: true });
      res.json({ data: users, statusCode: 200 });
    } else {
      res.send({
        statusCode: 400,
        error: 'Invalid Credintials',
      });
    }
  } catch (error) {
    if (error.name === 'ValidationError')
      res.status(400).send({ statusCode: 400, error: error.errors });
    else next(error);
  }
};
