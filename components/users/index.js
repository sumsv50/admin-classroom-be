const express = require('express');
const router = express.Router();
const usersController = require('./usersController');

/* GET users listing. */
router.get('/', usersController.getAllUsers);

module.exports = router;