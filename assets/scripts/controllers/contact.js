var tooFrenchControllers = angular.module('tooFrenchCtrl');
tooFrenchControllers.controller('ContactCtrl', ['$scope', '$stateParams','Messagerie', '$timeout', 'Session',

    function($scope, $stateParams, Messagerie, $timeout, Session) {
        $scope.message;
        $scope.setRecipient = function(r){
            $scope.recipient = r;
        }
        $scope.sendMessage = function(recipient){
            var from = Session.userId;
            $scope.message.author = from;
            $scope.message.recipient = recipient;
            Messagerie.sendMessage(from, recipient, $scope.message.content).then(function(){
                $scope.message = {};
            }, function(){

            });
        }
    }
]);