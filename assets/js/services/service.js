var tooFrenchServices = angular.module('tooFrenchService');
tooFrenchServices.factory('Service', ['$resource',
	function($resource){
   		return $resource('/service/:id', {id:'@id'},  { 'update': {method: 'PUT'} }); 
    }
]);