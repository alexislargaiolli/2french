var tooFrenchServices = angular.module('tooFrenchService');
tooFrenchServices.factory('Extra', ['$resource',
	function($resource){
   		return $resource('/extra/:id', {id:'@id'},  { 'update': {method: 'PUT'} }); 
    }
]);