const httpStatus = require('http-status');
const { newslettersService } = require('../services');

const uploadTemplate = (req, res) => {
    
    // const { file } = req;
    // const { channel, subject, template } = req.body;
    // newslettersService.uploadTemplate({ channel, subject, template, file });
    // res.json({ message: 'File uploaded successfully' });
}

const getTemplates = (req, res) => {
    res.json({ templates: newslettersService.getTemplates() });
}

const sendEmail = (req, res) => {
    const { newsletterIndex } = req.body;
    const total = newslettersService.sendNewsletter({ newsletterIndex });
    res.status(httpStatus.OK).json({ message: `Newsletter sent to ${total} subscribers` });
}

const sendScheduled = (req, res) => {
    const { hour, minute, newsletterIndex } = req.body;
    newslettersService.sendScheduled({ hour, minute, newsletterIndex });
    res.json({ message: `Scheduled job set to run at ${hour}:${minute}` });
};


module.exports = { sendEmail, sendScheduled, uploadTemplate, getTemplates};