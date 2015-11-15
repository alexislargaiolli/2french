var tooFrenchControllers = angular.module('tooFrenchApp');
tooFrenchControllers.controller('PlanningCtrl', ['$rootScope', '$scope', 'Reservation', '$timeout', 'AUTH_EVENTS',

    function ($rootScope, $scope, Reservation, $timeout, AUTH_EVENTS) {
        $scope.resas = [];
        $scope.todayDate = new Date();
        $scope.loading = false;
        $scope.history = false;

        $scope.loginRequest.promise.then(function () {
            if ($scope.isTeacher) {

                $scope.loadResa = function(history) {
                    $scope.history = history;
                    $scope.loading = true;
                    $scope.resas = [];
                    Reservation.teacherResa(history ? history : null).then(function (resas) {
                        $scope.resas = resas;
                        $scope.loading = false;
                    }, function(err){
                        $scope.resas = [];
                        $scope.loading = false;
                    });
                }

                $scope.changeStatus = function (resa, status) {
                    Reservation.teacherChangeStatus(resa.id, status).then(function (r) {
                        resa.status = r[0].status;
                    });
                }
            }
            else {
                $scope.loadResa = function(history) {
                    $scope.history = history;
                    $scope.loading = true;
                    $scope.resas = [];
                    Reservation.studentResa(history ? history : null).then(function (resas) {
                        $scope.loading = false;
                        $scope.resas = resas;
                        for (var i = 0; i < $scope.resas.length; i++) {
                            var d = new Date($scope.resas[i].date);
                            $scope.resas[i].done = d < $scope.todayDate;
                        }
                    }, function(){
                        $scope.loading = false;
                        $scope.resas = [];
                    });
                }
            }
            $scope.loadResa(false);

            $scope.cancelResa = function (resa) {
                Reservation.cancelReservation(resa.id).then(function (r) {
                    resa.status = r[0].status;
                });
            }
        });
    }
]);