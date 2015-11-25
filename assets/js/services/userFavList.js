var tooFrenchServices = angular.module('tooFrenchApp');
tooFrenchServices.factory('UserFavList', ['$resource', '$http', '$q', 'Session',
    function ($resource, $http, $q, Session) {
        var list = [];
        var ids = [];
        var request = null;

        function setList(data) {
            list = data;
            ids = [];
            list.forEach(function (p, i) {
                ids[p.id] = 1;
            });
        }

        return {
            list: null,
            getResource: function () {
                return $resource('/userfavlist/:id', {id: '@id'}, {'update': {method: 'PUT'}});
            },
            getList: function () {
                return this.list;
            },
            setList: function (list) {
                this.list = list;
                console.log(list);
            },
            initialize: function () {
                request = $q.defer();
                $http.get('/userFavList/userList').success(function (data) {
                    setList(data);
                    request.resolve(data);
                }).error(function (data) {
                    request.resolve([]);
                });
                return request.promise;
            },
            isReady: function () {
                return request.promise;
            },
            getFavList: function () {
                return list;
            },
            addFavorit: function (profileId) {
                if (ids[profileId] != 1) {
                    var deferred = $q.defer();
                    $http.post('/userFavList/addToList', {profileId: profileId}).success(function (data) {
                        setList(data);
                        deferred.resolve(data);
                    }).error(function (data) {
                        deferred.resolve([]);
                    });
                    return deferred.promise;
                }
            },
            isInFav: function (profileId) {
                return ids[profileId] == 1;
            },
            removeTeacher: function (profileId) {
                var deferred = $q.defer();
                $http.post('/userFavList/removeFromList', {profileId: profileId}).success(function (data) {
                    setList(data);
                    deferred.resolve(data);
                }).error(function (data) {
                    deferred.resolve([]);
                });
                return deferred.promise;
            },
            destroy: function () {
                this.list = null;
                this.ids = null;
                this.request = null;
            }
        }
    }
]);