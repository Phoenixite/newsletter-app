const newsletterTemplates = [
    {
        channel: 'raccoons',
        subject: 'Raccoon Newsletter',
        template: 'raccoon-newsletter.html',
        attachments: [
            {
                filename: 'cool-racoon.png',
                path: 'files/cool-racoon.png',
                cid: 'cool-racoon.png'
            }
        ]
    },
    {
        channel: 'frogs',
        subject: 'Frog Newsletter',
        template: 'frog-newsletter.html',
        attachments: [
            {
                filename: 'frog-logo.png',
                path: 'files/frog-logo.png',
                cid: 'frog-logo.png'
            },
            {
                filename: 'fruit-frogs.png',
                path: 'files/fruit-frogs.png',
                cid: 'fruit-frogs.png'
            },
            {
                filename: 'stickers.png',
                path: 'files/stickers.png',
                cid: 'stickers.png'
            }
        ]
    }
];
const scheduledJobs = [];


module.exports = {
    newsletterTemplates,
    scheduledJobs
};