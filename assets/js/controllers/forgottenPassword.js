'use strict';

/**
 * @ngdoc function
 * @name tooFrenchApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the tooFrenchApp
 */
var tooFrenchControllers = angular.module('tooFrenchApp');
tooFrenchControllers.controller('ForgottenPasswordCtrl', ['$scope', 'AuthService', function ($scope, AuthService) {

    $scope.forgotten = {};
    $scope.success = -1;
    $scope.message;
    $scope.ajax = false;

    $scope.forgottenPassword = function () {
        if (!$scope.ajax) {
            $scope.ajax = true;
            AuthService.forgot($scope.forgotten.password).then(function (msg) {
                $scope.message = msg;
                $scope.success = 1;
                $scope.ajax = false;
            }, function (msg) {
                $scope.message = msg;
                $scope.success = -1;
                $scope.ajax = false;
            });
        }
    }

}]);
