const router = require('express').Router();

const { getEmptyBuildings, postEmptyBuilding } = require('./emptyBuildings');
const mailList = require('./mailList');
const { signUp } = require('./users');

router.get('/empty-buildings', getEmptyBuildings);
router.get('/mailList', mailList);

router.post('/sign-up', signUp);
router.post('/report-building', postEmptyBuilding);

module.exports = router;
