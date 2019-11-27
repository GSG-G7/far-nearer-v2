const router = require('express').Router();

const { auth } = require('./middleware/auth');

const { getEmptyBuildings, postEmptyBuilding } = require('./emptyBuildings');
const mailList = require('./mailList');
const { signUp, signIn } = require('./users');

router.post('/sign-in', signIn);

router.post('/sign-up', signUp);
router.get('/mailList', mailList);
router.post('/report-building', postEmptyBuilding);

router.use(auth);
router.get('/empty-buildings', getEmptyBuildings);

module.exports = router;
