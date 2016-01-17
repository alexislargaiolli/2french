var tooFrenchServices = angular.module('tooFrenchApp');
tooFrenchServices.factory('Messagerie', ['$resource', '$http', '$q', '$rootScope',
    function ($resource, $http, $q, $rootScope) {
        return {
            getResource: function () {
                return $resource('/conversation/:id', {id: '@id'}, {
                    'update': {method: 'PUT'},
                    'getUserConversations': {method: 'GET', url: '/conversation/allUserConversations', isArray : true},
                    'getConversation': {method: 'GET', url: '/conversation/userConversation/:id'},
                    'setAsRead': {method: 'GET', url: '/conversation/setAsRead/:id'}
                });
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