var tooFrenchControllers = angular.module('tooFrenchApp');
tooFrenchControllers.controller('ReservationCtrl', ['$scope', '$rootScope', '$stateParams', 'Profile', 'Reservation', 'Session', '$timeout',

    function ($scope, $rootScope, $stateParams, Profile, Reservation, Session, $timeout) {
        var Resa = Reservation.getResource();
        var r = new Resa();
        r.formation = null;
        r.formula = null;
        r.activity = false;
        r.accomodation = false;
        r.hourCount = null;
        /**
         * Reservation to create
         */
        $scope.reservation = r;

        $scope.period = moment().date(10).format('MM-YYYY');
        $scope.scheduleIndex = -1;


        /******************/
        /* Time selection */
        /******************/

        var h = new Date();
        h.setHours(14);
        h.setMinutes(0);

        /**
         * Time of the reservation
         * @type {Date}
         */
        $scope.resaHour = h;
        $scope.hstep = 1;
        $scope.mstep = 15;
        /**
         * True to use am / pm for time picker
         * @type {boolean}
         */
        $scope.ismeridian = ['fr', 'es'].indexOf($rootScope.currentLocale) == -1;

        /**
         * Update time picker on date change
         */
        $rootScope.$on('$translateChangeSuccess', function () {
            $scope.ismeridian = ['fr', 'es'].indexOf($rootScope.currentLocale) == -1;
        });

        /**
         * Selected date for reservation
         * @type {*[]}
         */
        $scope.selectedDays = [moment().valueOf()];
        $scope.status = null;
        $scope.submitted = false;

        /**
         * Avalable duration
         * @type {*[]}
         */
        $scope.durations = [{name: "0H30", value: '0.30'}, {name: "1H00", value: '1'}, {
            name: "1H30",
            value: '1.5'
        }, {name: "2H00", value: '2'}, {name: "2H30", value: '2.5'}, {name: "3H00", value: '3'}, {
            name: "3H30",
            value: '3,5'
        }, {name: "4H00", value: '4'}]


        /**
         * Fetch profiles when login process finished
         */
        $scope.loginRequest.promise.then(function () {

            /**
             * Fetch current user profile
             */
            $scope.myprofile = Profile.get({id: Session.user.profile}, function (profile) {

            });

            /**
             * Fetch teacher profile
             */
            $scope.profile = Profile.get({id: $stateParams.profileId}, function (profile) {
                $scope.reservation.activity = false;
                if (!$scope.profile.activeAccomodation) {
                    $scope.reservation.accomodation = false;
                }
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

            var findUndispo = function (date) {
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
                $scope.selectedDays = [date.valueOf()];
            }

            $scope.onMonthChanged = function (newMonth, oldMonth) {
                $scope.period = newMonth.format('MM-YYYY');
                $scope.scheduleIndex = findShedule($scope.period);
                if ($scope.scheduleIndex == -1) {
                    var schedule = {period: $scope.period, dayoff: [], undispos: []};
                    $scope.scheduleIndex = $scope.profile.schedules.push(schedule) - 1;
                }
            };

            /**
             * Create the reservation
             */
            $scope.createReservation = function () {
                if ($scope.reservation.formula == null && ($scope.reservation.formation == null || $scope.reservation.hourCount == null)) {
                    $scope.submitted = true;
                    return;
                }
                var hour = $scope.resaHour.getHours();
                var minute = $scope.resaHour.getMinutes();
                $scope.reservation.date = moment($scope.selectedDays[0]).toDate();
                $scope.reservation.date.setHours(hour);
                $scope.reservation.date.setMinutes(minute);

                $scope.reservation.student = Session.user.profile;
                $scope.reservation.teacher = $scope.profile.id;

                $scope.reservation.status = 'pending';
                $scope.reservation.$save(function () {
                    $timeout(function () {
                        $scope.status = 1;
                    })

                }, function () {
                    $scope.status = -1;
                });
            }
        });
    }
]);