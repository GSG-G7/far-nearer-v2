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

    const users = await getUsers(email);
    const isExist = users.find(async user => {
      const correctPassword = await compare(password, user.password);
      return correctPassword;
    });
    if (isExist) {
      const token = sign({ userInfo: isExist.id }, key);
      res.cookie('token', token, { maxAge: 8400000, httpOnly: true });
      res.json({ statusCode: 200 });
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
