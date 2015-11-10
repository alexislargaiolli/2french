var tooFrenchServices = angular.module('tooFrenchApp');
tooFrenchServices.factory('Equipment', ['$resource',
	function($resource){
   		return $resource('/equipment/:id', {id:'@id'},  { 'update': {method: 'PUT'} }); 
    }
]);