const jwt = require('jsonwebtoken');

module.exports = {


  friendlyName: 'Signup',


  description: 'Sign up for a new user account.',

  inputs: {

    emailAddress: {
      required: true,
      type: 'string',
      isEmail: true
    },

    password: {
      required: true,
      type: 'string',
      maxLength: 200,
    },

    fullName: {
      required: true,
      type: 'string',
    }

  },


  exits: {

    success: {
      description: 'New user account was created successfully.'
    },

    invalid: {
      responseType: 'badRequest',
      description: 'The provided fullName, password and/or email address are invalid.',
    },

    emailAlreadyInUse: {
      statusCode: 409,
      description: 'The provided email address is already in use.',
    },

  },


  fn: async function (inputs, exits) {

    var newEmailAddress = inputs.emailAddress.toLowerCase();

    // Build up data for the new user record and save it to the database.
    // (Also use `fetch` to retrieve the new ID so that we can use it below.)
    var newUserRecord = await User.create(_.extend({
      emailAddress: newEmailAddress,
      password: await sails.helpers.passwords.hashPassword(inputs.password),
      fullName: inputs.fullName,
      tosAcceptedByIp: this.req.ip
    }, sails.config.custom.verifyEmailAddresses ? {
      status: 'email'
    } : {}))
      .intercept('E_UNIQUE', 'emailAlreadyInUse')
      .intercept({ name: 'UsageError' }, 'invalid')
      .fetch();

    await Setting.create({ user: newUserRecord.id });

    return exits.success({
      isConfirmed: false,
      message: 'Thank you for signing up, you will receive an email as soon as your account will be confirmed.',
    });
  }

};
