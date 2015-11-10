var tooFrenchControllers = angular.module('tooFrenchApp');
tooFrenchControllers.controller('UploadPhotoCtrl', ['$scope', '$upload', '$timeout', function($scope, $upload, $timeout) {
	
	$scope.$watch('files', function () {
        $scope.upload($scope.files);
    });

	$scope.upload = function(files){
		 if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
				$upload.upload({
					url: "https://api.cloudinary.com/v1_1/hmn3vaygs/upload",
					data: {
						upload_preset: "qaq7v2zy",
						tags: "myphotoalbum",
						context: "photo=tmp"
					},
					file: file
				}).progress(function(e) {
					$scope.progress = Math.round((e.loaded * 100.0) / e.total);
					$scope.status = "Uploading... " + $scope.progress + "%";
					$timeout(function() {
					  $scope.$apply();
					});
				}).success(function(data, status, headers, config) {
					$rootScope.photos = $rootScope.photos || [];
					data.context = {
						custom: {
							photo: $scope.title
						}
					};
					$scope.result = data;
					$rootScope.photos.push(data);
					$timeout(function() {
					  $scope.$apply();
					});
				}).error(function(data, status){
					$scope.status = "Error " + status;
				});
			}
		}
	};

	/*$scope.onFileSelect = function($files) {
		var file = $files[0]; // we're not interested in multiple file uploads here
		console.log(file);
		$scope.upload = $upload.upload({
			url: "https://api.cloudinary.com/v1_1/hmn3vaygs/upload",
			data: {
				upload_preset: 'qaq7v2zy',
				tags: 'myphotoalbum',
				context: 'photo=tmp'
			},
			file: file
		}).progress(function(e) {
			$scope.progress = Math.round((e.loaded * 100.0) / e.total);
			$scope.status = "Uploading... " + $scope.progress + "%";
			$timeout(function() {
			  $scope.$apply();
			});
		}).success(function(data, status, headers, config) {
			$rootScope.photos = $rootScope.photos || [];
			data.context = {
				custom: {
					photo: $scope.title
				}
			};
			$scope.result = data;
			$rootScope.photos.push(data);
			$timeout(function() {
			  $scope.$apply();
			});
		}).error(function(data, status){
			$scope.status = "Error " + status;
		});
	};

	/* Modify the look and fill of the dropzone when files are being dragged over it 
	$scope.dragOverClass = function($event) {
		var items = $event.dataTransfer.items;
		var hasFile = false;
		if (items != null) {
			for (var i = 0; i < items.length; i++) {
				if (items[i].kind == 'file') {
					hasFile = true;
					break;
				}
			}
		} else {
			hasFile = true;
		}
		return hasFile ? "dragover" : "dragover-err";
	};*/
}]);