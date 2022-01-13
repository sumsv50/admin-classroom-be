const express = require('express');
const router = express.Router();
const usersController = require('./adminsController');

/* GET users listing. */
router.get('/', usersController.getAllAdmins);

router.post('/', usersController.createAdmin);

router.get('/:adminId', usersController.getAdminInfo);

router.patch('/:adminId', usersController.updateAdminInfo);

module.exports = router;