/**
 * profileOwner
 *
 * @module      :: Policy
 * @description :: Simple policy to allow profile owner to modify profile
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  if (req.user.role == "student" || req.user.role == "admin") {
    return next();
  }
  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.send(403);//res.forbidden('You are not permitted to perform this action.');
};
