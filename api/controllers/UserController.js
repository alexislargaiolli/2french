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
                if(err){
                    return serverError(err);
                }
                res.send(200, users);
            });
    },

    userEndTour: function (req, res) {
        User.update({id: req.user.id}, {tour: true}).exec(function (err, data) {
            if (err) {
                return res.serverError(err);
            } else {
                res.send(200);
            }
        });
    }
};

