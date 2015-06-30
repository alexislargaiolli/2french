var tooFrenchServices = angular.module('tooFrenchService');
tooFrenchServices.factory('UtilLink', ['$resource',
	function($resource){
   		return $resource('/utilLink/:id', {id:'@id'},  { 'update': {method: 'PUT'} });
    }
]);