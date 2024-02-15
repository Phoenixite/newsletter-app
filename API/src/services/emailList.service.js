const { subscribers } = require('../models/emailList.model');

const signup = async function ({ email, newsletters }) {
    const existingSubscriber = subscribers.find(subscriber => subscriber.email === email);
    if (existingSubscriber) {
        newsletters.forEach(newsletter => {
            if (!existingSubscriber.newsletters.includes(newsletter)) {
                existingSubscriber.newsletters.push(newsletter);
            }
        });
    } else {
        subscribers.push({ email, newsletters });
    }
};

const batchSignup = async function ({ emails, newsletters }) {
    emails.forEach(email => signup({ email, newsletters }));
};

const unsubscribe = async function ({ email, newsletters }) {
    const index = subscribers.findIndex(subscriber => subscriber.email === email);
    if (index === -1) return res.status(404).json({ error: 'Subscriber not found' });

    newsletters.forEach(newsletter => {
        const newsletterIndex = subscribers[index].newsletters.indexOf(newsletter);
        if (newsletterIndex === -1) return;
        subscribers[index].newsletters.splice(newsletterIndex, 1);
    });

    if (subscribers[index].newsletters.length === 0) subscribers.splice(index, 1);
};

const managePreferences = async function ({ email, newsletters }) {
    const index = subscribers.findIndex(subscriber => subscriber.email === email);
    if (!newsletters || newsletters.length === 0) 
    {
        subscribers.splice(index, 1);
        return 'Successfully unsubscribed from all newsletters'
    }
    if (index === -1) return 'Subscriber not found';

    subscribers[index].newsletters = newsletters;
};

module.exports = { subscribers, signup, batchSignup, unsubscribe, managePreferences };
