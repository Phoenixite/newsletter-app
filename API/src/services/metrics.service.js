const { 
    metricsModel,
    emailListModel,
} = require('../models');

const { emailLog, failLog } = metricsModel;
const { subscribers } = emailListModel;

let channels = [
    'raccoons',
    'frogs'
];

const getMetrics = (madeUp) => {
    const newsletterMetrics = {};
    channels.forEach(newsletter => {
        if (!madeUp) newsletterMetrics[newsletter] = emailLog.filter(log => log.newsletter === newsletter).length;
        else newsletterMetrics[newsletter] = Math.floor(Math.random() * 1000);
    });
    const subscriberMetrics = {};
    subscribers.forEach(subscriber => {
        if (!madeUp) subscriberMetrics[subscriber.email] = emailLog.filter(log => log.email === subscriber.email).length;
        else subscriberMetrics[subscriber.email] = Math.floor(Math.random() * 1000);
    });
    const totalEmailsSent = emailLog.length;
    const totalFailedEmails = failLog.length;


    const emailsSentLast7Days = {};
    if (!madeUp) 
    {
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateString = date.toDateString();
            emailsSentLast7Days[dateString] = emailLog.filter(log => log.date.toDateString() === dateString).length;
            emailsSentLast7Days['total'] = emailsSentLast7Days['total'] + emailsSentLast7Days[dateString] || emailsSentLast7Days[dateString];
        }
    }
    else
    {
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateString = date.toDateString();
            emailsSentLast7Days[dateString] = Math.floor(Math.random() * 1000);
            emailsSentLast7Days['total'] = emailsSentLast7Days['total'] + emailsSentLast7Days[dateString] || emailsSentLast7Days[dateString];
        }
    }

    return {
        newsletterMetrics,
        subscriberMetrics,
        totalEmailsSent,
        totalFailedEmails,
        emailsSentLast7Days
    };
};

module.exports = { getMetrics };