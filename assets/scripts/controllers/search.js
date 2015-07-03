var tooFrenchControllers = angular.module('tooFrenchCtrl');
tooFrenchControllers.controller('SearchCtrl', ['$scope', '$stateParams', '$state', 'Profile', '$http', '$timeout', 'UserFavList', 'Session',

    function ($scope, $stateParams, $state, Profile, $http, $timeout, UserFavList, Session) {
        $scope.results = [];
        $scope.recommandations = [];
        $scope.utillinks = [];
        $scope.city = $stateParams.city;
        $scope.days = $stateParams.days;
        $scope.messageContent;
        $scope.userToContact;

        $scope.search = function () {
            console.log($scope.days);
            $http.get('/profile/findByCity', {params: {city: $scope.city, days: $scope.days}}).
                success(function (profiles, status, headers, config) {
                    $scope.results = profiles;
                    /*angular.forEach(profiles, function(profile, key) {
                     $scope.results.push(profile);
                     });*/
                }).
                error(function (data, status, headers, config) {

                });
            $http.get('/recommandation/findByCity', {params: {city: $scope.city}}).
                success(function (recommandations, status, headers, config) {
                    angular.forEach(recommandations, function (recommandation, key) {
                        $scope.recommandations.push(recommandation);
                    });
                }).
                error(function (data, status, headers, config) {

                });
            $http.get('/utilLink/findByCity', {params: {city: $scope.city}}).
                success(function (utillinks, status, headers, config) {
                    angular.forEach(utillinks, function (utillink, key) {
                        $scope.utillinks.push(utillink);
                    });
                }).
                error(function (data, status, headers, config) {

                });
        }
        $scope.search();

        $scope.setUserToContact = function (u) {
            $scope.userToContact = u;
        }

        if ($scope.isConnected) {

            $scope.favlist = [];

            $scope.userFavList = null;

            UserFavList.getFavList().then(function (favlist) {
                $scope.userFavList = favlist;
            });

            var saveFavList = function (cb) {
                if ($scope.userFavList.id) {
                    $scope.userFavList.$update(function (f) {
                        $scope.userFavList = f;
                        cb();
                    });
                }
                else {
                    $scope.userFavList.$save(function (f) {
                        $scope.userFavList = f;
                        cb();
                    });
                }
            }

            UserFavList.getFavList().then(function (favlist) {
                $scope.favlist = [];
                if (favlist && favlist.favorits && favlist.favorits.length > 0) {
                    favlist.favorits.forEach(function (fav, index) {
                        $scope.favlist[index] = fav.id;
                    });
                }
            });

            $scope.addFavorit = function (profileId) {
                var index = $scope.favlist.indexOf(profileId);
                if (index == -1) {
                    $scope.userFavList.favorits.push(profileId);
                    saveFavList(function () {
                        $scope.favlist.push(profileId);
                    });
                }
                else {
                    $scope.userFavList.favorits.splice(index, 1);
                    saveFavList(function () {
                        $scope.favlist.splice(index, 1);
                    });
                }
            }
        }

    }
]);