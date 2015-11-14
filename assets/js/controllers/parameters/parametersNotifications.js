/**
 * Created by alex on 11/11/15.
 */
var tooFrenchControllers = angular.module('tooFrenchApp');
tooFrenchControllers.controller('ParametersNotificationsCtrl', ['$scope', 'NotificationSettings', 'Session', '$http',

    function ($scope, NotificationSettings, Session, $http) {
        $scope.settings;
        $http.get('/user/notificationSettings').success(function (data, status, headers, config) {
            $scope.settings = data;
        }).error(function (data, status, headers, config) {
            $scope.settings = null;
        });

        $scope.save = function(){
            $http.post('/user/updateNotificationSettings', {
                settings: $scope.settings
            }).success(function (data, status, headers, config) {
            }).error(function (data, status, headers, config) {

            });
        }
    }
]);
