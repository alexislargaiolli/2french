/**
 * Created by alex on 17/01/16.
 */
module.exports = function(req, res, next) {
    if(req.user){
        req.setLocale(req.user.defaultLocale);
    }
    next();
};