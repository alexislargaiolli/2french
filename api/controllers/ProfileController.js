/**
 * ProfileController
 *
 * @description :: Server-side logic for managing Profiles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    /**
     * Check if profile is complete and diploma is validated.
     * Update validate status of a profile.
     * @param req
     * @param res
     */
    validateProfile: function (req, res) {
        var profileId = req.allParams().id;
        sails.log.debug("ProfileController.validateProfile() " + profileId);

        Profile.actionValidate(profileId, function (err, profile) {
            if (err || !profile) {
                return res.serverError("Erreur lors de la validation du profile");
            }
            res.send(200, profile);
        });
    },
    validateProfileByUser: function (req, res) {
        var userToValidateId = req.allParams().userToValidateId;
        sails.log.debug("ProfileController.validateProfileByUser() " + userToValidateId);

        User.findOne(userToValidateId, function (err, user) {
            if (err || !user) {
                return res.serverError("Profile not found");
            }
            Profile.actionValidate(user.profile, function (err, profile) {
                if (err || !profile) {
                    return res.serverError("Erreur lors de la validation du profile");
                }
                res.send(200, profile);
            });
        });
    },

    search: function (req, res) {
        var count = req.allParams().count;
        var pageSize = req.allParams().pageSize;
        var pageIndex = req.allParams().pageIndex;
        var city = req.query['city'];
        var lvl2 = req.query['lvl2'] ? req.query['lvl2'] : city;
        var lvl1 = req.query['lvl1'] ? req.query['lvl1'] : city;
        var country = req.query['country'] ? req.query['country'] : city;
        var days = req.query['days'];
        var periods = req.query['periods'];

        if (days && days.length > 0) {
            days = JSON.parse(days);
            periods = JSON.parse(periods);
        }
        sails.log.debug('ProfileController.search() [city : ' + city + ', country : ' + country + ', lvl1 : ' + lvl1 + ', lvl2 : ' + lvl2 + ', days : ' + days + ', periods : ' + periods + ']');
        if (count && count == 1) {
            sails.services['search'].fullSearch(true, skip, pageSize, city, lvl2, lvl1, country, days, periods, function (err, count) {
                if (err) {
                    return res.sendError('Erreur dans la recherche');
                }
                sails.log.debug(" --> " + count + " results found");
                res.send(200, {count: count});
            });
        }
        else {
            if (!pageSize) {
                pageSize = 10;
            }
            if (!pageIndex) {
                pageIndex = 1;
            }
            var skip = pageSize * (pageIndex - 1);
            sails.services['search'].fullSearch(false, skip, pageSize, city, lvl2, lvl1, country, days, periods, function (err, profiles) {
                if (err) {
                    return res.sendError('Erreur dans la recherche');
                }
                res.send(200, profiles);
            });
        }
    },

    /**
     * Return a profile with all required data for profile page
     * @param req
     * @param res
     */
    fullProfile : function(req, res){
        var profileId = req.allParams().id;
        Profile.getFullProfile(profileId, function(err, profile){
            if(err || !profile){
                return res.serverError(err);
            }
            res.send(200, profile);
        });
    },

    teacherReviews: function (req, res) {
        Profile.getTeacherReview(req.allParams().teacherId, function(err, reviews){
            if (err) {
                return res.serverError(err);
            }
            return res.send(200, reviews);
        });
    }
};

