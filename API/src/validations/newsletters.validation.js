const Joi = require('joi');

const sendEmail = {
    body: Joi.object().keys({
        newsletterIndex: Joi.number().required(),
    }),
};

const sendScheduled = {
    body: Joi.object().keys({
        hour: Joi.number().min(0).max(23).required(),
        minute: Joi.number().min(0).max(59).required(),
        newsletterIndex: Joi.number().required(),
    }),
};

const uploadTemplate = {
    body: Joi.object().keys({}),
};

const getTemplates = {
    body: Joi.object().keys({}),
};

module.exports = { sendEmail, sendScheduled, uploadTemplate, getTemplates };