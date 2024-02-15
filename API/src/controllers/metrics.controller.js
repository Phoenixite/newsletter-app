const httpStatus = require('http-status');
const { metricsService } = require('../services');

const getMetrics = (req, res) => {
    const  madeUp = true;
    res.status(httpStatus.OK).json(metricsService.getMetrics(madeUp));
}

module.exports = { getMetrics };