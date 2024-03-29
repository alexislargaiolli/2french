/**
 * DiplomaController
 *
 * @description :: Server-side logic for managing diplomas
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var DIPLOMA_DIR_NAME = "../../diplomas";
var DIPLOMA_COLUMN_NAME = "diplomas_files";
module.exports = {
    userDiploma: function (req, res) {
        Diploma.findOrCreate({owner: req.user.id}, {owner: req.user.id}).exec(function (err, diploma) {
            if (err) {
                res.send(500, "Error while fetching diploma");
            }
            else {
                res.send(200, diploma);
            }
        });
    },
    adminFind: function (req, res) {
        Diploma.find({diplomaUploaded: true, diplomaValidated: false}).exec(function (err, diplomas) {
            if (err) {
                res.send(500, 'Error while fetching diplomas');
            }
            else {
                if (diplomas && diplomas.length > 0) {
                    sails.services['util'].populateDeep('diploma', diplomas, 'owner.profile', function (err, diplomas) {
                        if (err) {
                            return res.serverError("error while populating diplomas");
                        }
                        diplomas.forEach(function (diploma) {
                            diploma.ownerId = diploma.owner.id;
                            diploma.owner = diploma.owner.profile.firstname;
                        });
                        res.send(200, diplomas);
                    });
                }
                else {
                    res.send(200, diplomas);
                }
            }
        });
    },
    /**
     * Validates a diploma. Only for admin user.
     * @param req
     * @param res
     */
    validate: function (req, res) {
        var diplomaId = req.allParams().diplomadId;

        Diploma.actionValidate(diplomaId, function(err, diploma){
            if (err || !diploma) {
                return res.serverError('Error while validating diploma');
            }
            return res.send(200, diploma);
        });
    },
    upload: function (req, res) {
        var env = process.env.NODE_ENV;
        var conf = null;
        if (env == "development") {
            conf = sails.config.connections.mongo;
        }
        else if (env == "production") {
            conf = sails.config.connections.mongoProd;
        }
        if (conf) {
            var url = "mongodb://" + conf.user + ":" + conf.password + "@" + conf.host + ":" + conf.port + "/" + conf.database + "." + DIPLOMA_COLUMN_NAME;
            sails.log.info(url);
            req.file('file')
                .upload({
                    adapter: require('skipper-gridfs'),
                    uri: url
                }, function whenDone(err, uploadedFiles) {
                    if (err) {
                        res.send(500, "Error while writing file");
                    }
                    else {
                        Diploma.findOrCreate({owner: req.user.id}, {owner: req.user.id}).exec(function (err, diploma) {
                            if (err) {
                                res.send(500, "Diploma not found");
                            }
                            else {
                                diploma.fileName = uploadedFiles[0].fd;
                                diploma.diplomaUploaded = true;
                                diploma.diplomaValidated = false;
                                diploma.save(function (err) {
                                    if (err) {
                                        res.send(500, "Error while updating diploma");
                                    }
                                    else {
                                        res.send(200, diploma);
                                    }
                                });
                            }
                        });
                    }
                });
        }
        else {
            res.send(500, "Unknown environnement");
        }
    },
    downloadDiploma: function (req, res) {
        var fd = req.allParams().fd;
        if (!fd) {
            res.send(500, "Missing params fd");
        }
        else {
            var env = process.env.NODE_ENV;
            var conf = null;
            if (env == "development") {
                conf = sails.config.connections.mongo;
            }
            else if (env == "production") {
                conf = sails.config.connections.mongoProd;
            }
            if (conf) {
                var url = "mongodb://" + conf.user + ":" + conf.password + "@" + conf.host + ":" + conf.port + "/" + conf.database + "." + DIPLOMA_COLUMN_NAME

                var blobAdapter = require('skipper-gridfs')({
                    uri: url
                });

                blobAdapter.read(fd, function (error, file) {
                    if (error) {
                        res.json(error);
                    } else {
                        res.contentType('application/pdf');
                        res.send(new Buffer(file));
                    }
                });
            }
            else {
                res.send(500, "Unknown environnement");
            }
        }
    }
};

