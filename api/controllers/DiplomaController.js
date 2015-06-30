/**
 * DiplomaController
 *
 * @description :: Server-side logic for managing diplomas
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var DIPLOMA_DIR_NAME = "../../diplomas";
module.exports = {
    userDiploma: function(req, res){
        Diploma.findOrCreate({owner : req.user.id}, {owner : req.user.id}).exec(function(err, diploma){
            if(err){
                res.send(500, "Error while fetching diploma");
            }
            else{
                res.send(200, diploma);
            }
        });
    },
    upload: function(req, res) {
        if (req.method === 'GET')
            return res.json({
                'status': 'GET not allowed'
            });
        //	Call to /upload via GET is error

        var uploadFile = req.file('file');

        uploadFile.upload({
            dirname: DIPLOMA_DIR_NAME
        }, function onUploadComplete(err, files) {
            //	Files will be uploaded to .tmp/uploads
            if (err) {
                res.send(500, {
                    status: 500,
                    message: sails.__('file.upload.error')
                });
            }
            Diploma.findOne({owner : req.user.id}).exec(function(err, diploma){
                if(err){
                    res.send(500, "Error while fetching diploma");
                }
                diploma.diplomaUploaded = true;
                diploma.diplomaValidated = false;
                diploma.save(function(err, d){
                    if(err){
                        res.send(500, "Error while updating diploma");
                    }
                    else{
                        res.send(200, d);
                    }
                });
            });

        });
    }
};

