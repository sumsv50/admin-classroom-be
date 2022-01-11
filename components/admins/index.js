const express = require('express');
const router = express.Router();
const usersController = require('./adminsController');

/* GET users listing. */
router.get('/', usersController.getAllAdmins);

router.get('/:userId', usersController.getUserInfo);

router.patch('/:adminId', usersController.updateAdminInfo);

module.exports = router;