var tooFrenchServices = angular.module('tooFrenchService');
tooFrenchServices.factory('Reservation', ['$resource', '$http', '$q', 'Session',
	function($resource, $http, $q, Session){
		return {
            getResource: function () {
                return $resource('/reservation/:id', {id: '@id'}, {'update': {method: 'PUT'}, });
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
            notifCount : function(){
                var deferred = $q.defer();
                $http.get('/reservation/notifCount').success(function (data, status, headers, config) {
                    deferred.resolve(data.count);
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
            },
            cancelReservation : function(resaId){
                var deferred = $q.defer();
                $http.get('/reservation/cancelReservation', {params : {resaId : resaId}}).success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.reject();
                });
                return deferred.promise;
            },
            addReview : function(resaId, mark, comment){
                var deferred = $q.defer();
                $http.get('/reservation/addReview', {params : {resaId : resaId, mark : mark, comment: comment}}).success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.reject();
                });
                return deferred.promise;
            }
        }
    }
]);