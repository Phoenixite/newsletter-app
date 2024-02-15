const Handlebars = require("handlebars");
const fs = require('fs');
const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');
const schedule = require('node-schedule');

const { 
    metricsModel,
    newslettersModel,
    emailListModel,
} = require('../models');

const { emailLog, failLog } = metricsModel;
const { newsletterTemplates, scheduledJobs } = newslettersModel;
const { subscribers } = emailListModel;

const transporter = nodemailer.createTransport(
    nodemailerSendgrid({
        apiKey: process.env.SENDGRID_API_KEY
    })
);

const logEmail = (email, newsletter) => {
    emailLog.push({ email, newsletter, date: new Date() });
};
const logFail = (email, newsletter, error) => {
    failLog.push({ email, newsletter, error, date: new Date() });
};

const uploadTemplate = ({ channel, subject, template, file }) => {

    const newsletter = {
        channel,
        subject,
        template,
        attachments: []
    }

    if(file)
    {
        newsletter.attachments.push({
            filename: file.originalname,
            path: `files/${file.path}`
        });
    }

    newsletterTemplates.push();
};

const getTemplates = () => {
    return newsletterTemplates;
}

const sendNewsletter = ({ newsletterIndex }) => {
    let newsletterTemplate = newsletterTemplates[newsletterIndex];
    if (!newsletterTemplate) {
        console.error('Newsletter template not found', newsletterIndex);
        return 0;
    }
    newsletterTemplate = JSON.parse(JSON.stringify(newsletterTemplate));
    const mailOptions = {
        from: 'wpipe94f@gmail.com',
        subject: newsletterTemplate.subject,
        attachments: newsletterTemplate.attachments || []
    };

    const files = fs.readdirSync('attachment/');
    files.forEach(file => {
        mailOptions.attachments.push({
            filename: file,
            path: `attachment/${file}`
        });
    });

    const htmlTemplate = fs.readFileSync( newsletterTemplate.template, 'utf-8');

    const emails = subscribers
        .filter(subscriber => subscriber.newsletters.includes(newsletterTemplate.channel))
        .map(subscriber => subscriber.email);

    emails
        .forEach(to => {
            mailOptions.to = to;
            const template = Handlebars.compile(htmlTemplate);
            mailOptions.html = template({
                UNSUBSCRIBE_LINK: encodeURIComponent(to),
                PREFERENCES_LINK: encodeURIComponent(to),
                NEWSLETTER: newsletterTemplate.channel,
                NAME: to.split('@')[0]
            });
            
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error occurred while sending email to', to);
                    logFail(to, newsletterTemplate.channel, error);
                    console.log(error.message)
                } else {
                    console.log(`Email sent successfully to ${to} at ${new Date()}`);
                    logEmail(to, newsletterTemplate.channel);
                }
            });
        });
    
    return emails.length;
}

const sendScheduled = ({ hour, minute, newsletterIndex }) => {
    let newsletterTemplate = newsletterTemplates[newsletterIndex];
    if (!newsletterTemplate) {
        throw new Error('Newsletter template not found');
    }
    newsletterTemplate = JSON.parse(JSON.stringify(newsletterTemplate));

    const { channel: newsletter } = newsletterTemplate

    let scheduledJob = scheduledJobs.find(job => job.newsletter === newsletter);
    if (scheduledJob) {
        scheduledJob.job.cancel();
        const valuesToRemove = scheduledJobs.filter(job => job.newsletter === newsletter);
        valuesToRemove.forEach(value => {
            const index = scheduledJobs.indexOf(value);
            if (index !== -1) {
                scheduledJobs.splice(index, 1);
            }
        });
    }

    scheduledJobs.push({
        newsletter,
        hour,
        minute,
        job: schedule.scheduleJob(`${minute} ${hour} * * *`, function() {
            sendNewsletter({ newsletterIndex });
        })
    });
}
module.exports = { sendNewsletter, sendScheduled, uploadTemplate, getTemplates };