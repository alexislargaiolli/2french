/**
 * Created by alex on 15/11/15.
 */
var tooFrenchServices = angular.module('tooFrenchApp');
tooFrenchServices.factory('Notification', ['$resource', '$http', '$rootScope', 'Session', '$timeout', '$interval',
    function ($resource, $http, $rootScope, Session, $timeout, $interval) {
        return {
            getResource: function () {
                return $resource('/notification/:id', {id: '@id'}, {
                    'update': {method: 'PUT'},
                    'unseen': {method: 'GET', url: '/notification/unseen', isArray : true},
                    'unseenCount':{method: 'GET', url: '/notification/unseenCount'},
                    'setAsSeen':{method: 'GET', url: '/notification/setAsSeen/:id'}
                });
            }
        }
    }
]);