var tooFrenchServices = angular.module('tooFrenchService');
tooFrenchServices.factory('Reservation', ['$resource', '$http', '$q', 'Session',
	function($resource, $http, $q, Session){
		return {
            getResource: function () {
                return $resource('/reservation/:id', {id: '@id'}, {'update': {method: 'PUT'}});
            },
            teacherResa : function(){
                var deferred = $q.defer();
                $http.get('/reservation/teacherResa').success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.reject();
                });
                return deferred.promise;
            },
            studentResa : function(){
                var deferred = $q.defer();
                $http.get('/reservation/studentResa').success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.reject();
                });
                return deferred.promise;
            },
            newTeacherResaCount : function(){
                var deferred = $q.defer();
                $http.get('/reservation/newTeacherResaCount').success(function (data, status, headers, config) {
                    deferred.resolve(data.count);
                }).error(function (data, status, headers, config) {
                    deferred.reject();
                });
                return deferred.promise;
            },
            teacherChangeStatus : function(resaId, status){
                var deferred = $q.defer();
                $http.get('/reservation/teacherChangeStatus', {params : {resaId : resaId, status : status}}).success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.reject();
                });
                return deferred.promise;
            }
        }
    }
]);