module.exports = (req, res) => {
  res.clearCookie('token');
  res.send({ statusCode: 200 });
};
