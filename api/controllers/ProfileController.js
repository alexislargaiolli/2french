/**
 * ProfileController
 *
 * @description :: Server-side logic for managing Profiles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    getMonthSchedule: function (req, res) {
        var profileId = req.allParams().profileId;
        var month = req.allParams().month;
        Schedule.findOne({owner: profileId, period: 'month'}).exec(function (err, schedule) {
            if (err) {
                res.sendError("Unable to find schedule");
            }
            else {
                res.send(200, schedule);
            }
        });
    },

    findByCity: function (req, res) {
        var city = req.query['city'];
        var days = req.query['days'];
        var periods = req.query['periods'];
        if (days && days.length > 0) {
            days = JSON.parse(days);
            periods = JSON.parse(periods);

            Profile.find(
                {
                    "city.address_components": {
                        $elemMatch: {
                            long_name: city
                        }
                    },
                    "schedules": {
                        $not : {
                            $elemMatch: {
                                "period" : {
                                    $in : periods
                                },
                                "undispos": {
                                    $in : days
                                }
                            }
                        }
                    }
                }
            )
                .populate('formations')
                .populate('extras')
                .exec(function (err, profiles) {
                    if (err) {
                        res.send('500', 'error')
                    }
                    res.send(200, profiles);
                });
        }
        else {
            Profile.find(
                {
                    "city.address_components": {
                        $elemMatch: {
                            long_name: city
                        }
                    }
                }
            )
                .populate('formations')
                .populate('extras')
                .exec(function (err, profiles) {
                    if (err) {
                        res.send('500', 'error')
                    }
                    res.send(200, profiles);
                });
        }
    }
};

