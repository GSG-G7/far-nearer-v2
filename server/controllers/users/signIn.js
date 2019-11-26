const { compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const {
  users: { getUsers },
} = require('../../models/queries');

const { signInSchema } = require('../../validation/');

module.exports = async (req, res, next) => {
  const { email, password } = req.body;
  const key = process.env.KEY;
  try {
    const newUser = await signInSchema.validate(
      { email, password },
      {
        abortEarly: false,
      },
    );
    const users = await getUsers();
    const isExist = users.find(async user => {
      const correctPassword = await compare(newUser.password, user.password);
      return newUser.email === user.email && correctPassword;
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
