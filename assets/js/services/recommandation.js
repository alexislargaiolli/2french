var tooFrenchServices = angular.module('tooFrenchService');
tooFrenchServices.factory('Recommandation', ['$resource',
	function($resource){
   		return $resource('/recommandation/:id', {id:'@id'},  { 'update': {method: 'PUT'} });
    }
]);