/**
 * UserFavListController
 *
 * @description :: Server-side logic for managing UserFavList
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var util = require('util'),
    actionUtil = require('sails/lib/hooks/blueprints/actionUtil'),
    _ = require('sails/node_modules/lodash');
module.exports = {
    find : function(req, res){

        // If an `id` param was specified, use the findOne blueprint action
        // to grab the particular instance with its primary key === the value
        // of the `id` param.   (mainly here for compatibility for 0.9, where
        // there was no separate `findOne` action)
        if ( actionUtil.parsePk(req) ) {
            return require('./findOne')(req,res);
        }

        // Lookup for records that match the specified criteria
        var query = UserFavList.find()
            .where( actionUtil.parseCriteria(req) )
            .limit( actionUtil.parseLimit(req) )
            .skip( actionUtil.parseSkip(req) )
            .sort( actionUtil.parseSort(req) )
            .populate('favorits');
        query.exec(function found(err, matchingRecords) {
            if (err) return res.serverError(err);

            /*var i = 0;
            for(i = 0; i < matchingRecords.length; i++){
                var favlist = matchingRecords[i];
                var j = 0;
                var lightFavorites = [];
                for(j = 0; j < favlist.favorits.length; j ++){
                    var profile = favlist.favorits[j];
                    var lightFavorite = {};
                    lightFavorite.id =  profile.id;
                    lightFavorite.firstname =  profile.firstname;
                    lightFavorites.push(lightFavorite);
                }
                favlist.favorits = lightFavorites;
            }*/

            // Only `.watch()` for new instances of the model if
            // `autoWatch` is enabled.
            if (req._sails.hooks.pubsub && req.isSocket) {
                UserFavList.subscribe(req, matchingRecords);
                if (req.options.autoWatch) { UserFavList.watch(req); }
                // Also subscribe to instances of all associated models
                _.each(matchingRecords, function (record) {
                    actionUtil.subscribeDeep(req, record);
                });
            }

            matchingRecords.forEach(function(favlist){
                favlist.favorits.forEach(function(favorit){
                    delete favorit.city;
                    delete favorit.createdAt;
                    delete favorit.updatedAt;
                    delete favorit.motivation;
                });
            });

            res.ok(matchingRecords);
        });
    }
};

