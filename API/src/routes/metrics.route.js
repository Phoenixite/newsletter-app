const express = require('express');
const validate = require('../middlewares/validate');
const { metricsValidation } = require('../validations');
const { metricsController } = require('../controllers');

const router = express.Router();

router
    .get('/', validate(metricsValidation.getMetrics), metricsController.getMetrics);

module.exports = router;