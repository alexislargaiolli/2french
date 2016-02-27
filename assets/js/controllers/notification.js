/**
 * Controller that manage notifications
 */
var tooFrenchControllers = angular.module('tooFrenchApp');
tooFrenchControllers.controller('NotificationCtrl', ['$scope', 'Notification', '$rootScope', '$state', '$interval', 'AUTH_EVENTS',

    function ($scope, Notification, $rootScope, $state, $interval, AUTH_EVENTS) {

        /**
         * Array of loaded notification
         * @type {Array}
         */
        $scope.notifications = [];

        /**
         * Number of unseen notification
         * @type {number}
         */
        $scope.notifCount = 0;

        /**
         * To if notification are being loading
         * @type {boolean}
         */
        $scope.notificationLoading = false;

        /**
         * Number of notif to skip for lazy loading
         * @type {number}
         */
        $scope.skip = 0;

        /**
         * Max number of notification for lazy loading
         * @type {number}
         */
        $scope.limit = 5;

        /**
         * Pointer on angular interval use to stop it
         */
        var stop;

        /**
         * Update notification count by asking to server
         */
        $scope.updateCount = function () {
            Notification.getResource().unseenCount(function (data) {
                $scope.notifCount = data.count;
            });
        }
        $scope.updateCount();
        stop = $interval($scope.updateCount, 5000);

        /**
         * On log out, stop interval on updateCount
         */
        $rootScope.$on(AUTH_EVENTS.logoutSuccess, function (event, args) {
            if (angular.isDefined(stop)) {
                $interval.cancel(stop);
                stop = undefined;
            }
        });

        /**
         * Load notifications based on skip on limit variables
         */
        $scope.loadNotif = function () {
            $scope.notificationLoading = true;
            Notification.getResource().unseen({skip: $scope.skip, limit: $scope.limit}, function (notifs) {
                $scope.notifications = $scope.notifications.concat(notifs);
                $scope.notificationLoading = false;
            });
        }

        /**
         * Load 5 notification more
         */
        $scope.loadMore = function () {
            $scope.skip += 5;
            $scope.limit += 5;
            $scope.loadNotif();
        }

        /**
         * Handle click on notification
         * @param notif clicked notification
         */
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