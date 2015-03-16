'use strict';

/**
 * @ngdoc function
 * @name tooFrenchApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the tooFrenchApp
 */
var tooFrenchControllers = angular.module('tooFrenchApp');
tooFrenchControllers.controller('RegisterCtrl', ['$scope', '$state', 'AuthService', function($scope, $state, authService){
	$scope.registerType = 0;
	$scope.user = {};
	$scope.message = null;

	$scope.setStudent = function(){
		$scope.registerType = 1;
	};

	$scope.setTeacher = function(){
		$scope.registerType = 2;	
	};

	$scope.submit = function(){
		var teacher = $scope.registerType == 1 ? 1 : 0;
		authService.register($scope.user.username, $scope.user.email, $scope.user.password, teacher).then(function(user){
			$scope.setCurrentUser(user);
			$state.go('home');
		}, function(message){
			$scope.message = message;
		});
	};

}]);
