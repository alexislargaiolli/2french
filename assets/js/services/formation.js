var tooFrenchServices = angular.module('tooFrenchApp');
tooFrenchServices.factory('Formation', ['$resource',
	function($resource){
   		return $resource('/formation/:id', {id:'@id'},  { 'update': {method: 'PUT'} }); 
    }
]);