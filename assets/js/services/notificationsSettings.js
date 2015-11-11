/**
 * Created by alex on 11/11/15.
 */
var tooFrenchServices = angular.module('tooFrenchApp');
tooFrenchServices.factory('NotificationSettings', ['$resource',
    function($resource){
        return $resource('/notificationSettings/:id', {id:'@id'},  { 'update': {method: 'PUT'} });
    }
]);