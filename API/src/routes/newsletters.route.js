const express = require('express');
const multer = require('multer');
const validate = require('../middlewares/validate');
const { newslettersValidation } = require('../validations');
const { newslettersController } = require('../controllers');
const fs = require('fs-extra');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'attachment/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

router.post('/upload', upload.single('newsletter'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }
    res.json({ message: 'File uploaded successfully' });
});

router.delete('/attachments', (req, res) => {
  try {
    fs.emptyDirSync('attachment/');
    res.send('Attachments wiped successfully');
  } catch (err) {
    console.error('Error wiping attachments:', err);
    res.status(500).send('Internal Server Error');
  }
});


router
  .get('/', validate(newslettersValidation.getTemplates), newslettersController.getTemplates);

router
  .post('/send', validate(newslettersValidation.sendEmail), newslettersController.sendEmail);

router
  .post('/send-scheduled', validate(newslettersValidation.sendScheduled), newslettersController.sendScheduled);


module.exports = router;