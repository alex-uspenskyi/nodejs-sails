const axios = require('axios');

module.exports = {
  friendlyName: 'Send email from existing user',

  inputs: {
    emailFrom: {
      type: 'string',
      required: true
    },
    emailTo: {
      type: 'string',
      required: true
    },
    header: {
      type: 'string',
      required: true
    },
    body: {
      type: 'string',
      required: true
    },
    accessToken: {
      type: 'string',
      required: true
    },
  },

  fn: async function (inputs) {
    const utf8Subject = `=?utf-8?B?${Buffer.from(inputs.header).toString('base64')}?=`;
    const messageParts = [
      'From: ' + inputs.emailFrom,
      'To: ' + inputs.emailTo,
      'Content-Type: text/plain; charset=utf-8',
      'MIME-Version: 1.0',
      `Subject: ${utf8Subject}`,
      '',
      inputs.body,
    ];
    const encodedMessage = Buffer.from(messageParts.join('\n'))
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    try {
      await axios.post(sails.config.custom.gmailSendUrl, {
        raw: encodedMessage
      }, {
          headers: {
            'Authorization': "Bearer " + inputs.accessToken,
            'Accept': 'application/json',
          }
        });
    } catch (error) {
      console.error(error);
      return false;
    }

    return true;
  }
};

