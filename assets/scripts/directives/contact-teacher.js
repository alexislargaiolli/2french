'use strict';
/**
 * @ngdoc function
 * @name tooFrenchApp.directive:LoginDirective
 * @description
 * # LoginDirective
 * Directive of the tooFrenchApp for login html component
 */
var tooFrench = angular.module('tooFrenchApp');
tooFrench.directive('contactTeacher', function() {
	return {
		restrict: 'E',
		templateUrl: 'scripts/directives/contact-teacher.html',
		scope: {
			text: '@',
			icon: '@',
			uploadUrl: '@url',
			onUploadFinished: '&'
		},
		controller: ['$scope', function($scope) {
			$scope.myImage = '';
			$scope.myCroppedImage = '';
			$scope.uploadable = 0;
			$scope.uploading = 0;
			$scope.progress = 0;
			$scope.progressBarType = '';
			$scope.alerts = [];

			var handleFileSelect = function(evt) {
				$scope.file = evt.currentTarget.files[0];
				var reader = new FileReader();
				reader.onload = function(evt) {
					$scope.$apply(function($scope) {
						$scope.myImage = evt.target.result;
						$scope.uploadable = 1;
						$scope.progressBarType = '';
						$scope.uploading = 0;
						$scope.alerts = [];
					});
				};
				reader.readAsDataURL($scope.file);
			};


			$timeout(function() {
				var inputId = '#fileInput' + $scope.$id;
				var elts = angular.element(inputId);
				elts.on('change', handleFileSelect);
			}, 500);

			//elts.on('change', handleFileSelect);
			$scope.upload = function() {
				if ($scope.myCroppedImage) {
					var blobBin = atob($scope.myCroppedImage.split(',')[1]);
					var array = [];
					for (var i = 0; i < blobBin.length; i++) {
						array.push(blobBin.charCodeAt(i));
					}
					var file = new Blob([new Uint8Array(array)], {
						type: 'image/png'
					});
					file.name = $scope.file.name;
					$scope.uploading = 1;
					$upload.upload({
						url: $scope.uploadUrl,
						file: file
					}).progress(function(evt) {
						$scope.progress = Math.round((evt.loaded * 100.0) / evt.total);
					}).success(function(data, status, headers, config) {
						$scope.progressBarType = '';
						$scope.alerts.push({
							type: 'success',
							msg: data.message
						});
						$timeout(function() {
							$scope.onUploadFinished({
								url: data.url
							});
						}, 2000);
					}).error(function(data, status, headers, config) {
						$scope.progressBarType = 'danger';
						$scope.alerts.push({
							type: 'danger',
							msg: data.message
						});
					});
				}
			};

			$scope.closeAlert = function(index) {
				$scope.alerts.splice(index, 1);
			};
		}]
	};
});