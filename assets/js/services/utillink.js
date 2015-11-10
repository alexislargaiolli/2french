var tooFrenchServices = angular.module('tooFrenchApp');
tooFrenchServices.factory('UtilLink', ['$resource',
	function($resource){
   		return $resource('/utilLink/:id', {id:'@id'},  { 'update': {method: 'PUT'} });
    }
]);