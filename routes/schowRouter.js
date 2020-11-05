const express = require('express');
const showController = require('../controllers/showController');

const router = express.Router();

router
    .route('/')
    .get(showController.getAllShows);

router
    .route('/filter')
    .get(showController.getByFilter)

router
    .route('/:type')
    .get(showController.getByType)

module.exports = router;
