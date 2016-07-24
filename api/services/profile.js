function populateAfterLogin(user, callback) {
    sails.log.debug('Profile.populateAfterLogin() - user : ' + user.profile);
    Profile.findOne({'id': user.profile}).exec(function (err, profile) {
        if (err) {
            return callback(err);
        }
        sails.log.debug('Profile.populateAfterLogin() - profile found : ' + profile);
        Diploma.findOne({'owner' : user.id}).exec(function(err, diploma){
            if(err){
                return callback(err);
            }
            sails.log.debug('Profile.populateAfterLogin() - dimploma found : ' + diploma);
            UserFavList.findOne({'owner' : user.id}).exec(function(err, favlist){
                if(err){
                    return callback(err);
                }
                sails.log.debug('Profile.populateAfterLogin() - user favlist : ' + favlist);
                return callback(err, {status: 2, user: user, profile : profile, diploma : diploma, favlist : favlist});
            });
        });
    });
}

module.exports = {populateAfterLogin: populateAfterLogin}
