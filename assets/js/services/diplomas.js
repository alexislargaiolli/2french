var tooFrenchServices = angular.module('tooFrenchApp');
tooFrenchServices.factory('Diploma', ['$resource', '$http', '$q',
    function ($resource, $http, $q) {
        return {
            getResource: function () {
                return $resource('/diploma/:id', {id: '@id'}, {'update': {method: 'PUT'}});
            },
            /**
             * Retrieve diplomas list with user name
             * @returns {*}
             */
            getWithProfile: function () {
                var deferred = $q.defer();
                $http.get('/diploma/adminFind').success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.reject();
                });
                return deferred.promise;
            },
            /**
             * Set a given diploma as validated
             * @param diplomaId id of the diploma
             * @returns {*}
             */
            validate: function (diplomaId) {
                var deferred = $q.defer();
                $http.get('/diploma/validate', {params : {diplomadId: diplomaId}}).success(function (data, status, headers, config) {
                    $http.get('/profile/validateProfileByUser', {params : {userToValidateId: data.owner.id}});
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.reject();
                });
                return deferred.promise;
            }
        };
    }
]);