var tooFrenchControllers = angular.module('tooFrenchCtrl');
tooFrenchControllers.controller('MessagerieCtrl', ['$scope', '$stateParams','Messagerie', '$timeout',

	function($scope, $stateParams, Messagerie, $timeout) {

		$scope.conversations = [];

        $scope.selectedConv = null;

        $scope.message = {};

        Messagerie.getUserConversations().then(function(conversations){
            $scope.conversations = conversations;
            if($scope.conversations && $scope.conversations.length > 0){
                $scope.selectConversation($scope.conversations[0].id);
            }
        }, function(){
            $scope.conversations = [];
        });

        $scope.selectConversation = function(convId){
            Messagerie.getConversation(convId).then(function(data){
                $scope.selectedConv = data;
                $scope.updateMessagePanel();
            });
        }

        $scope.sendMessage = function(){
            var from = $scope.selectedConv.owner;
            var to = $scope.selectedConv.interlocutorId;
            $scope.message.author = from;
            $scope.message.recipient = to;


            Messagerie.sendMessage(from, to, $scope.message.content).then(function(){
                $scope.selectedConv.messages.push($scope.message);
                $scope.message = {};
                $scope.updateMessagePanel();
            }, function(){

            });
        }

		$scope.createConversation=function(){

		}

		$scope.contactTeacher = function(user, message){
			console.log(user);
			console.log(message);
		}

        $scope.updateMessagePanel = function(){
            $timeout(function(){
                scrollMessagePanel();
            });
        }
	}
]);