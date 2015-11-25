var tooFrenchControllers = angular.module('tooFrenchApp');
tooFrenchControllers.controller('FavListCtrl', ['$rootScope', '$scope', 'UserFavList',

    function ($rootScope, $scope, UserFavList) {

        $scope.loginRequest.promise.then(function () {

            UserFavList.isReady().then(function(){
                $scope.favlist = UserFavList.getFavList();
            });

            $scope.removeTeacher = function (profileId) {
                UserFavList.removeTeacher(profileId).then(function(){
                    $scope.favlist = UserFavList.getFavList();
                });
            }
        });

    }
]);