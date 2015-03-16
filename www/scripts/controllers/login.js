'use strict';

/**
 * @ngdoc function
 * @name tooFrenchApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the tooFrenchApp
 */
var tooFrenchControllers = angular.module('tooFrenchApp');
tooFrenchControllers.controller('LoginCtrl', ['$scope', '$state', 'AuthService', function($scope, $state, authService){
	$scope.credential = {};
	$scope.message;

	$scope.login = function(){
		authService.login($scope.credential).then(function(user){//success
			$scope.setCurrentUser(user);
			$state.go('home');
		},function(msg){ //error			
			$scope.message = msg;
		});
	};

}]);
