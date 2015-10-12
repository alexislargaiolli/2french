function buildQuery(skip, pageSize, location, days, periods) {
    var query = {};
    query["where"] = {};
    query["skip"] = skip;
    query["limit"] = pageSize;
    query["where"] = {
        "validate" : true,
        "city.address_components": {
            $elemMatch: {
                short_name: location
            }
        }
    };
    if (days && days.length > 0) {
        query["where"] = {
            "validate" : true,
            "city.address_components": {
                $elemMatch: {
                    short_name: location
                }
            },
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
        };
    }
    return query;
}

function searchByCity(count, skip, pageSize, city, days, periods, callback) {
    var query = buildQuery(skip, pageSize, city, days, periods);
    Profile[count ? 'count' : 'find'](query)
        .populate('formations')
        .populate('extras')
        .exec(function (err, profiles) {
            callback(err, profiles);
        });
}
function searchByLvl1(count, skip, pageSize, lvl1, days, periods, callback) {
    var query = buildQuery(skip, pageSize, lvl1, days, periods);
    Profile[count ? 'count' : 'find'](query)
        .populate('formations')
        .populate('extras')
        .exec(function (err, profiles) {
            callback(err, profiles);
        });
}

function searchByLvl2(count, skip, pageSize, lvl2, days, periods, callback) {
    var query = buildQuery(skip, pageSize, lvl2, days, periods);
    Profile[count ? 'count' : 'find'](query)
        .populate('formations')
        .populate('extras')
        .exec(function (err, profiles) {
            callback(err, profiles);
        });
}

function searchByCountry(count, skip, pageSize, country, days, periods, callback) {
    var query = buildQuery(skip, pageSize, country, days, periods);
    Profile[count ? 'count' : 'find'](query)
        .populate('formations')
        .populate('extras')
        .exec(function (err, profiles) {
            callback(err, profiles);
        });
}

function fullSearch(count, skip, pageSize, city, lvl2, lvl1, country, days, periods, callback) {
    sails.log.info('search by city ' + city);
    searchByCity(count, skip, pageSize, city, days, periods, function (err, profiles) {
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
            sails.log.info('search by lvl2 ' + lvl2);
            searchByLvl2(count, skip, pageSize, lvl2, days, periods, function (err, profiles) {
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
                    sails.log.info('search by lvl1 ' + lvl1);
                    searchByLvl1(count, skip, pageSize, lvl1, days, periods, function (err, profiles) {
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
                            sails.log.info('search by country ' + country);
                            searchByCountry(count, skip, pageSize, country, days, periods, function (err, profiles) {
                                return callback(err, profiles);
                            });
                        }
                    });
                }
            });
        }
    });
}

module.exports = {searchByCity: searchByCity}
module.exports = {searchByLvl1: searchByLvl1}
module.exports = {searchByLvl2: searchByLvl2}
module.exports = {searchByCountry: searchByCountry}
module.exports = {fullSearch: fullSearch}
