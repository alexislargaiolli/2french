/**
 * admin
 *
 * @module      :: Policy
 * @description :: Simple policy to allow admin user or user to access their own user model
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  if (req.user.id == req.allParams().owner || req.user.role == 'admin') {
    return next();
  }
  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.send(403);//res.forbidden('You are not permitted to perform this action.');
};