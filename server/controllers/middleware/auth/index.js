const { verify } = require('jsonwebtoken');

const key = process.env.KEY;

exports.auth = (req, res, next) => {
  if (req.cookies && req.cookies.token) {
    const { token } = req.cookies;
    verify(token, key, (error, payload) => {
      if (error) {
        res.status(401).send({ statusCode: 401, error: 'Unauthorized' });
      } else {
        req.user = payload;
        next();
      }
    });
  } else {
    res.status(401).send({ statusCode: 401, error: 'Unauthorized' });
  }
};
