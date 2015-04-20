var tooFrenchServices = angular.module('tooFrenchService');
tooFrenchServices.factory('Formation', ['$resource',
	function($resource){
   		return $resource('/formation/:id', {id:'@id'},  { 'update': {method: 'PUT'} }); 
    }
]);