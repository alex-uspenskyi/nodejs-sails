const jwt = require('jsonwebtoken');

module.exports = function defineCustomHook(sails) {

  return {

    /**
     * Runs when a Sails app loads/lifts.
     */
    initialize: async function () {

      sails.log.info('Initializing hook... (`api/hooks/custom`)');

      // After "sails-hook-organics" finishes initializing, configure Stripe
      // and Mailgun packs with any available credentials.
      sails.after('hook:organics:loaded', () => {

        sails.helpers.mailgun.configure({
          secret: sails.config.custom.mailgunSecret,
          domain: sails.config.custom.mailgunDomain,
          from: sails.config.custom.fromEmailAddress,
          fromName: sails.config.custom.fromName,
        });

      });//_∏_

      // ... Any other app-specific setup code that needs to run on lift,
      // even in production, goes here ...

    },


    routes: {

      /**
       * Runs before every matching route.
       *
       * @param {Ref} req
       * @param {Ref} res
       * @param {Function} next
       */
      before: {
        '/*': {
          skipAssets: true,
          fn: async function (req, res, next) {

            var token;
            var loggedInUser;
            //Check if authorization header is present
            if (req.headers && req.headers.authorization) {
              //authorization header is present
              var parts = req.headers.authorization.split(' ');
              if (parts.length == 2) {
                var scheme = parts[0];
                var credentials = parts[1];

                if (/^Bearer$/i.test(scheme)) {
                  token = credentials;
                }

                jwt.verify(token, sails.config.custom.jwtSecret, function (err, decoded) {
                  if (err) {
                    return res.json(401, { err: 'Invalid token' });
                  }
                  loggedInUser = decoded.data;
                });
              } else {
                return res.json(401, { err: 'Format is Authorization: Bearer [token]' });
              }
            } else {
              return next();
            }

            if (!loggedInUser) {
              sails.log.warn('Somehow, the user record for the logged-in user has gone missing....');
              return res.unauthorized();
            }

            if (req.me !== undefined) {
              throw new Error('Cannot attach logged-in user as `req.me` because this property already exists!  (Is it being attached somewhere else?)');
            }
            req.me = loggedInUser;

            // If our "lastSeenAt" attribute for this user is at least a few seconds old, then set it
            // to the current timestamp.
            //
            // (Note: As an optimization, this is run behind the scenes to avoid adding needless latency.)
            var MS_TO_BUFFER = 60 * 1000;
            var now = Date.now();
            if (loggedInUser.lastSeenAt < now - MS_TO_BUFFER) {
              User.updateOne({ id: loggedInUser.id })
                .set({ lastSeenAt: now })
                .exec((err) => {
                  if (err) {
                    sails.log.error('Background task failed: Could not update user (`' + loggedInUser.id + '`) with a new `lastSeenAt` timestamp.  Error details: ' + err.stack);
                    return;
                  }//•
                  sails.log.verbose('Updated the `lastSeenAt` timestamp for user `' + loggedInUser.id + '`.');
                  // Nothing else to do here.
                });
            }

            // Prevent the browser from caching logged-in users' pages.
            // (including w/ the Chrome back button)
            // > • https://mixmax.com/blog/chrome-back-button-cache-no-store
            // > • https://madhatted.com/2013/6/16/you-do-not-understand-browser-history
            res.setHeader('Cache-Control', 'no-cache, no-store');

            return next();
          }
        }
      }
    }


  };

};
