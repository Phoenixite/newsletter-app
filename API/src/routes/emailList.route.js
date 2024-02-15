const express = require('express');
const validate = require('../middlewares/validate');
const { emailListValidation } = require('../validations');
const { emailListController } = require('../controllers');

const router = express.Router();

router
  .get('/', validate(emailListValidation.subscriptions), emailListController.subscriptions)
  .post('/', validate(emailListValidation.signup),emailListController.signup);

router
  .get('/unsubscribe', validate(emailListValidation.unsubscribe), emailListController.unsubscribe);

router
  .post('/batch', validate(emailListValidation.batchSignup),emailListController.batchSignup);

router
  .post('/manage-preferences', validate(emailListValidation.managePreferences) , emailListController.managePreferences);

module.exports = router;