function populateAfterLogin(user, callback) {
    Profile.findOne({'id': user.profile}).exec(function (err, profile) {
        if (err) {
            return callback(err);
        }
        Diploma.findOne({'owner' : user.id}).exec(function(err, diploma){
            if(err){
                return callback(err);
            }
            UserFavList.findOne({'owner' : user.id}).exec(function(err, favlist){
                if(err){
                    return callback(err);
                }
                return callback(err, {status: 2, user: user, profile : profile, diploma : diploma, favlist : favlist});
            });
        });
    });
}

module.exports = {populateAfterLogin: populateAfterLogin}
