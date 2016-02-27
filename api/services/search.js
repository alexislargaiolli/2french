module.exports = {
    buildQuery: function (skip, pageSize, location, days, periods) {
        sails.log.debug('search.buildQuery() [location : ' + location + ', days : ' + days + ', periods : ' + periods + ']');
        var query = {};
        query["where"] = {};
        query["skip"] = skip;
        query["limit"] = pageSize;
        query["where"] = {
            "validate": true,
            "city.address_components": {
                $elemMatch: {
                    "short_name": location
                }
            }
        };
        if (days && days.length > 0) {
            query["where"] = {
                "validate": true,
                "city.address_components": {
                    $elemMatch: {
                        short_name: location
                    }
                },
                "schedules": {
                    $not: {
                        $elemMatch: {
                            "undispos.date": {
                                $in: days
                            }
                        }
                    }
                }
            };
        }
        sails.log.debug(JSON.stringify(query));
        return query;
    },

    searchByCity: function (count, skip, pageSize, city, days, periods, callback) {
        var query = this.buildQuery(skip, pageSize, city, days, periods);
        Profile[count ? 'count' : 'find'](query)
            .populate('formations')
            .populate('extras')
            .exec(function (err, profiles) {
                callback(err, profiles);
            });
    },
    searchByLvl1: function (count, skip, pageSize, lvl1, days, periods, callback) {
        var query = this.buildQuery(skip, pageSize, lvl1, days, periods);
        Profile[count ? 'count' : 'find'](query)
            .populate('formations')
            .populate('extras')
            .exec(function (err, profiles) {
                callback(err, profiles);
            });
    },

    searchByLvl2: function (count, skip, pageSize, lvl2, days, periods, callback) {
        var query = this.buildQuery(skip, pageSize, lvl2, days, periods);
        Profile[count ? 'count' : 'find'](query)
            .populate('formations')
            .populate('extras')
            .exec(function (err, profiles) {
                callback(err, profiles);
            });
    },

    searchByCountry: function (count, skip, pageSize, country, days, periods, callback) {
        var query = this.buildQuery(skip, pageSize, country, days, periods);
        Profile[count ? 'count' : 'find'](query)
            .populate('formations')
            .populate('extras')
            .exec(function (err, profiles) {
                callback(err, profiles);
            });
    },

    fullSearch: function (count, skip, pageSize, city, lvl2, lvl1, country, days, periods, callback) {
        var that = this;
        that.searchByCity(count, skip, pageSize, city, days, periods, function (err, profiles) {
            if (err) {
                return callback(err, profiles);
            }
            if (count && profiles > 0) {
                return callback(err, profiles);
            }
            else if (!count && profiles && profiles.length > 0) {
                return callback(err, profiles);
            }
            else {
                that.searchByLvl2(count, skip, pageSize, lvl2, days, periods, function (err, profiles) {
                    if (err) {
                        return callback(err, profiles);
                    }
                    if (count && profiles > 0) {
                        return callback(err, profiles);
                    }
                    else if (!count && profiles && profiles.length > 0) {
                        return callback(err, profiles);
                    }
                    else {
                        that.searchByLvl1(count, skip, pageSize, lvl1, days, periods, function (err, profiles) {
                            if (err) {
                                return callback(err, profiles);
                            }
                            if (count && profiles > 0) {
                                return callback(err, profiles);
                            }
                            else if (!count && profiles && profiles.length > 0) {
                                return callback(err, profiles);
                            }
                            else {
                                that.searchByCountry(count, skip, pageSize, country, days, periods, function (err, profiles) {
                                    return callback(err, profiles);
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    daysToScientificNotation : function(days){
        for(var i =0; i<days.length; i++){
            days[i] = Number(days[i].toExponential());
            sails.log.debug(days[i]);
        }
        return days;
    }
}
