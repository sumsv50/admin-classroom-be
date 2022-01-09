const express = require('express');
const router = express.Router();
const classesController = require('./classesController');

/* GET classes listing. */
router.get('/', classesController.getAllClasses);

router.get('/:id', classesController.getClassDetail);

router.post('/', classesController.createNewClass);

module.exports = router;

