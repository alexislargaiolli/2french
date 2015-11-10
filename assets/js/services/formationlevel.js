var tooFrenchServices = angular.module('tooFrenchApp');
tooFrenchServices.factory('FormationLevel', ['$resource',
	function($resource){
   		return $resource('/formationlevel/:id', {id:'@id'},  { 'update': {method: 'PUT'} }); 
    }
]);