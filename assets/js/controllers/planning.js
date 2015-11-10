var tooFrenchControllers = angular.module('tooFrenchApp');
tooFrenchControllers.controller('PlanningCtrl', ['$rootScope', '$scope', 'Reservation', '$timeout', 'AUTH_EVENTS',

    function ($rootScope, $scope, Reservation, $timeout, AUTH_EVENTS) {
        $scope.resas = [];
        $scope.todayDate = new Date();
        if($scope.isTeacher){

            Reservation.teacherResa().then(function(resas){
                $scope.resas = resas;
            });

            $scope.changeStatus = function(resa, status){
                Reservation.teacherChangeStatus(resa.id, status).then(function(r){
                    resa.status = r[0].status;
                });
            }
        }
        else{
            Reservation.studentResa().then(function(resas){
                $scope.resas = resas;
                for(var i =0; i<$scope.resas.length;i++){
                    var d = new Date($scope.resas[i].date);
                    $scope.resas[i].done = d < $scope.todayDate;
                }
            });
        }

        $scope.cancelResa = function(resa){
            Reservation.cancelReservation(resa.id).then(function(r){
                resa.status = r[0].status;
            });
        }
    }
]);