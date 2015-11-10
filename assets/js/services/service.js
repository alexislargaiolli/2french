var tooFrenchServices = angular.module('tooFrenchApp');
tooFrenchServices.factory('Service', ['$resource',
	function($resource){
   		return $resource('/service/:id', {id:'@id'},  { 'update': {method: 'PUT'} }); 
    }
]);