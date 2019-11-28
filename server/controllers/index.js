const router = require('express').Router();

const { auth } = require('./middleware/auth');

const {
  getEmptyBuildings,
  postEmptyBuilding,
  getBuilding,
} = require('./emptyBuildings');
const mailList = require('./mailList');
const { signUp, signIn, logout } = require('./users');

router.post('/sign-in', signIn);

router.post('/sign-up', signUp);
router.get('/mailList', mailList);
router.post('/report-building', postEmptyBuilding);

router.use(auth);
router.get('/empty-buildings', getEmptyBuildings);
router.get('/empty-buildings/:id', getBuilding);
router.get('/logout', logout);

module.exports = router;
