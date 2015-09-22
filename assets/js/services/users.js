var tooFrenchServices = angular.module('tooFrenchService');
tooFrenchServices.factory('User', ['$resource',
	function($resource){
   		return $resource('/user/:id', {id:'@id'},  { 'update': {method: 'PUT'} }); 
    }
]);