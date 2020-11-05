const express = require('express');
const scheduleController = require('../controllers/scheduleController');

const router = express.Router();

router
  .route('/')
  .get(scheduleController.getFullSchedule);

router
  .route('/:day')
  .get(scheduleController.getByDay);

module.exports = router;
