/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  // Actions used by other microservices
  'POST /job': { action: 'mailer/create-job' },

  // Unauthorized
  'GET   /health': { action: 'entrance/health' },
  'PUT   /login': { action: 'entrance/login' },
  'POST  /signup': { action: 'entrance/signup' },
  'POST  /google-login': { action: 'entrance/google-login' },
  'GET   /email/confirm': { action: 'entrance/confirm-email' },
  'POST  /email/send-recovery-email': { action: 'entrance/send-password-recovery-email' },
  'POST  /update-password-and-login': { action: 'entrance/update-password-and-login' },

  // Authorized
  'GET   /logout': { action: 'user/logout' },
  'PUT   /update-password': { action: 'user/update-password' },

  // Dashboard
  'GET  /settings': { action: 'settings/get' },
  'PUT  /settings': { action: 'settings/update' },
  'POST /jobs': { action: 'jobs/list' },
  'POST /bid': { action: 'jobs/create-bid' },
  'PUT  /job': { action: 'jobs/update' },

  // Admin
  'GET  /set-user-status': { action: 'admin/set-user-status' },
};
