const Joi = require('joi');

const getMetrics = {
    body: Joi.object().keys({}),
};

module.exports = { getMetrics };