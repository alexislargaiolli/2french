/**
 * Authentication Controller
 *
 * This is merely meant as an example of how your Authentication controller
 * should look. It currently includes the minimum amount of functionality for
 * the basics of Passport.js to work.
 */
var AuthController = {

    loggedin: function (req, res) {
        if (req.user) {
            sails.services['profile'].populateAfterLogin(req.user, function(err, data){
                if(err){
                    return sendError('Unable to laod user');
                }
                res.send(200, data);
            });
        }
        else {
            res.send('0');
        }
    },

    /**
     * Log out a user and return them to the homepage
     *
     * Passport exposes a logout() function on req (also aliased as logOut()) that
     * can be called from any route handler which needs to terminate a login
     * session. Invoking logout() will remove the req.user property and clear the
     * login session (if any).
     *
     * For more information on logging out users in Passport.js, check out:
     * http://passportjs.org/guide/logout/
     *
     * @param {Object} req
     * @param {Object} res
     */
    logout: function (req, res) {
        req.logout();
        res.send(200);
    },

    /**
     * Render the registration page
     *
     * Just like the login form, the registration form is just simple HTML:
     *
     <form role="form" action="/auth/local/register" method="post">
     <input type="text" name="username" placeholder="Username">
     <input type="text" name="email" placeholder="Email">
     <input type="password" name="password" placeholder="Password">
     <button type="submit">Sign up</button>
     </form>
     *
     * @param {Object} req
     * @param {Object} res
     */
    register: function (req, res) {
        res.view({
            errors: req.flash('error')
        });
    },

    /**
     * Create a third-party authentication endpoint
     *
     * @param {Object} req
     * @param {Object} res
     */
    provider: function (req, res) {
        passport.endpoint(req, res);
    },

    /**
     * Create a authentication callback endpoint
     *
     * This endpoint handles everything related to creating and verifying Pass-
     * ports and users, both locally and from third-aprty providers.
     *
     * Passport exposes a login() function on req (also aliased as logIn()) that
     * can be used to establish a login session. When the login operation
     * completes, user will be assigned to req.user.
     *
     * For more information on logging in users in Passport.js, check out:
     * http://passportjs.org/guide/login/
     *
     * @param {Object} req
     * @param {Object} res
     */
    callback: function (req, res) {
        function tryAgain(err) {

            // Only certain error messages are returned via req.flash('error', someError)
            // because we shouldn't expose internal authorization errors to the user.
            // We do return a generic error and the original request body.
            var flashError = req.flash('error')[0];

            if (err && !flashError) {
                //req.flash('error', 'Error.Passport.Generic');
                res.send(200, {status: 4, message: sails.__('Error.Passport.Generic')});

            } else if (flashError) {
                res.send(200, {status: 4, message: sails.__(flashError)});
                //req.flash('error', flashError);
            }
            else {
                //req.flash('error', flashError);
                res.send(200, {status: 4, message: 'unknown'});
            }


        }

        passport.callback(req, res, function (err, user) {
            if (err) {
                sails.log.error(err);
                return tryAgain();
            }

            req.login(user, function (err) {
                if (err) {
                    return tryAgain();
                }
                sails.services['profile'].populateAfterLogin(req.user, function(err, data){
                    if(err){
                        return sendError('Unable to laod user');
                    }
                    sails.log.debug('AuthController.callback() - login success - ' + data.user.username);
                    res.send(200, data);
                });
            });
        });
    },

    /**
     * Disconnect a passport from a user
     *
     * @param {Object} req
     * @param {Object} res
     */
    disconnect: function (req, res) {
        passport.disconnect(req, res);
    }
};

module.exports = AuthController;
