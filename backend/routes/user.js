const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/', userCtrl.showProfile);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;