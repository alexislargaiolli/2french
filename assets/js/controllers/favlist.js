var tooFrenchControllers = angular.module('tooFrenchCtrl');
tooFrenchControllers.controller('FavListCtrl', ['$rootScope', '$scope', 'UserFavList',

    function ($rootScope, $scope, UserFavList) {

        if ($rootScope.session.authenticated) {

            $scope.favlist = [];

            $scope.userFavList = null;

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
                $scope.userFavList = favlist;
                console.log(favlist);
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

            $scope.removeTeacher = function (profileId) {
                var index = $scope.favlist.indexOf(profileId);
                if(index > -1){
                    $scope.userFavList.favorits.splice(index, 1);
                }
                saveFavList(function(){

                });
            }
        }

    }
]);