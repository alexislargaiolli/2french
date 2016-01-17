var tooFrenchControllers = angular.module('tooFrenchApp');
tooFrenchControllers.controller('NotificationCtrl', ['$scope', 'Notification', '$rootScope', '$state', '$interval',

    function ($scope, Notification, $rootScope, $state, $interval) {

        $scope.notifications = [];

        $scope.notifCount = 0;

        $scope.notificationLoading = false;

        $scope.updateCount = function(){
            Notification.getResource().unseenCount(function(data){
                $scope.notifCount = data.count;
            });
        }
        $interval($scope.updateCount, 5000);

        $scope.loadNotif = function () {
            $scope.notificationLoading = true;
            $scope.notifications = Notification.getResource().unseen(function () {
                $scope.notificationLoading = false;
            });
        }

        $scope.onNotifClick = function (notif) {
            if (notif.type == 'resa') {
                $state.go('planning', {history :notif.history, resaId : notif.reservation});
            }
            else if (notif.type == 'message') {
                $state.go('messagerie', {conversationId: notif.conversation});
            }
            else if (notif.type == 'forum') {
                $state.go('forum.post', {postId : notif.post});
            }
        }

    }
]);