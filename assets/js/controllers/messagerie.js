var tooFrenchControllers = angular.module('tooFrenchApp');
tooFrenchControllers.controller('MessagerieCtrl', ['$scope', '$stateParams', 'Messagerie', '$timeout', 'Notification', 'NOTIFICATION_EVENTS', '$rootScope',

    function ($scope, $stateParams, Messagerie, $timeout, Notification, NOTIFICATION_EVENTS, $rootScope) {

        $scope.conversations = [];

        $scope.selectedConv = null;

        $scope.message = {};

        $scope.loginRequest.promise.then(function () {

            $rootScope.$on(NOTIFICATION_EVENTS.messageUpdate, function (event, args) {
                if (args.count > 0) {
                    for (var i = 0; i < $scope.conversations.length; i++) {
                        $scope.conversations[i].notifs = Notification.getConversationNoificationCount($scope.conversations[i].id);
                    }
                }
            });

            Messagerie.getUserConversations().then(function (conversations) {
                $scope.conversations = conversations;
                if ($scope.conversations && $scope.conversations.length > 0) {
                    $scope.selectConversation($scope.conversations[0]);
                    for (var i = 0; i < $scope.conversations.length; i++) {
                        $scope.conversations[i].notifs = Notification.getConversationNoificationCount($scope.conversations[i].id);
                    }
                }
            }, function () {
                $scope.conversations = [];
            });

            $scope.selectConversation = function (conv) {
                conv.notifs = 0;
                Messagerie.getConversation(conv.id).then(function (data) {
                    $scope.selectedConv = data;
                    $scope.updateMessagePanel();
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