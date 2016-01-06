function buildQuery(skip, pageSize, location) {
    var query = {};
    query["where"] = {};
    query["skip"] = skip;
    query["limit"] = pageSize;
    query["where"] = {
        "city.address_components": {
            $elemMatch: {
                short_name: location
            }
        }
    };
    return query;
}

function searchByCity(count, skip, pageSize, city, callback) {
    var query = buildQuery(skip, pageSize, city);
    UtilLink[count ? 'count' : 'find'](query)
        .exec(function (err, results) {
            callback(err, results);
        });
}
function searchByLvl1(count, skip, pageSize, lvl1, callback) {
    var query = buildQuery(skip, pageSize, lvl1);
    UtilLink[count ? 'count' : 'find'](query)
        .exec(function (err, results) {
            callback(err, results);
        });
}

function searchByLvl2(count, skip, pageSize, lvl2, callback) {
    var query = buildQuery(skip, pageSize, lvl2);
    UtilLink[count ? 'count' : 'find'](query)
        .exec(function (err, results) {
            callback(err, results);
        });
}

function searchByCountry(count, skip, pageSize, country, callback) {
    var query = buildQuery(skip, pageSize, country);
    UtilLink[count ? 'count' : 'find'](query)
        .exec(function (err, results) {
            callback(err, results);
        });
}

function fullSearch(count, skip, pageSize, city, lvl2, lvl1, country, callback) {
    sails.log.info('search by city ' + city);
    searchByCity(count, skip, pageSize, city, function (err, results) {
        if (err) {
            return callback(err, results);
        }
        if (count && results > 0) {
            return callback(err, results);
        }
        else if (!count && results && results.length > 0) {
            return callback(err, results);
        }
        else {
            searchByLvl2(count, skip, pageSize, lvl2, function (err, results) {
                return callback(err, results);
                /*if (err) {
                    return callback(err, results);
                }
                if (count && results > 0) {
                    return callback(err, results);
                }
                else if (!count && results && results.length > 0) {
                    return callback(err, results);
                }
                else {
                    sails.log.info('search by lvl1 ' + lvl1);
                    searchByLvl1(count, skip, pageSize, lvl1, function (err, results) {
                        if (err) {
                            return callback(err, results);
                        }
                        if (count && results > 0) {
                            return callback(err, results);
                        }
                        else if (!count && results && results.length > 0) {
                            return callback(err, results);
                        }
                        else {
                            sails.log.info('search by country ' + country);
                            searchByCountry(count, skip, pageSize, country, function (err, results) {
                                return callback(err, results);
                            });
                        }
                    });
                }*/
            });
        }
    });
}

module.exports = {searchByCity: searchByCity}
module.exports = {searchByLvl1: searchByLvl1}
module.exports = {searchByLvl2: searchByLvl2}
module.exports = {searchByCountry: searchByCountry}
module.exports = {fullSearch: fullSearch}
