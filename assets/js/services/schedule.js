var tooFrenchServices = angular.module('tooFrenchApp');
tooFrenchServices.factory('Schedule', ['$resource', '$http', '$q',
    function ($resource, $http, $q) {
        return {
            getResource: function () {
                return $resource('/schedule/:id', {id: '@id'}, {'update': {method: 'PUT'}});
            },
            getSchedule: function (profileId, period) {
                var deferred = $q.defer();
                var Schedule = this.getResource();
                Schedule.query({profile: profileId, period: period}, function (schedules) {
                    if (schedules && schedules.length > 0) {
                        deferred.resolve(schedules[0]);
                    }
                    else {
                        deferred.resolve(new Schedule({profile: profileId, period: period, daysoff: [], undispos: []}));
                    }
                });
                return deferred.promise;
            }
        };
    }
]);