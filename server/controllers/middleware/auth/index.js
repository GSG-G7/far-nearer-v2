const { verify } = require('jsonwebtoken');

const key = process.env.KEY;

exports.auth = (req, res, next) => {
  if (req.cookies && req.cookies.token) {
    const { token } = req.cookies;
    const payload = verify(token, key);
    req.user = payload;
    if (payload) {
      res.status(200).send({ statusCode: 200, isAuth: true, data: req.user });
    } else next();
  }
};
