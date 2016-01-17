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
                });
            },
            getResaCount: function () {
                if (this.notifications['resa']) {
                    return this.notifications['resa'].length;
                }
                return 0;
            },
            getMessageCount: function () {
                if (this.notifications['message']) {
                    return this.notifications['message'].length;
                }
                return 0;
            },
            setResaNotification: function (notifs) {
                this.notifications['resa'] = notifs;
            },
            setMessageNotification: function (notifs) {
                this.notifications['message'] = notifs;
            },
            getConversationNoificationCount: function (convId) {
                var count = 0;
                for (var i = 0; i < this.notifications['message'].length; i++) {
                    if (this.notifications['message'][i].conversation == convId) {
                        count++;
                    }
                }
                return count;
            }
        }
    }
]);