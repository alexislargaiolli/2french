var tooFrenchServices = angular.module('tooFrenchApp');
tooFrenchServices.factory('Profile', ['$resource',
	function($resource){
   		return $resource('/profile/:id', {id:'@id'},  { 'update': {method: 'PUT'}, 'validateProfile' : {method: 'GET', url : '/profile/validateProfile/:id'}});
    }
]);