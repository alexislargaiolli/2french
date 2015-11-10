var tooFrenchControllers = angular.module('tooFrenchApp');
tooFrenchControllers.controller('UploaderCtrl', ['$scope', '$timeout', function($scope, $timeout) {

	$scope.image = null;
	$scope.onUpload = function(url) {				
		$scope.image = url;		
	}
}]);