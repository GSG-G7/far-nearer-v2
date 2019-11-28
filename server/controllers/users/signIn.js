const { compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { getUserByEmail } = require('../../models/queries');

const { signInSchema } = require('../../validation/');

module.exports = async (req, res, next) => {
  const key = process.env.KEY;
  try {
    const { email, password } = await signInSchema.validate(req.body, {
      abortEarly: false,
    });

    const user = await getUserByEmail(email);
    if (user) {
      const correctPassword = await compare(password, user.password);
      if (correctPassword) {
        const token = sign({ userId: user.id }, key);
        res.cookie('token', token, { maxAge: 8400000, httpOnly: true });
        res.send({ data: req.body, statusCode: 200 });
      } else {
        res.status(401).send({ statusCode: 401, error: 'Invalid Credintials' });
      }
    } else {
      res.status(401).send({ statusCode: 401, error: 'Invalid Credintials' });
    }
  } catch (error) {
    if (error.name === 'ValidationError')
      res.status(400).send({ statusCode: 400, error: error.errors });
    else next(error);
  }
};
