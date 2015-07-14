var tooFrenchControllers = angular.module('tooFrenchCtrl');
tooFrenchControllers.controller('SearchCtrl', ['$scope', '$stateParams', '$state', 'Profile', '$http', '$timeout', 'UserFavList', 'Session',

    function ($scope, $stateParams, $state, Profile, $http, $timeout, UserFavList, Session) {
        $scope.results = [];
        $scope.recommandations = [];
        $scope.utillinks = [];
        $scope.city = $stateParams.city;
        $scope.days = $stateParams.days;
        $scope.periods = $stateParams.periods;
        $scope.messageContent;
        $scope.userToContact;
        $scope.pageSize = 10;
        $scope.pageIndex = 1;
        $scope.count = 0;
        $scope.loading = true;;

        $scope.search = function () {
            $scope.loading = true;
            $http.get('/profile/findByCity', {
                params: {
                    count: 1,
                    city: $scope.city,
                    days: $scope.days,
                    periods: $scope.periods,
                    pageSize : $scope.pageSize,
                    pageIndex :$scope.pageIndex
                }
            }).
                success(function (count, status, headers, config) {
                    $scope.count = count.count;
                    $http.get('/profile/findByCity', {
                        params: {
                            count: 0,
                            city: $scope.city,
                            days: $scope.days,
                            periods: $scope.periods,
                            pageSize : $scope.pageSize,
                            pageIndex :$scope.pageIndex
                        }
                    }).success(function (profiles) {
                        $scope.loading = false;
                        $scope.results = profiles;
                    }).error(function(data, status, headers, config){

                    });
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

        $scope.pageChanged = function () {
            $scope.loading = true;
            $http.get('/profile/findByCity', {
                params: {
                    count: 0,
                    city: $scope.city,
                    days: $scope.days,
                    periods: $scope.periods,
                    pageSize : $scope.pageSize,
                    pageIndex :$scope.pageIndex
                }
            }).success(function (profiles) {
                $scope.loading = false;
                $scope.results = profiles;
            }).error(function(data, status, headers, config){

            });
        }


    }
]);