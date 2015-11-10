var tooFrenchServices = angular.module('tooFrenchApp');
tooFrenchServices.factory('Messagerie', ['$resource', '$http', '$q', 'MESSAGE_EVENTS', '$rootScope',
    function ($resource, $http, $q, MESSAGE_EVENTS, $rootScope) {
        return {
            getResource: function () {
                return $resource('/formationlevel/:id', {id: '@id'}, {'update': {method: 'PUT'}});
            },
            getUnseenMsgCount: function () {
                var deferred = $q.defer();
                $http.get('/conversation/totalUnseenMessageCount').success(function (data, status, headers, config) {
                    deferred.resolve(data.unseenCount);
                }).error(function (data, status, headers, config) {
                    deferred.reject(0);
                });
                return deferred.promise;
            },
            getUserConversations: function () {
                var deferred = $q.defer();
                $http.get('/conversation/allUserConversations').success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.reject();
                });
                return deferred.promise;
            },
            getConversation: function (convId) {
                var deferred = $q.defer();
                $http.get('/conversation/userConversation', {params: {conversationId: convId}}).success(function (data, status, headers, config) {
                    var previousCount = data.unseenCount;
                    data.unseenCount = 0;
                    $http.get('/conversation/setAsRead', {params: {conversationId: convId}}).success(function(){
                        $rootScope.$broadcast(MESSAGE_EVENTS.read, {
                            count: previousCount
                        });
                    });
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.reject();
                });
                return deferred.promise;
            },
            sendMessage: function (senderId, recipientId, messageContent) {
                var deferred = $q.defer();
                $http.post('/conversation/sendMessage', {
                    senderId: senderId,
                    recipientId: recipientId,
                    message: messageContent
                }).success(function (data, status, headers, config) {
                        deferred.resolve(data);
                    }).error(function (data, status, headers, config) {
                        deferred.reject();
                    });
                return deferred.promise;
            }
        }
    }
]);