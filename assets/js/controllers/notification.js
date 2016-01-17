var tooFrenchControllers = angular.module('tooFrenchApp');
tooFrenchControllers.controller('NotificationCtrl', ['$scope', 'Notification', '$rootScope', '$state', '$interval',

    function ($scope, Notification, $rootScope, $state, $interval) {

        $scope.notifications = [];

        $scope.notifCount = 0;

        $scope.notificationLoading = false;

        $scope.skip = 0;
        $scope.limit = 5;

        $scope.updateCount = function () {
            Notification.getResource().unseenCount(function (data) {
                $scope.notifCount = data.count;
            });
        }
        $scope.updateCount();
        $interval($scope.updateCount, 5000);

        $scope.loadNotif = function () {
            $scope.skip = 0;
            $scope.limit = 5;
            $scope.notificationLoading = true;
            Notification.getResource().unseen({skip: $scope.skip, limit: $scope.limit}, function (notifs) {
                $scope.notifications = notifs;
                $scope.notificationLoading = false;
            });
        }

        $scope.loadMore = function () {
            $scope.skip += 5;
            $scope.limit += 5;
            $scope.notificationLoading = true;
            Notification.getResource().unseen({skip: $scope.skip, limit: $scope.limit}, function (notifs) {
                $scope.notificationLoading = false;
                $scope.notifications = $scope.notifications.concat(notifs);
            });
        }

        $scope.onNotifClick = function (notif) {
            if (notif.type == 'resa') {
                $state.go('planning', {history: notif.history, resaId: notif.reservation});
            }
            else if (notif.type == 'message') {
                $state.go('messagerie', {conversationId: notif.conversation});
            }
            else if (notif.type == 'forum') {
                Notification.getResource().setAsSeen({id: notif.id}, function () {
                    $scope.notifCount--;
                    if($scope.notifCount < 0){
                        $scope.notifCount = 0;
                    }
                });
                $state.go('forum.post', {postId: notif.post});
            }
        }

    }
]);