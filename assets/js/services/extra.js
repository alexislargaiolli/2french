var tooFrenchServices = angular.module('tooFrenchApp');
tooFrenchServices.factory('Extra', ['$resource',
	function($resource){
   		return $resource('/extra/:id', {id:'@id'},  { 'update': {method: 'PUT'} }); 
    }
]);