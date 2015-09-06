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
    findOne : function(req, res){
        var pk = actionUtil.requirePk(req);
        var query = UserFavList.findOne(pk);
        query = actionUtil.populateEach(query, req);
        query.exec(function found(err, matchingRecord) {
            if (err) return res.serverError(err);
            if(!matchingRecord) return res.notFound('No record found with the specified `id`.');
            if(matchingRecord.owner.id != req.user.id){
                res.forbidden();
            }
            if (sails.hooks.pubsub && req.isSocket) {
                Model.subscribe(req, matchingRecord);
                actionUtil.subscribeDeep(req, matchingRecord);
            }

            matchingRecord.favorits.forEach(function(favorit){
                delete favorit.city;
                delete favorit.createdAt;
                delete favorit.updatedAt;
                delete favorit.motivation;
                delete favorit.accomodation;
                delete favorit.accomodationCoords;
                delete favorit.accomodationDescription;
                delete favorit.activeAccomodation;
                delete favorit.daySelected;
                delete favorit.formulas;
                delete favorit.location;
                delete favorit.photos;
                delete favorit.schedules;
                delete favorit.hourRate;
            });

            res.ok(matchingRecord);
        });
    }
};

