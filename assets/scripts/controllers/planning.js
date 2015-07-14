var tooFrenchControllers = angular.module('tooFrenchCtrl');
tooFrenchControllers.controller('PlanningCtrl', ['$scope', 'Reservation', '$timeout',

    function ($scope, Reservation, $timeout) {
        if($scope.isTeacher){
            $scope.teacherResas = [];
            Reservation.teacherResa().then(function(resas){
                $scope.teacherResas = resas;
            });

            $scope.changeStatus = function(resa, status){
                Reservation.teacherChangeStatus(resa.id, status).then(function(r){
                    resa.status = r[0].status;
                });
            }
        }
    }
]);