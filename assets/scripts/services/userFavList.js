var tooFrenchServices = angular.module('tooFrenchService');
tooFrenchServices.factory('UserFavList', ['$resource', '$http', '$q', 'Session',
    function ($resource, $http, $q, Session) {
        return {
            list: null,
            getResource: function () {
                return $resource('/userfavlist/:id', {id: '@id'}, {'update': {method: 'PUT'}});
            },
            getFavList: function () {
                var deferred = $q.defer();
                if (!this.list) {
                    var UserFavList = this.getResource();
                    if (Session.favlistId) {
                        this.list = UserFavList.get({id: Session.favlistId}, function (favlist) {
                            deferred.resolve(this.list);
                        });
                    }
                    else {
                        this.list = new UserFavList({owner: Session.userId, favorits: []});
                        deferred.resolve(this.list);
                    }
                }
                else {
                    deferred.resolve(this.list);
                }
                return deferred.promise;
            },
            getList: function () {
                return this.list;
            },
            setList: function (list) {
                this.list = list;
            },
            addFavorit: function (profileId) {
                var deferred = $q.defer();
                var UserFavList = this.getResource();
                if (!this.list) {
                    UserFavList.getFavList().then(function () {
                        this.list.favorits.push(profileId);
                        this.saveFavList(function (err, favlist) {
                            if (err) {
                                deferred.reject(this.list);
                            }
                            else {
                                deferred.resolve(this.list);
                            }
                        });
                    });
                }
                else {
                    this.list.favorits.push(profileId);
                    this.saveFavList(function (err, favlist) {
                        if (err) {
                            deferred.reject(this.list);
                        }
                        else {
                            deferred.resolve(this.list);
                        }
                    });
                }
                return deferred.promise;
            },
            saveFavList: function (callback) {
                this.list[this.list.id ? '$update' : '$save'](function (f) {
                    this.list = f;
                    Session.favlistId = this.list.id;
                    callback(null, this.list);
                }, function () {
                    callback('Erreur lors de la sauvergarde', this.list);
                });
            },
            isInFav: function (profileId) {
                for (var i = 0; i < this.list.favorits.length; i++) {
                    if (this.list.favorits[i].id == profileId) {
                        return true;
                    }
                }
                return false;
            },
            removeTeacher: function (profileId) {
                var UserFavList = this.getResource();
                var index = -1;
                for (var i = 0; i < this.list.favorits.length; i++) {
                    if (this.list.favorits[i].id == profileId) {
                        index = i;
                    }
                }
                if (index != -1) {
                    this.list.favorits.splice(index, 1);
                    this.saveFavList(function (err, favlist) {
                        if (err) {

                        }
                        else {
                            this.list = favlist;
                        }
                    });
                }
            },
            destroy: function () {
                this.list = null;
            }
        }
    }
]);