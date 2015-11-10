var tooFrenchControllers = angular.module('tooFrenchApp');
tooFrenchControllers.controller('RecommandationCtrl', ['$scope', '$stateParams', '$state', '$http', '$timeout',

    function ($scope, $stateParams, $state, $http, $timeout) {
        $scope.recommandations = [];
        $scope.utillinks = [];
        $scope.country = $stateParams.country;
        $scope.lvl1 = $stateParams.lvl1;
        $scope.lvl2 = $stateParams.lvl2;
        $scope.city = $stateParams.city;
        $scope.recPageSize = 5;
        $scope.recPageIndex = 1;
        $scope.recCount = 0;
        $scope.recommandationLoading = true;

        $scope.linkPageSize = 5;
        $scope.linkPageIndex = 1;
        $scope.linkCount = 0;
        $scope.utillinkLoading = true;

        $scope.search = function () {
            $scope.recommandationLoading = true;
            $http.get('/recommandation/search', {
                params: {
                    count: 1,
                    country: $scope.country,
                    lvl1: $scope.lvl1,
                    lvl2: $scope.lvl2,
                    city: $scope.city,
                    pageSize: $scope.recPageSize,
                    pageIndex: $scope.recPageIndex
                }
            }).
                success(function (count, status, headers, config) {
                    $scope.recCount = count.count;
                    $http.get('/recommandation/search', {
                        params: {
                            count: 0,
                            country: $scope.country,
                            lvl1: $scope.lvl1,
                            lvl2: $scope.lvl2,
                            city: $scope.city,
                            pageSize: $scope.recPageSize,
                            pageIndex: $scope.recPageIndex
                        }
                    }).success(function (results) {
                        $scope.recommandationLoading = false;
                        $scope.recommandations = results;
                    }).error(function (data, status, headers, config) {
                        $scope.recommandationLoading = false;
                    });
                }).
                error(function (data, status, headers, config) {
                    $scope.recommandationLoading = false;
                });

            $scope.utillinkLoading = true;
            $http.get('/utilLink/search', {
                params: {
                    count: 1,
                    country: $scope.country,
                    lvl1: $scope.lvl1,
                    lvl2: $scope.lvl2,
                    city: $scope.city,
                    pageSize: $scope.linkPageSize,
                    pageIndex: $scope.linkPageIndex
                }
            }).
                success(function (count, status, headers, config) {
                    $scope.linkCount = count.count;
                    $http.get('/utilLink/search', {
                        params: {
                            count: 0,
                            country: $scope.country,
                            lvl1: $scope.lvl1,
                            lvl2: $scope.lvl2,
                            city: $scope.city,
                            pageSize: $scope.linkPageSize,
                            pageIndex: $scope.linkPageIndex
                        }
                    }).success(function (results) {
                        $scope.utillinkLoading = false;
                        $scope.utillinks = results;
                    }).error(function (data, status, headers, config) {
                        $scope.utillinkLoading = false;
                    });
                }).
                error(function (data, status, headers, config) {
                    $scope.utillinkLoading = false;
                });
        }
        $scope.search();

        $scope.recPageChanged = function () {
            $scope.recommandationLoading = true;
            $http.get('/recommandation/search', {
                params: {
                    count: 0,
                    country: $scope.country,
                    lvl1: $scope.lvl1,
                    lvl2: $scope.lvl2,
                    city: $scope.city,
                    pageSize: $scope.recPageSize,
                    pageIndex: $scope.recPageIndex
                }
            }).success(function (recs) {
                $scope.recommandationLoading = false;
                $scope.recommandations = recs;
            }).error(function (data, status, headers, config) {
                $scope.recommandationLoading = false;
            });
        }

        $scope.linkPageChanged = function () {
            $scope.utillinkLoading = true;
            $http.get('/utilLink/search', {
                params: {
                    count: 0,
                    country: $scope.country,
                    lvl1: $scope.lvl1,
                    lvl2: $scope.lvl2,
                    city: $scope.city,
                    pageSize: $scope.linkPageSize,
                    pageIndex: $scope.linkPageIndex
                }
            }).success(function (utillinks) {
                $scope.utillinkLoading = false;
                $scope.utillinks = utillinks;
            }).error(function (data, status, headers, config) {
                $scope.utillinkLoading = false;
            });
        }
    }
]);