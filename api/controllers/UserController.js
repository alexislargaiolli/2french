/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var util = require('util'),
    actionUtil = require('sails/lib/hooks/blueprints/actionUtil'),
    _ = require('sails/node_modules/lodash'),
    bcrypt = require('bcryptjs'),
    crypto = require('crypto');

module.exports = {
    find: function (req, res) {
        // Look up the model
        var Model = actionUtil.parseModel(req);


        // If an `id` param was specified, use the findOne blueprint action
        // to grab the particular instance with its primary key === the value
        // of the `id` param.   (mainly here for compatibility for 0.9, where
        // there was no separate `findOne` action)
        if (actionUtil.parsePk(req)) {
            return require('./findOne')(req, res);
        }

        // Lookup for records that match the specified criteria
        var query = Model.find()
            .where(actionUtil.parseCriteria(req))
            .limit(actionUtil.parseLimit(req))
            .skip(actionUtil.parseSkip(req))
            .sort(actionUtil.parseSort(req)).populate('profile');
        // TODO: .populateEach(req.options);
        //query = actionUtil.populateEach(query, req);
        query.exec(function found(err, matchingRecords) {
            if (err) return res.serverError(err);

            // Only `.watch()` for new instances of the model if
            // `autoWatch` is enabled.
            if (req._sails.hooks.pubsub && req.isSocket) {
                Model.subscribe(req, matchingRecords);
                if (req.options.autoWatch) {
                    Model.watch(req);
                }
                // Also subscribe to instances of all associated models
                _.each(matchingRecords, function (record) {
                    actionUtil.subscribeDeep(req, record);
                });
            }

            res.ok(matchingRecords);
        });
    },

    adminSearch: function (req, res) {
        var count = req.allParams().count;
        var pageSize = req.allParams().pageSize;
        var pageIndex = req.allParams().pageIndex;
        if (!pageSize) {
            pageSize = 10;
        }
        if (!pageIndex) {
            pageIndex = 1;
        }
        var skip = pageSize * (pageIndex - 1);
        var query = {};
        query["skip"] = skip;
        query["limit"] = pageSize;
        User[count ? 'count' : 'find'](query)
            .exec(function (err, users) {
                if (err) {
                    return serverError(err);
                }
                res.send(200, users);
            });
    },

    userEndTour: function (req, res) {
        User.update({
            id: req.user.id
        }, {
            tour: true
        }).exec(function (err, data) {
            if (err) {
                return res.serverError(err);
            } else {
                res.send(200);
            }
        });
    },

    userChangeLocale: function (req, res) {
        var locale = req.allParams().locale;
        if (['fr', 'en', 'es'].indexOf(locale) >= 0) {
            User.update({
                id: req.user.id
            }, {
                defaultLocale: locale
            }).exec(function (err, data) {
                if (err) {
                    return res.serverError(err);
                } else {
                    res.send(200);
                }
            });
        }
    },

    notificationSettings: function (req, res) {
        NotificationSettings.findOne({
            owner: req.user.id
        }).exec(function (err, settings) {
            if (err) {
                return res.serverError(err);
            }
            res.send(200, settings);
        });
    },

    updateNotificationSettings: function (req, res) {
        var settings = req.allParams().settings;
        NotificationSettings.update({
            owner: req.user.id
        }, {
            newReservation: settings.newReservation,
            reservationValidated: settings.reservationValidated,
            reservationCanceled: settings.reservationCanceled,
            reservationRefused: settings.reservationRefused,
            reviewToAdd: settings.reviewToAdd,
            reviewAdded: settings.reviewAdded,
            newMessage: settings.newMessage
        }).exec(function (err, settings) {
            if (err) {
                return res.serverError(err);
            }
            res.send(200, settings);
        });
    },

    changePassword: function (req, res) {
        var oldPass = req.allParams().old;
        var newPass = req.allParams().new;
        Passport.findOne({
            user: req.user.id
        }).exec(function (err, passport) {
            if (oldPass) {
                passport.validatePassword(oldPass, function (err, result) {
                    if (err) {
                        return res.send(500, req.__('user.change.password.wrong'));
                    }

                    if (!result) {
                        return res.send(500, req.__('user.change.password.wrong'));
                    } else {
                        passport.password = newPass;
                        passport.save(function (err) {
                            if (err) {
                                if (err.code === 'E_VALIDATION') {
                                    sails.log.info('invalid password');
                                    return res.send(500, req.__('Error.Passport.Password.Invalid.minlength', 8));
                                } else {
                                    return res.send(500, 'reset.password.error');
                                }
                            }
                            return res.send(200, req.__('user.change.password.success'));
                        });
                    }
                });
            } else {
                res.send(500, req.__('user.change.password.error'));
            }

        });
    },

    forgot: function (req, res) {
        var email = req.allParams('email').email;
        sails.log.debug('UserController.forgot() - ' + email);
        if (!email) {
            return res.send(500, req.__('reset.password.error'));
        }
        User.findOne({
            email: email
        }).exec(function (err, user) {
            if (err) {
                sails.log.error(err);
                return res.send(500, req.__('reset.password.error'));
            }
            if (!user) {
                sails.log.error('user not found');
                return res.send(500, req.__('reset.password.notfound'));
            }
            crypto.randomBytes(20, function (err, buf) {
                var token = buf.toString('hex');
                user.resetPasswordToken = token;
                user.resetPasswordExpires = new Date(Date.now() + 7200000);
                user.save(function (err) {
                    if (err) {
                        sails.log.error(err);
                        return res.serverError(req.__('reset.password.error'));
                    }
                    sails.services['mail'].forgottenPassword(token, email, function (err) {
                        if (err) {
                            sails.log.error(err);
                            return res.res.send(500, req.__('reset.password.success'));
                        }
                        res.send(200, req.__('reset.password.success'));
                    });
                });

            });
        });
    },

    checkResetToken: function (req, res) {
        var token = req.allParams().token;
        User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: {
                $gt: new Date(Date.now())
            }
        }, function (err, user) {
            if (!user) {
                return res.send(500, req.__('reset.password.expired'));
            }
            res.send(200);
        });
    },

    resetPassword: function (req, res) {
        var token = req.allParams().token;
        var password = req.allParams().password;
        var passwordConfirm = req.allParams().confirm;
        if (password && passwordConfirm) {
            if (password != passwordConfirm) {
                return req.send(500, req.__('reset.password.password.not.match'));
            } else {
                User.findOne({
                    resetPasswordToken: token,
                    resetPasswordExpires: {
                        $gt: new Date(Date.now())
                    }
                }, function (err, user) {
                    if (!user) {
                        return res.send(500, req.__('reset.password.expired'));
                    }

                    Passport.findOne({
                        user: user.id
                    }).exec(function (err, passport) {
                        if (err) {
                            return res.send(500, 'reset.password.error');
                        }
                        if (!passport) {
                            return res.send(500, 'reset.password.error');
                        }
                        passport.password = password;
                        passport.save(function (err) {
                            if (err) {
                                if (err.code === 'E_VALIDATION') {
                                    sails.log.info('invalid password');
                                    return res.send(500, req.__('Error.Passport.Password.Invalid.minlength', 8));
                                } else {
                                    return res.send(500, 'reset.password.error');
                                }
                            }
                            sails.services['mail'].resetPasswordConfirm(user.id, function () {

                            });
                            user.resetPasswordToken = null;
                            user.resetPasswordExpires = null;
                            user.save(function (err) {

                            });
                            return res.send(200, req.__('user.change.password.success'));
                        });
                    });
                });
            }
        } else {
            return res.send(500, req.__('reset.password.password.notfound'));
        }
    }
};