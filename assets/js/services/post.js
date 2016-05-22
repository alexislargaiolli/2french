var tooFrenchServices = angular.module('tooFrenchApp');
tooFrenchServices.factory('Post', ['$resource', '$http', '$q',
    function ($resource, $http, $q) {
        return {
            getResource: function () {
                return $resource('/post/:id', {id: '@id'}, {'update': {method: 'PUT'}});
            },
            getCommentResource: function () {
                return $resource('/comment/:id', {id: '@id'}, {'update': {method: 'PUT'}});
            },
            getComments : function(postId, count, pageSize, pageIndex){
                var deferred = $q.defer();
                $http.get('/comment/postComments', {params: {postId: postId, count : count, pageSize : pageSize, pageIndex : pageIndex}}).success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.reject();
                });
                return deferred.promise;
            },
            findOne: function (id) {
                var deferred = $q.defer();
                $http.get('/post/findone', {params: {id: id}}).success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.reject();
                });
                return deferred.promise;
            },
            getTeacherPost: function () {
                var deferred = $q.defer();
                $http.get('/post/teacherPosts').success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.reject();
                });
                return deferred.promise;
            },
            getGeneralPost: function () {
                var deferred = $q.defer();
                $http.get('/post/generalPosts').success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.reject();
                });
                return deferred.promise;
            },
            getRecentPost: function () {
                var deferred = $q.defer();
                $http.get('/post/recentPosts').success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.reject();
                });
                return deferred.promise;
            },
            getPopularPost: function () {
                var deferred = $q.defer();
                $http.get('/post/popularPosts').success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.reject();
                });
                return deferred.promise;
            },
            getPopularFilePost: function () {
                var deferred = $q.defer();
                $http.get('/post/popularFilePosts').success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.reject();
                });
                return deferred.promise;
            },
            getPostGeneralByCategory: function (categoryId, title, count, pageSize, pageIndex) {
                var deferred = $q.defer();
                $http.get('/post/postGeneralByCategory', {params: {categoryId: categoryId, title : title, count : count, pageSize : pageSize, pageIndex : pageIndex}}).success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.reject();
                });
                return deferred.promise;
            },
            getPostTeacherByCategory: function (categoryId, title, count, pageSize, pageIndex) {
                var deferred = $q.defer();
                $http.get('/post/postTeacherByCategory', {params: {categoryId: categoryId, title : title, count : count, pageSize : pageSize, pageIndex : pageIndex}}).success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.reject();
                });
                return deferred.promise;
            }
        }
    }
]);