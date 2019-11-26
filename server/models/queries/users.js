const base = require('../config');

exports.postUsers = ({ email, hashPassword, username }) => {
  return base('users').create([
    {
      fields: {
        email,
        password: hashPassword,
        username,
      },
    },
  ]);
};
