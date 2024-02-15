const httpStatus = require('http-status');
const { emailListService } = require('../services');

const signup = (req, res) => {
    const { email, newsletters } = req.body;
    emailListService.signup({ email, newsletters });
    res.status(httpStatus.CREATED).json({ message: 'Successfully subscribed to newsletter' });
};

const batchSignup = (req, res) => {
    const { emails, newsletters } = req.body;
    emailListService.batchSignup({ emails, newsletters });
    res.status(httpStatus.CREATED).json({ message: 'Successfully subscribed to newsletter (batch)' });
};

const subscriptions = (req, res) => {
    res.status(httpStatus.OK).json(emailListService.subscribers);
}

const unsubscribe = (req, res) => {
    const { email, newsletters: newsletterString } = req.query;
    const newsletters = newsletterString ? newsletterString.split(',') : [];

    emailListService.unsubscribe({ email, newsletters });

    res.status(httpStatus.OK).json({ message: 'Successfully unsubscribed from newsletter(s)' });
}

const managePreferences = (req, res) => {
    const { email, newsletters } = req.body;

    emailListService.managePreferences({ email, newsletters });

    res.status(httpStatus.OK).json({ message: 'Successfully updated newsletter preferences' });
}

module.exports = { signup, batchSignup, subscriptions, unsubscribe,  managePreferences };