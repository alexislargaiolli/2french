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
        validate : {
            type: 'boolean',
            defaultsTo : false
        },

        /**
         * Average reviews mark
         */
        averageMark : {
            type : 'float',
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
    checkValidation : function(profileId, next){
        sails.log.info('checkValidation');
        Profile.findOne({id: profileId}).populate('formations').exec(function (err, profile) {
            if(err){
                return next(err);
            }
            if(profile && profile.validate){
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
    beforeCreate: function (values, next) {
        next();
    },
    afterCreate: function (profile, next) {
        next();
    },
    beforeUpdate: function (profile, next) {
        Profile.checkValidation(profile.id, function(err, v){
            profile.validate = v;
            next();
        });
    },
    afterUpdate : function(profile, next){
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