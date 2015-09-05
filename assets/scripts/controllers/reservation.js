var tooFrenchControllers = angular.module('tooFrenchCtrl');
tooFrenchControllers.controller('ReservationCtrl', ['$scope', '$stateParams', 'Profile', 'Reservation', 'Session', '$timeout',

    function ($scope, $stateParams, Profile, Reservation, Session, $timeout) {
        var Resa = Reservation.getResource();
        $scope.period = moment().date(10).format('MM-YYYY');
        $scope.scheduleIndex = -1;
        $scope.reservation = new Resa();
        $scope.date = new Date();
        $scope.date.setHours(9);
        $scope.date.setMinutes(0);
        $scope.hstep = 1;
        $scope.mstep = 15;
        $scope.ismeridian = true;
        $scope.timeSelected = false;
        $scope.selected = null;
        $scope.status = null;
        $scope.submitted = false;
        $scope.durations = [{name: "0:30", value: '0.30'}, {name: "1:00", value: '1'}, {
            name: "1:30",
            value: '1.5'
        }, {name: "2:00", value: '2'}, {name: "2:30", value: '2.5'}, {name: "3:00", value: '3'}, {
            name: "3:30",
            value: '3,5'
        }, {name: "4:00", value: '4'}]


        $scope.myprofile = Profile.get({id: Session.user.profile}, function (profile) {

        });

        $scope.profile = Profile.get({id: $stateParams.profileId}, function (profile) {
            if ($stateParams.formula) {
                $scope.reservation.formula = profile.formulas[$stateParams.formula];
            }
            //If schedules is not empty, searches for a schedules for the current pediod
            if ($scope.profile.schedules && $scope.profile.schedules.length > 0) {
                $scope.scheduleIndex = findShedule($scope.period);
            }
            else {
                $scope.profile.schedules = [];
            }
            //If none schedule found, creates one
            if ($scope.scheduleIndex == -1) {
                var schedule = {period: $scope.period, dayoff: [], undispos: []};
                $scope.scheduleIndex = $scope.profile.schedules.push(schedule) - 1;
            }
        });

        $scope.timeChanged = function(){
            $scope.timeSelected = true;
        }

        var findUndispo = function (date) {
            console.log($scope.profile.schedules);
            if ($scope.profile.schedules[$scope.scheduleIndex].undispos.length == 0) {
                return -1;
            }
            var i = 0;
            for (i = 0; i < $scope.profile.schedules[$scope.scheduleIndex].undispos.length; i++) {
                if ($scope.profile.schedules[$scope.scheduleIndex].undispos[i].date === date) {
                    return i;
                }
            }
            return -1;
        }

        var findShedule = function (period) {
            if ($scope.profile.schedules.length == 0) {
                return -1;
            }
            var i = 0;
            for (i = 0; i < $scope.profile.schedules.length; i++) {
                if ($scope.profile.schedules[i].period == period) {
                    return i;
                }
            }
            return -1;
        }


        /* CALENDAR */
        $scope.dayClick = function (event, date) {
            event.preventDefault() // prevent the select to happen
            if ($scope.selected) {
                $scope.selected.selected = false;
            }
            $scope.selected = date;
            $scope.selected.selected = true;
        }

        $scope.onMonthChanged = function (newMonth, oldMonth) {
            $scope.period = newMonth.format('MM-YYYY');
            $scope.scheduleIndex = findShedule($scope.period);
            if ($scope.scheduleIndex == -1) {
                var schedule = {period: $scope.period, dayoff: [], undispos: []};
                $scope.scheduleIndex = $scope.profile.schedules.push(schedule) - 1;
            }
        };

        $scope.createReservation = function () {
            if ($scope.selected && $scope.timeSelected && $scope.reservation.accomodation && $scope.reservation.activity) {
                if($scope.formula && (!$scope.reservation.hourCount || !$scope.reservation.formation)){
                    $scope.submitted = true;
                    return;
                }
                var hour = $scope.date.getHours();
                var minute = $scope.date.getMinutes();
                $scope.reservation.date = $scope.selected.toDate();
                $scope.reservation.date.setHours(hour);
                $scope.reservation.date.setMinutes(minute);
                $scope.reservation.student = Session.user.profile;
                $scope.reservation.teacher = $scope.profile.id;
                $scope.reservation.status = 'pending';
                $scope.reservation.$save(function () {
                    console.log('success');
                    $timeout(function(){
                        $scope.status = 1;
                    })

                }, function () {
                    $scope.status = -1;
                });
            }
            else {
                $scope.submitted = true;
            }
        }
    }
]);