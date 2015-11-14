'use strict';

/**
 * @ngdoc function
 * @name tooFrenchApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the tooFrenchApp
 */
var tooFrenchControllers = angular.module('tooFrenchApp');
tooFrenchControllers.controller('ResetPasswordCtrl', ['$scope', 'AuthService', '$stateParams', '$translate', function ($scope, AuthService, $stateParams, $translate) {

    $scope.token = $stateParams.token;

    if ($scope.token) {
        $scope.success = -1;
        $scope.message;
        $scope.password = {};
        $scope.ajax = true;
        AuthService.checkToken($scope.token).then(function () {
            $scope.ajax = false;
        }, function (msg) {
            $scope.success = -1;
            $scope.message = msg;
            $scope.ajax = false;
        });

        $scope.resetPassword = function () {
            if (!$scope.ajax) {
                $scope.success = -1;
                if ($scope.password.password != $scope.password.confirm) {
                    $scope.message = $translate.instant('reset.password.password.not.match');
                }
                else {
                    $scope.ajax = true;
                    AuthService.resetPassword($scope.token, $scope.password.password, $scope.password.confirm).then(function (msg) {
                        $scope.success = 1;
                        $scope.message = msg;
                        $scope.ajax = false;
                    }, function (msg) {
                        $scope.success = -1;
                        $scope.message = msg;
                        $scope.ajax = false;
                    });
                }
            }
        }
    }
    else {
        $scope.success = -1;
        $scope.message = $translate.instant('reset.password.notoken');
    }

}]);
