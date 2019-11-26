const router = require('express').Router();

const { getEmptyBuildings, postEmptyBuilding } = require('./emptyBuildings');
const mailList = require('./mailList');
const { signIn } = require('./users');

router.get('/empty-buildings', getEmptyBuildings);
router.get('/mailList', mailList);
router.post('/sign-in', signIn);

router.post('/report-building', postEmptyBuilding);

module.exports = router;
