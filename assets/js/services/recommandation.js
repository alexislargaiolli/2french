var tooFrenchServices = angular.module('tooFrenchApp');
tooFrenchServices.factory('Recommandation', ['$resource',
	function($resource){
   		return $resource('/recommandation/:id', {id:'@id'},  { 'update': {method: 'PUT'} });
    }
]);