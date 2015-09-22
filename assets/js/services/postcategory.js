var tooFrenchServices = angular.module('tooFrenchService');
tooFrenchServices.factory('PostCategory', ['$resource', '$http', '$q',
    function ($resource, $http, $q) {
        return $resource('/postcategory/:id', {id: '@id'}, {'update': {method: 'PUT'}});
    }
]);