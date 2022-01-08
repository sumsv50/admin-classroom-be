const express = require('express');
const router = express.Router();
const usersController = require('./usersController');

/* GET users listing. */
router.get('/', usersController.getAllUsers);

router.patch('/:userId', usersController.updateUserInfo);

module.exports = router;