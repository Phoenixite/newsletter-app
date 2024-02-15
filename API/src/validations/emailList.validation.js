const Joi = require('joi');

const signup = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    newsletters: Joi.array().items(Joi.string()).required(),
  }),
};

const batchSignup = {
  body: Joi.object().keys({
    emails: Joi.array().items(Joi.string()).required(),
    newsletters: Joi.array().items(Joi.string()).required(),
  }),
};

const subscriptions = {
  body: Joi.object().keys({}),
};

const unsubscribe = {
  query: Joi.object().keys({
    email: Joi.string().email().required(),
    newsletters: Joi.string().required(),
  }),
};

const managePreferences = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    newsletters: Joi.array().items(Joi.string()).required(),
  }),
};

module.exports = { 
  signup,
  batchSignup,
  subscriptions,
  unsubscribe,
  managePreferences
};
