/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var util = require('util'),
    actionUtil = require('sails/lib/hooks/blueprints/actionUtil'),
    _ = require('sails/node_modules/lodash');

module.exports = {
	find : function(req, res){
        // Look up the model
        var Model = actionUtil.parseModel(req);


        // If an `id` param was specified, use the findOne blueprint action
        // to grab the particular instance with its primary key === the value
        // of the `id` param.   (mainly here for compatibility for 0.9, where
        // there was no separate `findOne` action)
        if ( actionUtil.parsePk(req) ) {
            return require('./findOne')(req,res);
        }

        // Lookup for records that match the specified criteria
        var query = Model.find()
            .where( actionUtil.parseCriteria(req) )
            .limit( actionUtil.parseLimit(req) )
            .skip( actionUtil.parseSkip(req) )
            .sort( actionUtil.parseSort(req) );
        // TODO: .populateEach(req.options);
        //query = actionUtil.populateEach(query, req);
        query.exec(function found(err, matchingRecords) {
            if (err) return res.serverError(err);

            // Only `.watch()` for new instances of the model if
            // `autoWatch` is enabled.
            if (req._sails.hooks.pubsub && req.isSocket) {
                Model.subscribe(req, matchingRecords);
                if (req.options.autoWatch) { Model.watch(req); }
                // Also subscribe to instances of all associated models
                _.each(matchingRecords, function (record) {
                    actionUtil.subscribeDeep(req, record);
                });
            }

            res.ok(matchingRecords);
        });
    },
    userFavTeacher : function(req, res){
        UserFavList.findOne({owner : req.user.id}).populate('favorits').exec(function(err, favlist){
            if(err){
                res.serverError("Unable to fetch user fav list");
            }
            else{
                res.send(200, favlist);
            }
        });
    },
    addFavorite : function(req, res){
        var profileId = req.allParams().profileId;
        if(!profileId){
            return res.serverError("Missing parameters");
        }
        UserFavList.findOrCreate({owner:req.user.id}, {owner:req.user.id}).exec(function(err, favlist){
            if(err){
                res.serverError("Unable to fetch user fav list");
            }
            else{
                Profile.findOne({id : profileId}).exec(function(err, p){
                    if(err){
                        res.serverError("Teacher does not exist");
                    }
                    else{
                        if(favlist.favorits){
                            favlist.favorits.push(p);
                        }
                        else{
                            favlist.favorits = [];
                            favlist.favorits.push(p);
                        }

                        sails.log.info(favlist);
                        favlist.save(function(err, f){
                            if(err){
                                res.serverError("Unable to add teacher to fav list");
                            }
                            else{
                                res.send('200', f);
                            }
                        });
                    }
                });
            }
        });
    }
};

