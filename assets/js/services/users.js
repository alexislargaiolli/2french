var tooFrenchServices = angular.module('tooFrenchApp');
tooFrenchServices.factory('User', ['$resource',
    function ($resource) {
        return $resource('/user/:id', {id: '@id'}, {
            'update': {method: 'PUT'},
            'count': {url: '/user/count', method: 'GET', params : {where : '@where'}}
        });
    }
]);