var tooFrenchServices = angular.module('tooFrenchService');
tooFrenchServices.factory('Review', ['$resource', '$http', '$q',
    function ($resource, $http, $q) {
        return {
            getResource: function () {
                return $resource('/review/:id', {id: '@id'}, {
                    'update': {method: 'PUT'}
                });
            },
            getTeacherReviews: function (teacherId) {
                var deferred = $q.defer();
                $http.get('/review/teacherReviews', {params: {teacherId: teacherId}}).success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.reject();
                });
                return deferred.promise;
            }
        }
    }
]);