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
            sails.log.info('search with days ');
            days = JSON.parse(days);
            periods = JSON.parse(periods);
        }
        if (count && count == 1) {
            sails.services['search'].fullSearch(true, skip, pageSize, city, lvl2, lvl1, country, days, periods, function (err, count) {
                if (err) {
                    return res.sendError('Erreur dans la recherche');
                }
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

    findByCity: function (req, res) {
        var count = req.allParams().count;
        var pageSize = req.allParams().pageSize;
        var pageIndex = req.allParams().pageIndex;
        var city = req.query['city'];
        var days = req.query['days'];
        var periods = req.query['periods'];
        if (days && days.length > 0) {
            days = JSON.parse(days);
            periods = JSON.parse(periods);
            if (count && count == 1) {
                Profile.count(
                    {
                        where: {
                            "city.address_components": {
                                $elemMatch: {
                                    long_name: city
                                }
                            }
                            ,
                            "schedules": {
                                $not: {
                                    $elemMatch: {
                                        "period": {
                                            $in: periods
                                        }
                                        ,
                                        "undispos": {
                                            $in: days
                                        }
                                    }
                                }
                            }
                        }
                    }
                ).exec(function (err, count) {
                        if (err) {
                            return res.send('500', 'error')
                        }
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
                Profile.find(
                    {
                        where: {
                            "city.address_components": {
                                $elemMatch: {
                                    long_name: city
                                }
                            },
                            "schedules": {
                                $not: {
                                    $elemMatch: {
                                        "period": {
                                            $in: periods
                                        },
                                        "undispos": {
                                            $in: days
                                        }
                                    }
                                }
                            }
                        },
                        skip: skip,
                        limit: pageSize,
                    }
                )
                    .populate('formations')
                    .populate('extras')
                    .exec(function (err, profiles) {
                        if (err) {
                            return res.send('500', 'error')
                        }
                        res.send(200, profiles);
                    });
            }
        }
        else {
            if (count && count == 1) {
                Profile.count(
                    {
                        "city.address_components": {
                            $elemMatch: {
                                long_name: city
                            }
                        }
                    }
                ).exec(function (err, count) {
                        if (err) {
                            return res.send('500', 'error')
                        }
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
                Profile.find(
                    {
                        where: {
                            "city.address_components": {
                                $elemMatch: {
                                    long_name: city
                                }
                            }
                        },
                        skip: skip,
                        limit: pageSize,
                    }
                )
                    .populate('formations')
                    .populate('extras')
                    .exec(function (err, profiles) {
                        if (err) {
                            return res.send('500', 'error')
                        }
                        res.send(200, profiles);
                    });
            }
        }
    }
};

