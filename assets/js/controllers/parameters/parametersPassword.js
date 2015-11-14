/**
 * Created by alex on 11/11/15.
 */
var tooFrenchControllers = angular.module('tooFrenchApp');
tooFrenchControllers.controller('ParametersPasswordCtrl', ['$scope', 'Session', '$translate', '$http',

    function ($scope, Session, $translate, $http) {
        $scope.cred = {};
        $scope.message;
        $scope.success = -1;

        $scope.changePassword = function () {
            console.log($scope.cred.password);
            console.log($scope.cred.confirmPassword);
            if ($scope.cred.password !== $scope.cred.confirmPassword) {
                $scope.message = $translate.instant('parameters.password.dont.match');
            }
            else {
                $http.post('/user/changePassword', {
                    old: $scope.cred.previousPassword,
                    new: $scope.cred.password
                }).success(function (data, status, headers, config) {
                    $scope.success = 1;
                    $scope.message = data;
                }).error(function (data, status, headers, config) {
                    $scope.success = -1;
                    $scope.message = data;
                });
            }
        }
    }
]);
