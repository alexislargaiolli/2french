var tooFrenchControllers = angular.module('tooFrenchApp');
tooFrenchControllers.controller('ProfileCtrl', ['$scope', '$stateParams', function($scope, $stateParams){
	
	$scope.profile = {photo:'', motivation:'', hourRate : 50, '', accommodation :  {}, formula : {}};

	$scope.update(){
		
	}

	$scope.save(){

	}

}]);
