const jwt = require('jsonwebtoken');
const axios = require('axios');

module.exports = {


  friendlyName: 'Google Login',


  description: 'Get data from Google OAuth2 process, verifies if data is valid and sign up or login user.',

  inputs: {
    emailAddress: {
      required: true,
      type: 'string',
      isEmail: true,
    },
    fullName: {
      required: true,
      type: 'string',
    },
    apiToken: {
      required: true,
      type: 'string',
    },
    providerId: {
      required: true,
      type: 'string',
    },
  },

  exits: {
    success: {
      description: 'New user account was created successfully.'
    },
    badRequest: {
      responseType: 'badRequest',
    },
  },

  fn: async function (inputs, exits) {
    var email = inputs.emailAddress.toLowerCase();

    try {
      const response = await axios.get(sails.config.custom.gmailTokenInfoUrl, {
        params: {
          access_token: inputs.apiToken,
        }
      });
      if (response.data.email != email) {
        return exits.badRequest('Google access token doesn\'t match email.');
      }
    } catch (error) {
      console.error('google access token validation', error.response);
      return exits.badRequest('Google access token validation failed.');
    }

    var userRecord = await User.findOne({
      emailAddress: email,
    });

    if (userRecord) {
      if (userRecord.providerId != inputs.providerId) {
        return exits.badRequest('Provider ID does not match.');
      }
      if (userRecord.status != 'confirmed') {
        return exits.success({
          isConfirmed: false,
          message: 'User is not confirmed by admin yet, please contact support.',
        });
      }
    } else {
      userRecord = await User.create({
        emailAddress: email,
        fullName: inputs.fullName,
        tosAcceptedByIp: this.req.ip,
        status: 'confirmed',
        providerId: inputs.providerId,
      }).fetch();

      await Setting.create({
        user: userRecord.id,
        mailerEmail: email,
        googleApiToken: inputs.apiToken,
      });
    }

    const token = jwt.sign({
      data: userRecord
    }, sails.config.custom.jwtSecret, { expiresIn: '7d' });

    return exits.success({
      isConfirmed: true,
      token: token,
      name: userRecord.fullName,
      email: userRecord.emailAddress,
    });

    // return exits.success({
    //   isConfirmed: false,
    //   message: 'Thank you for signing up, you will receive an email as soon as your account will be confirmed.',
    // });

  }

};
