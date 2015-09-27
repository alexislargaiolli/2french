var tooFrenchControllers = angular.module('tooFrenchCtrl');
tooFrenchControllers.controller('SearchCtrl', ['$scope', '$stateParams', '$state', 'Profile', '$http', '$timeout', 'UserFavList', 'Session', 'Schedule',

    function ($scope, $stateParams, $state, Profile, $http, $timeout, UserFavList, Session, Schedule) {
        $scope.results = [];
        $scope.recommandations = [];
        $scope.utillinks = [];
        $scope.country = $stateParams.country;
        $scope.lvl1 = $stateParams.lvl1;
        $scope.lvl2 = $stateParams.lvl2;
        $scope.city = $stateParams.city;
        $scope.days = $stateParams.days;
        $scope.periods = $stateParams.periods;
        $scope.messageContent;
        $scope.userToContact;
        $scope.pageSize = 10;
        $scope.pageIndex = 1;
        $scope.count = 0;
        $scope.loading = true;
        $scope.period = moment().date(10).format('MM-YYYY');
        $scope.scheduleIndex = -1;
        $scope.scheduleLoading = false;
        $scope.monthLoading = false;

        $scope.search = function () {
            $scope.loading = true;
            $http.get('/profile/search', {
                params: {
                    count: 1,
                    country: $scope.country,
                    lvl1: $scope.lvl1,
                    lvl2: $scope.lvl2,
                    city: $scope.city,
                    days: $scope.days,
                    periods: $scope.periods,
                    pageSize: $scope.pageSize,
                    pageIndex: $scope.pageIndex
                }
            }).
                success(function (count, status, headers, config) {
                    $scope.count = count.count;
                    $http.get('/profile/search', {
                        params: {
                            count: 0,
                            country: $scope.country,
                            lvl1: $scope.lvl1,
                            lvl2: $scope.lvl2,
                            city: $scope.city,
                            days: $scope.days,
                            periods: $scope.periods,
                            pageSize: $scope.pageSize,
                            pageIndex: $scope.pageIndex
                        }
                    }).success(function (profiles) {
                        $scope.loading = false;
                        $scope.results = profiles;

                        $scope.schedules = [];
                    }).error(function (data, status, headers, config) {

                    });
                }).
                error(function (data, status, headers, config) {

                });
            $http.get('/recommandation/search', {
                params: {
                    count: 0,
                    country: $scope.country,
                    lvl1: $scope.lvl1,
                    lvl2: $scope.lvl2,
                    city: $scope.city,
                    pageSize: 5,
                    pageIndex: 0
                }
            }).success(function (recommandations, status, headers, config) {
                $scope.recommandations = recommandations;
            }).
                error(function (data, status, headers, config) {

                });
            $http.get('/utilLink/search', {
                params: {
                    count: 0,
                    country: $scope.country,
                    lvl1: $scope.lvl1,
                    lvl2: $scope.lvl2,
                    city: $scope.city,
                    pageSize: 5,
                    pageIndex: 0
                }
            }).
                success(function (utillinks, status, headers, config) {
                    $scope.utillinks = utillinks;
                }).
                error(function (data, status, headers, config) {

                });
        }
        $scope.search();

        $scope.currentScheduleProfileId;
        $scope.initSchedule = function (profileId) {
            $scope.currentScheduleProfileId = profileId;
            $scope.period = moment().date(10).format('MM-YYYY');
            $scope.schedules = [];
            $scope.scheduleIndex = findShedule($scope.period);
            if ($scope.scheduleIndex == -1) {
                $scope.scheduleLoading = true;
                Schedule.getSchedule($scope.currentScheduleProfileId, $scope.period).then(function (schedule) {
                    $scope.scheduleIndex = $scope.schedules.push(schedule) - 1;
                    $scope.scheduleLoading = false;
                });
            }
        }

        $scope.dayClick = function (event, date) {
            event.preventDefault() // prevent the select to happen
        }

        $scope.onMonthChanged = function (newMonth, oldMonth) {
            $scope.period = newMonth.format('MM-YYYY');
            $scope.scheduleIndex = findShedule($scope.period);

            if ($scope.scheduleIndex == -1) {
                $scope.monthLoading = true;
                console.log('loading');

                Schedule.getSchedule($scope.currentScheduleProfileId, $scope.period).then(function (schedule) {
                    $scope.scheduleIndex = $scope.schedules.push(schedule) - 1;
                    $scope.monthLoading = false;
                });
            }
        };

        $scope.setUserToContact = function (u) {
            $scope.userToContact = u;
        }

        $scope.pageChanged = function () {
            $scope.loading = true;
            $http.get('/profile/search', {
                params: {
                    count: 0,
                    country: $scope.country,
                    lvl1: $scope.lvl1,
                    lvl2: $scope.lvl2,
                    city: $scope.city,
                    days: $scope.days,
                    periods: $scope.periods,
                    pageSize: $scope.pageSize,
                    pageIndex: $scope.pageIndex
                }
            }).success(function (profiles) {
                $scope.loading = false;
                $scope.results = profiles;
            }).error(function (data, status, headers, config) {

            });
        }


        var findShedule = function (period) {
            if ($scope.schedules.length == 0) {
                return -1;
            }
            var i = 0;
            for (i = 0; i < $scope.schedules.length; i++) {
                if ($scope.schedules[i].period == period) {
                    return i;
                }
            }
            return -1;
        }

    }
]);