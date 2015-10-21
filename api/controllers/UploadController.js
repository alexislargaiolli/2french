/**
 * FileController
 *
 * @description :: Server-side logic for managing Files
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var AVATAR_DIR_NAME = "../../assets/images/avatars";
var ACCOMODATION_DIR_NAME = "../../assets/images/accomodations";
var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'hmn3vaygs', 
  api_key: '894785311872119', 
  api_secret: '2CN3RQvepjyZuNrAFix344bfOPU' 
});

module.exports = {
	uploadAvatar: function(req, res) {
		if (req.method === 'GET')
			return res.json({
				'status': 'GET not allowed'
			});
		//	Call to /upload via GET is error

		var uploadFile = req.file('file');

		

		uploadFile.upload({
			dirname: AVATAR_DIR_NAME
		}, function onUploadComplete(err, files) {
			//	Files will be uploaded to .tmp/uploads
			if (err) {
				res.send(500, {
					status: 500,
					message: sails.__('file.upload.error')
				});
			}

			cloudinary.uploader.upload(files[0].fd, function(result) { 			 
			  res.send(200, {
					status: 200,
					message: sails.__('file.upload.success'),
					url : result.secure_url
				});
			}, {folder : 'profiles/avatars'});

			/*var filePath = files[0].fd;
			var fileName = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.length);
			var fileUrl = "/images/avatars/" + fileName;*/
			//	IF ERROR Return and send 500 error with error			
			
		});
	},

	uploadAccomodationPhoto: function(req, res) {
		if (req.method === 'GET')
			return res.json({
				'status': 'GET not allowed'
			});
		//	Call to /upload via GET is error

		var uploadFile = req.file('file');

		uploadFile.upload({
			dirname: ACCOMODATION_DIR_NAME
		}, function onUploadComplete(err, files) {
			//	Files will be uploaded to .tmp/uploads
			if (err) {
				res.send(500, {
					status: 500,
					message: sails.__('file.upload.error')
				});
			}

			cloudinary.uploader.upload(files[0].fd, function(result) { 			 
			  res.send(200, {
					status: 200,
					message: sails.__('file.upload.success'),
					url : result.secure_url
				});
			}, {folder : 'profiles/accomodations'});

			/*var filePath = files[0].fd;
			var fileName = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.length);
			var fileUrl = "/images/accomodations/" + fileName;
			//	IF ERROR Return and send 500 error with error			
			res.send(200, {
				status: 200,
				message: sails.__('file.upload.success'),
				url : fileUrl
			});*/
		});
	}
};