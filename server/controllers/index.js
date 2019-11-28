const router = require('express').Router();

const { auth } = require('./middleware/auth');

const { getEmptyBuildings, postEmptyBuilding } = require('./emptyBuildings');
const mailList = require('./mailList');
const { signIn, logout } = require('./users');

router.post('/sign-in', signIn);

router.get('/mailList', mailList);
router.post('/report-building', postEmptyBuilding);

router.use(auth);
router.get('/is-auth', (req, res) => {
  res.send({ statusCode: 200 });
});
router.get('/empty-buildings', getEmptyBuildings);
router.get('/logout', logout);

module.exports = router;
