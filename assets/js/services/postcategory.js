var tooFrenchServices = angular.module('tooFrenchApp');
tooFrenchServices.factory('PostCategory', ['$resource', '$http', '$q',
    function ($resource, $http, $q) {
        return $resource('/postcategory/:id', {id: '@id'}, {'update': {method: 'PUT'}});
    }
]);