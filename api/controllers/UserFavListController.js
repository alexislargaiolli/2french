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
    findOne: function (req, res) {
        var pk = actionUtil.requirePk(req);
        var query = UserFavList.findOne(pk);
        query = actionUtil.populateEach(query, req);
        query.exec(function found(err, matchingRecord) {
            if (err) return res.serverError(err);
            if (!matchingRecord) return res.notFound('No record found with the specified `id`.');
            if (matchingRecord.owner.id != req.user.id) {
                res.forbidden();
            }
            if (sails.hooks.pubsub && req.isSocket) {
                Model.subscribe(req, matchingRecord);
                actionUtil.subscribeDeep(req, matchingRecord);
            }

            matchingRecord.favorits.forEach(function (favorit) {
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
    },

    create: function (req, res) {
        var Model = actionUtil.parseModel(req);

        // Create data object (monolithic combination of all parameters)
        // Omit the blacklisted params (like JSONP callback param, etc.)
        var data = actionUtil.parseValues(req);


        // Create new instance of model using data from params
        Model.create(data).exec(function created(err, newInstance) {

            // Differentiate between waterline-originated validation errors
            // and serious underlying issues. Respond with badRequest if a
            // validation error is encountered, w/ validation info.
            if (err) return res.negotiate(err);

            // If we have the pubsub hook, use the model class's publish method
            // to notify all subscribers about the created item
            if (req._sails.hooks.pubsub) {
                if (req.isSocket) {
                    Model.subscribe(req, newInstance);
                    Model.introduce(newInstance);
                }
                Model.publishCreate(newInstance, !req.options.mirror && req);
            }

            // Send JSONP-friendly response if it's supported
            // (HTTP 201: Created)
            res.status(201);
            res.ok(newInstance.toJSON());
        });
    },

    userList: function (req, res) {
        UserFavList.findOne({owner: req.user.id}).populate('favorits').exec(function (err, favList) {
            if (err) return res.serverError(err);
            if (favList) {
                favList.favorits.forEach(function (favorit) {
                    delete favorit.city;
                    delete favorit.createdAt;
                    delete favorit.updatedAt;
                    delete favorit.motivation;
                    delete favorit.accomodation;
                    delete favorit.accomodationCoords;
                    delete favorit.accomodationDescription;
                    delete favorit.activeAccomodation;
                    delete favorit.formulas;
                    delete favorit.location;
                    delete favorit.photos;
                    delete favorit.schedules;
                    delete favorit.hourRate;
                    delete favorit.averageMark;
                    delete favorit.validate;
                });
                return res.send(200, favList.favorits);
            }
            else {
                return res.send(200, []);
            }
        });
    },

    addToList: function (req, res) {
        var profileId = req.allParams().profileId;
        if (profileId) {
            UserFavList.findOrCreate({owner: req.user.id}, {owner: req.user.id, favorits : []}).exec(function (err, favList) {
                if (err) return res.serverError(err);
                favList.favorits.add(profileId);
                favList.save(function (err, list) {
                    if (err) return res.serverError(err);
                    return res.send(200, list.favorits);
                });
            });
        }
        else{
            return res.serverError('Missing params');
        }
    },

    removeFromList: function (req, res) {
        var profileId = req.allParams().profileId;
        if (profileId) {
            UserFavList.findOrCreate({owner: req.user.id}, {owner: req.user.id, favorits : []}).exec(function (err, favList) {
                if (err) return res.serverError(err);
                favList.favorits.remove(profileId);
                favList.save(function (err, list) {
                    if (err) return res.serverError(err);
                    return res.send(200, list.favorits);
                });

            });
        }
        else{
            return res.serverError('Missing params');
        }
    }


};

