var tooFrenchControllers = angular.module('tooFrenchCtrl');
tooFrenchControllers.controller('UploaderCtrl', ['$scope', function($scope) {
	
	$scope.url;

	$scope.onUpload = function(){
		console.log($scope.url);
	}

}]);