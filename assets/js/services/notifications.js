/**
 * Created by alex on 15/11/15.
 */
var tooFrenchServices = angular.module('tooFrenchApp');
tooFrenchServices.factory('Notification', ['$resource', '$http', '$rootScope', 'Session', '$timeout', 'NOTIFICATION_EVENTS',
    function ($resource, $http, $rootScope, Session, $timeout, NOTIFICATION_EVENTS) {
        return {
            notifications: new Array(),
            init: function () {
                $rootScope.notification = this;
                this.notifications = [];
                this.notifications['resa'] = [];
                this.notifications['message'] = [];
                $rootScope.notificationResaCount = 0;
                $rootScope.notificationMessageCount = 0;
                this.update();
            },
            getResource: function () {
                return $resource('/notification/:id', {id: '@id'}, {'update': {method: 'PUT'}});
            },
            update: function () {
                if (Session.authenticated) {
                    $http.get('/notification/unseen', {params: {type: 'resa'}}).success(function (data, status, headers, config) {
                        $rootScope.notification.setResaNotification(data);
                        $rootScope.notificationResaCount = data.length;
                        $rootScope.$broadcast(NOTIFICATION_EVENTS.resaUpdate, {count: data.length});
                        $timeout($rootScope.notification.update, 5000);
                    }).error(function (data, status, headers, config) {
                        if(status > 0 && status != 401) {
                            $rootScope.notification.setResaNotification([]);
                            $rootScope.notificationResaCount = 0;
                            $timeout($rootScope.notification.update, 15000);
                        }
                    });
                    $http.get('/notification/unseen', {params: {type: 'message'}}).success(function (data, status, headers, config) {
                        $rootScope.notification.setMessageNotification(data);
                        $rootScope.notificationMessageCount = data.length;
                        $rootScope.$broadcast(NOTIFICATION_EVENTS.messageUpdate, {count: data.length});
                    }).error(function (data, status, headers, config) {
                        $rootScope.notification.setMessageNotification([]);
                        $rootScope.notificationMessageCount = 0;
                    });
                }
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
            getConversationNoificationCount: function(convId){
                var count = 0;
                for(var i =0; i<this.notifications['message'].length; i++){
                    if(this.notifications['message'][i].conversation == convId){
                        count++;
                    }
                }
                return count;
            }
        }
    }
]);