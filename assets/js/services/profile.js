var tooFrenchServices = angular.module('tooFrenchApp');
tooFrenchServices.factory('Profile', ['$resource',
    function ($resource) {
        return $resource('/profile/:id', {id: '@id'}, {
            'update': {method: 'PUT'},
            'count': {url: '/profile/count', method: 'GET', params : {where : '@where'}},
            'validateProfile': {method: 'GET', url: '/profile/validateProfile/:id'},
            'fullProfile': {method: 'GET', url: '/profile/fullProfile/:id'}
        });
    }
]);