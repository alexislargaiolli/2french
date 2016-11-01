var tooFrenchServices = angular.module('tooFrenchApp');
tooFrenchServices.factory('Reservation', ['$resource', '$http', '$q', 'Session',
    function($resource, $http, $q, Session) {
        var resource = $resource('/reservation/:id', { id: '@id' }, { 'update': { method: 'PUT' }, 'count': { url: '/reservation/count', method: 'GET', params: { where: '@where' } } });
        return {
            getResource: function() {
                return resource;
            },
            teacherResa: function(history) {
                var deferred = $q.defer();
                var params = { history: history };
                if (history) {
                    params.history = true;
                }
                $http.get('/reservation/teacherResa', { params: params }).success(function(data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function(data, status, headers, config) {
                    deferred.reject();
                });
                return deferred.promise;
            },
            studentResa: function(history) {
                var deferred = $q.defer();
                var params = { history: history };
                if (history) {
                    params.history = true;
                }
                $http.get('/reservation/studentResa', { params: params }).success(function(data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function(data, status, headers, config) {
                    deferred.reject();
                });
                return deferred.promise;
            },
            notifCount: function() {
                var deferred = $q.defer();
                $http.get('/reservation/notifCount').success(function(data, status, headers, config) {
                    deferred.resolve(data.count);
                }).error(function(data, status, headers, config) {
                    deferred.reject();
                });
                return deferred.promise;
            },
            teacherChangeStatus: function(resaId, status) {
                var deferred = $q.defer();
                $http.get('/reservation/teacherChangeStatus', { params: { resaId: resaId, status: status } }).success(function(data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function(data, status, headers, config) {
                    deferred.reject();
                });
                return deferred.promise;
            },
            cancelReservation: function(resaId) {
                var deferred = $q.defer();
                $http.get('/reservation/cancelReservation', { params: { resaId: resaId } }).success(function(data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function(data, status, headers, config) {
                    deferred.reject();
                });
                return deferred.promise;
            },
            addReview: function(resaId, mark, comment) {
                var deferred = $q.defer();
                $http.get('/reservation/addReview', { params: { resaId: resaId, mark: mark, comment: comment } }).success(function(data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function(data, status, headers, config) {
                    deferred.reject();
                });
                return deferred.promise;
            },
            findBetween: function(from, to) {
                var deferred = $q.defer();

                var params = {
                    where: {
                        date: {
                            '<': to.toISOString(),
                            '>': from.toISOString(),
                        }
                    }
                };
                $http.get('/reservation/find', { params: params }).success(function(data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function(data, status, headers, config) {
                    deferred.reject();
                });
                return deferred.promise;
            },
            countBetween: function(query) {
                var datas = [];
                var requestCount = 0;
                var deferred = $q.defer();                
                angular.forEach(query.intervals, function(interval, index) {
                    var where = { date: { '>': interval.from.toDate(), '<': interval.to.toDate() } };
                    if(query.status){
                        where.status = query.status;
                    }
                    resource.count({ where:  where}, function(reservations) {
                        datas[index] = reservations.count;
                        requestCount++;
                        if (requestCount == 12) {
                            deferred.resolve(datas);
                        }
                    });
                });
                return deferred.promise;
            }
        }
    }
]);
