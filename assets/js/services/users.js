var tooFrenchServices = angular.module('tooFrenchApp');
tooFrenchServices.factory('User', ['$resource',
	function($resource){
   		return $resource('/user/:id', {id:'@id'},  { 'update': {method: 'PUT'} }); 
    }
]);