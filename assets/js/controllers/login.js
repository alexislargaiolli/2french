'use strict';

/**
 * @ngdoc function
 * @name tooFrenchApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the tooFrenchApp
 */
var tooFrenchControllers = angular.module('tooFrenchApp');
tooFrenchControllers.controller('LoginCtrl', ['$scope', '$state', 'AuthService', function ($scope, $state, AuthService) {
    $scope.credential = {};
    $scope.message;

    $scope.login = function () {
        AuthService.login($scope.credential).then(function (user) {//success
            $state.go('home');
        }, function (msg) { //error
            $scope.message = msg;
        });
    };

    $scope.logout = function () {
        AuthService.logout().then(function () {
            $state.go('home');
        });
    }

    $scope.forgotten = {};
    $scope.forgottenPasswordSuccess = -1;
    $scope.forgottenPasswordMessage;

    $scope.forgottenPassword = function () {
        AuthService.forgot($scope.forgotten.password).then(function (msg) {
            $scope.forgottenPasswordMessage = msg;
            $scope.forgottenPasswordSuccess = 1;
        }, function (msg) {
            $scope.forgottenPasswordMessage = msg;
            $scope.forgottenPasswordSuccess = -1;
        });
    }

}]);
