var tooFrenchControllers = angular.module('tooFrenchApp');
tooFrenchControllers.controller('MessagerieCtrl', ['$scope', '$stateParams', 'Messagerie', '$timeout', 'Notification', '$rootScope',

    function ($scope, $stateParams, Messagerie, $timeout, Notification, $rootScope) {

        $scope.conversations = [];

        $scope.selectedConv = null;

        $scope.message = {};

        $scope.loginRequest.promise.then(function () {

            Messagerie.getResource().getUserConversations(function (conversations) {
                $scope.conversations = conversations;
                if ($scope.conversations && $scope.conversations.length > 0) {
                    if ($stateParams.conversationId) {
                        $scope.selectConversationById($stateParams.conversationId);
                    }
                    else {
                        $scope.selectConversation($scope.conversations[0]);
                    }
                }
            }, function () {
                $scope.conversations = [];
            });

            $scope.selectConversation = function (conv) {
                conv.unseenCount = 0;
                $scope.selectConversationById(conv.id);
            }

            $scope.selectConversationById = function (convId) {
                Messagerie.getResource().getConversation({id: convId}, function (data) {
                    $scope.selectedConv = data;
                    $scope.selectedConv.unseenCount = 0;
                    $scope.updateMessagePanel();
                });
                Messagerie.getResource().setAsRead({id: convId}, function () {

                });
            }

            $scope.sendMessage = function () {
                var from = $scope.selectedConv.owner;
                var to = $scope.selectedConv.interlocutorId;
                $scope.message.author = from;
                $scope.message.recipient = to;

                Messagerie.sendMessage(from, to, $scope.message.content).then(function () {
                    $scope.selectedConv.messages.push($scope.message);
                    $scope.message = {};
                    $scope.updateMessagePanel();
                }, function () {

                });
            }

            $scope.createConversation = function () {

            }

            $scope.contactTeacher = function (user, message) {

            }

            $scope.binded = false;
            $scope.updateMessagePanel = function () {
                $timeout(function () {
                    scrollMessagePanel();
                    if (!$scope.binded) {
                        angular.element("#msg-content-area").bind('keydown', function (event) {
                            var code = event.keyCode || event.which;

                            if (code === 13) {
                                if (!event.shiftKey) {
                                    event.preventDefault();
                                    angular.element("#send-msg").click();
                                }
                            }
                        });
                        $scope.binded = true;
                    }
                });
            }
        });
    }
]);