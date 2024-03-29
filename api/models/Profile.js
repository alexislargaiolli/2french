/**
 * Profile.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
module.exports = {
    attributes: {
        owner: {
            model: 'User'
        },
        firstname: {
            type: 'string'
        },
        photo: {
            type: 'string'
        },
        motivation: {
            type: 'json'
        },
        levelFrom: {
            model: 'FormationLevel'
        },
        levelTo: {
            model: 'FormationLevel'
        },
        hourRate: {
            type: 'integer'
        },
        formations: {
            collection: 'Formation'
        },
        extras: {
            collection: 'Extra'
        },
        formulas: {
            type: 'json'
        },
        city: {
            type: 'json'
        },
        /**
         * True if the user proposes an accomodation
         */
        activeAccomodation: 'boolean',
        /**
         * List of accomodation equipement
         */
        equipments: {
            collection: 'Equipment'
        },
        /**
         * List of accomodation services
         */
        services: {
            collection: 'Service'
        },
        /**
         * Google places info of accomodation
         */
        location: {
            type: 'json'
        },
        /**
         * Accomodation latitude and longitude
         */
        accomodationCoords: {
            type: 'json'
        },
        /**
         * Photos of accomodation
         */
        photos: {
            type: 'json'
        },
        accomodationDescription: {
            type: 'json'
        },
        schedules: {
            type: 'json'
        },
        validate: {
            type: 'boolean',
            defaultsTo: false
        },

        /**
         * Average reviews mark
         */
        averageMark: {
            type: 'float',
            min: 0,
            max: 5
        },

        /**
         * Reviews added by students
         */
        reviews: {
            collection: 'review',
            via: 'teacher'
        }
    },
    /**
     * Find all validated profiles
     * @param cb
     */
    findValidated : function(cb){
        Profile.find({validate : true}).exec(cb);
    },
    findByUser:function(userId, cb){
        Profile.findOne({owner : userId}).exec(cb);
    },
    /**
     * The user associated to a given profile
     * @param profileId
     * @param cb callback method
     */
    getUser : function(profileId, cb){
        User.findOne({profile : profileId}).exec(cb);
    },
    /**
     *
     * @param profileId
     * @param cb callback method cb(err, isTeacher)
     */
    isTeacher : function(profileId, cb){
        Profile.getUser(profileId, function(err, user){
            if(err || !user){
                return cb(err, false);
            }
            var isTeacher = false;
            if(user.role == 'teacher' || user.role == 'admin'){
                isTeacher = true;
            }
            return cb(null, isTeacher);
        });
    },
    /**
     *
     * @param profile profile to check (object or id)
     * @returns {boolean} true if all required attribute to be visible on research are set
     */
    isProfileComplete: function (profile, cb) {
        sails.log.debug("Profile.isProfileComplete " + profile);
        (function _lookupProfileIfNecessary(afterLookup) {
            // (this self-calling function is just for concise-ness)
            if (typeof profile === 'object')
                return afterLookup(null, profile);
            Profile.findOne(profile).populate('formations').exec(afterLookup);
        })
        (function (err, profile) {
            if (err || !profile) {
                return cb(false);
            }
            if (profile.photo && profile.hourRate && profile.motivation && profile.formations && profile.formations.length > 0) {
                return cb(true);
            }
            return cb(false);
        });
    },
    /**
     * Check if a profile and associated diploma are valid
     * @param profile profile to check (object or id)
     * @param cb callback to call after process (cb(valid))
     */
    isProfileValid: function (profile, cb) {
        sails.log.debug("Profile.isProfileValid " + profile);
        (function _lookupProfileIfNecessary(afterLookup) {
            // (this self-calling function is just for concise-ness)
            if (typeof profile === 'object')
                return afterLookup(null, profile);
            Profile.findOne(profile).populate('formations').exec(afterLookup);
        })
        (function (err, profile) {
            if (err || !profile) {
                return cb(false);
            }
            Profile.isProfileComplete(profile, function (complete) {
                if (complete && complete == true) {
                    return Diploma.isValidatedByUser(profile.owner, cb);
                }
                cb(false);
            });
        });

    },
    /**
     * Set profile.validate to true
     * @param profile the profile to validate (object or id)
     * @param cb callback method to call
     */
    validateProfile: function (profile, cb) {
        sails.log.debug("Profile.validateProfile " + profile);
        (function _lookupProfileIfNecessary(afterLookup) {
            // (this self-calling function is just for concise-ness)
            if (typeof profile === 'object')
                return afterLookup(null, profile);
            Profile.findOne(profile).populate("formations").exec(afterLookup);
        })
        (function (err, profile) {
            if (err || !profile) {
                return cb(err, profile);
            }
            profile.validate = true;
            profile.save(function(err){
                cb(err, profile);
            });
        });
    },
    /**
     * Process to update validate status of a profile.
     * @param profile profile to check
     * @param cb callback method to call: cb(err, profile)
     */
    actionValidate: function (profile, cb) {
        Profile.isProfileValid(profile, function (valid) {
            if (valid && valid == true) {
                Profile.validateProfile(profile, function (err, profile) {
                    if (err || !profile) {
                        return cb(err, profile);
                    }
                    sails.services['mail'].sendProfileValidated(profile.owner);
                    cb(err, profile);
                });
            }
            else {
                cb(null, profile);
            }
        });
    },
    checkValidation: function (profileId, next) {
        //Je verifie que le profile est complet
        //Si oui je vérifie que le diplome est validé
        //Si oui je valide le profile

        sails.log.debug("checkValidation " + profileId);
        Profile.findOne({id: profileId}).populate('formations').exec(function (err, profile) {
            if (err) {
                return next(err);
            }
            if (profile && profile.validate) {
                return next(null, true);
            }

            //Check profile completion
            if (profile.photo && profile.hourRate && profile.motivation && profile.formations && profile.formations.length > 0) {

                //Check profile validated
                Diploma.findOne({'owner': profile.owner}).exec(function (err, diploma) {
                    if (diploma && diploma.diplomaValidated) {
                        profile.validate = true;
                    }
                    else {
                        profile.validate = false;
                    }
                    next(null, profile.validate);
                });
            }
            else {
                profile.validate = false;
                next(null, profile.validate);
            }
        });
    },
    /**
     * Return a profile with all required data for profile page
     * @param profileId id of the profile to retrive
     * @param cb callback method
     */
    getFullProfile : function(profileId, cb){
        //Load profile
        Profile.findOne({id : profileId}).populate('formations').populate('extras').exec(function(err, profile){
            if(err){
                return cb(err, null);
            }

            Profile.isTeacher(profileId, function(err, isTeacher){
                profile.isTeacher = isTeacher;
                return cb(null, profile);
            });
        });
    },
    /**
     * Return review of a given teacher
     * @param profile id or object of a teacher profile
     * @param cb callback method
     */
    getTeacherReview : function(profile, cb){
        var profileId;
        if (typeof profile === 'object'){
            profileId = profile.id;
        }
        else{
            profileId = profile;
        }
        Review.find({
            where: {teacher: profileId},
            select: ['mark', 'comment', 'student']
        }).exec(function (err, reviews) {
            if (err) {
                return cb(err, null);
            }
            if(reviews.length == 0){
                return cb(null, reviews);
            }
            reviews.forEach(function (review, index) {
                Profile.findOne({
                    where: {id: review.student},
                    select: ['firstname', 'photo']
                }).exec(function (err, student) {
                    if (err) {
                        return;
                    }
                    reviews[index].student = student;
                    if (index === reviews.length - 1) {
                        return cb(null, reviews);
                    }
                });
            });
        });
    },
    beforeCreate: function (values, next) {
        next();
    },
    afterCreate: function (profile, next) {
        next();
    },
    beforeUpdate: function (profile, next) {
        next();
    },
    afterUpdate: function (profile, next) {
        next();
    },

    afterDestroy: function (profiles, next) {
        if (profiles.length == 0) {
            return next();
        }
        profiles.forEach(function (profile, i) {
            //Remove reservations
            sails.log.info('destroy profile');
            sails.models.reservation.destroy({
                $or: [
                    {student: profile.id},
                    {teacher: profile.id},
                ]
            }).exec(function (err) {
                if (err) {
                    return next(err);
                }
                sails.log.info('destroy shedule');
                //Remove    schedules
                sails.models.schedule.destroy({
                    profile: profile.id
                }).exec(function (err) {
                    if (err) {
                        return next(err);
                    }
                    sails.log.info('update fav lists');
                    //Remove from other user fav list
                    UserFavList.update({}, {$pull: {favorits: profile.id}}).exec(function (err) {
                        if (err) {
                            return next(err);
                        }

                        sails.log.info('destroy posts');
                        //Remove all user post
                        sails.models.post.destroy({
                            author: profile.id
                        }).exec(function (err) {
                            if (err) {
                                sails.log.info('error destroying posts');
                                return next(err);
                            }
                            sails.log.info('profile destroyed');
                            next();
                        });
                    });
                });
            });
        });
    }
};