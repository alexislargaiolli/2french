function populateAfterLogin(user, callback) {
    sails.log.info('populateAfterLogin');
    Profile.findOne({'id': user.profile}).exec(function (err, profile) {
        if (err) {
            return callback(err);
        }
        sails.log.info('profile');
        Diploma.findOne({'owner' : user.id}).exec(function(err, diploma){
            if(err){
                return callback(err);
            }
            sails.log.info('diploma');
            UserFavList.findOne({'owner' : user.id}).exec(function(err, favlist){
                if(err){
                    return callback(err);
                }
                sails.log.info('favlist');
                return callback(err, {status: 2, user: user, profile : profile, diploma : diploma, favlist : favlist});
            });
        });
    });
}

module.exports = {populateAfterLogin: populateAfterLogin}
