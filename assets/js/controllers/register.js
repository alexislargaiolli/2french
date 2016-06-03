'use strict';

/**
 * @ngdoc function
 * @name tooFrenchApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the tooFrenchApp
 */
var tooFrenchControllers = angular.module('tooFrenchApp');
tooFrenchControllers.controller('RegisterCtrl', ['$scope', '$state', 'AuthService',
	function($scope, $state, authService) {
		$scope.registerType = 2;
		$scope.user = {};
		$scope.emailConfirmation;
		$scope.message = null;

		$scope.optionsLocation = {
			types: ['(cities)']
		};

		$scope.setStudent = function() {
			$scope.registerType = 1;
		};

		$scope.setTeacher = function() {
			$scope.registerType = 2;
		};

		$scope.submit = function() {
			if ($scope.formRegister.$valid) {
				var teacher = $scope.registerType == 1 ? 1 : 0;
				authService.register($scope.user.email, $scope.user.email, $scope.user.password, teacher, $scope.user.firstname, $scope.user.city).then(function(user) {
					$state.go('home');
				}, function(message) {
					$scope.message = message;
				});
			}
		};

	}
]);

tooFrenchControllers.directive('match', function($parse) {
	return {
		require: 'ngModel',
		link: function(scope, elem, attrs, ctrl) {
			scope.$watch(function() {
				return $parse(attrs.match)(scope) === ctrl.$modelValue;
			}, function(currentValue) {
				ctrl.$setValidity('mismatch', currentValue);
			});
		}
	};
});

tooFrenchControllers.directive('classValid', function($parse) {
	return {
		link: function(scope, elem, attrs, ctrl) {
			scope.$watch(function() {
				var elt = $parse(attrs.classValid)(scope);
				if (elt.$pristine) {
					return 0;
				} else {
					return elt.$valid ? 1 : -1;
				}
			}, function(currentValue) {
				if (currentValue === 1) {
					elem.addClass('has-success');
					elem.removeClass('has-error');
				} else if (currentValue === -1) {
					elem.addClass('has-error');
					elem.removeClass('has-success');
				} else {
					elem.removeClass('has-success');
					elem.removeClass('has-error');
				}
			});
		}
	};
});

tooFrenchControllers.directive('iconValidation', function() {
	return {
		restrict: 'E',
		scope: {
			elt: '=elt',
		},
		templateUrl: 'partials/directives/iconValidation.html'
	};
});