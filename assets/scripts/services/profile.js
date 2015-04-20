var tooFrenchServices = angular.module('tooFrenchService');
tooFrenchServices.factory('Profile', ['$resource',
	function($resource){
   		return $resource('/profile/:id', {id:'@id'},  { 'update': {method: 'PUT'} }); 
    }
]);