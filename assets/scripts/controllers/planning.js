var tooFrenchControllers = angular.module('tooFrenchCtrl');
tooFrenchControllers.controller('PlanningCtrl', ['$scope', 'Reservation', '$timeout',

    function ($scope, Reservation, $timeout) {
        $scope.resas = [];
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
            });
        }

        $scope.cancelResa = function(resa){
            Reservation.cancelReservation(resa.id).then(function(r){
                resa.status = r[0].status;
            });
        }
    }
]);