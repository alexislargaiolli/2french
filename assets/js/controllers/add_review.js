var tooFrenchControllers = angular.module('tooFrenchCtrl');
tooFrenchControllers.controller('AddReviewCtrl', ['$scope', '$stateParams', 'Reservation', 'Session',

    function ($scope, $stateParams, Reservation, Session) {
        $scope.reservation;
        $scope.mark = 0;
        $scope.reviewMessage;
        $scope.markMessage;
        $scope.status = 0;
        $scope.submitted = 0;

        Reservation.getResource().get({id:$stateParams.reservationId}, function(reservation){
            $scope.reservation = reservation;
            console.log($scope.reservation);
        }, function(){

        });

        $scope.addReview = function(){
            $scope.submitted = 1;
            Reservation.addReview($stateParams.reservationId, $scope.mark, $scope.reviewMessage).then(function(review){
                $scope.status = 1;
            },
            function(err){
                $scope.status = -1;
            });
        }

        $scope.hoveringOver = function(value) {
            $scope.mark = value;
            $scope.overStar = value;
            $scope.percent = 100 * (value / 5);
            switch(value){
                case 1:
                    $scope.markMessage = "À éviter";
                    break;
                case 2:
                    $scope.markMessage = "Décevant";
                    break;
                case 3:
                    $scope.markMessage = "Bien";
                    break;
                case 4:
                    $scope.markMessage = "Excellent";
                    break;
                case 5:
                    $scope.markMessage = "Extraordinaire";
                    break;
                default :
                    $scope.markMessage = "";
                    break;
            }
        };

    }
]);