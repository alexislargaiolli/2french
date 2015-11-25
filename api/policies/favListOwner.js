/**
 * admin
 *
 * @module      :: Policy
 * @description :: Simple policy to allow access to user fav list
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

    // User is allowed, proceed to the next policy,
    // or if this is the last policy, the controller
    if (req.user.role == 'admin') {
        return next();
    }
    var id = req.allParams().id;
    UserFavList.findOne({id : id, owner : req.user.id}).exec(function(err, favList){
        if(err){
            return res.send('500');
        }
        if(favList){
            return next();
        }
        else{
            return res.send(403);
        }
    });
};
