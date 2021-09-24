const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/infos', userCtrl.showProfile);
// TODO : router.post('/update', userCtrl.modifyAccount);
// TODO : router.post('/delete', userCtrl.deleteAccount);

module.exports = router;
