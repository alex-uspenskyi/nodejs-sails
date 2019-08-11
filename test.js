const axios = require('axios');

const subject = '🤘From node';
const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
const messageParts = [
    'From: Justin Beckwith <beckwith@google.com>',
    'To: alex@springsapps.com',
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: ${utf8Subject}`,
    '',
    'Bid bid bid.',
    'So... <b>Hello!</b>  🤘❤️😎',
];
const message = messageParts.join('\n');

// The body needs to be base64url encoded.
const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

const token = 'ya29.Glu8Bh8C5Z6yVm6KmbSKR4feIRjigzVeMcFhqGsvk4xhLKlxNI5HiaghOHRJoU4m991H3FB_9D1g6cDIAryhQH6CNupdYDRRgkdSXQDg5IER_-jk9lT0p5wW4Jqo';

axios.post('https://www.googleapis.com/gmail/v1/users/me/messages/send', {
    raw: encodedMessage
}, {
    headers: {
        'Authorization': "Bearer " + token,
        'Accept': 'application/json',
    }
}).catch((error) => {
    if (error.response) {
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        console.log(error.request);
    } else {
        console.log('Error', error.message);
    }
    return false;
});