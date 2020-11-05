const express = require('express');
const showController = require('../controllers/showController');

const router = express.Router();

router
    .route('/')
    .get(showController.getAllShows);

router
    .route('/:tag')
    .get(showController.getByTag)

module.exports = router;
