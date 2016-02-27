/**
 * UtilLinkController
 *
 * @description :: Server-side logic for managing Utillinks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    search : function(req, res){
        var count = req.allParams().count;
        var pageSize = req.allParams().pageSize;
        var pageIndex = req.allParams().pageIndex;
        var city = req.query['city'];
        var lvl2 = req.query['lvl2'] ? req.query['lvl2'] : city;
        var lvl1 = req.query['lvl1'] ? req.query['lvl1'] : city;
        var country = req.query['country'] ? req.query['country'] : city;

        if (count && count == 1) {
            sails.services['utillinks'].fullSearch(true, skip, pageSize, city, lvl2, lvl1, country, function (err, count) {
                if (err) {
                    return res.serverError('Erreur dans la recherche');
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
            sails.services['utillinks'].fullSearch(false, skip, pageSize, city, lvl2, lvl1, country, function (err, results) {
                if (err) {
                    return res.serverError('Erreur dans la recherche');
                }
                res.send(200, results);
            });
        }
    }
};

