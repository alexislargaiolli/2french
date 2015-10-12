var tooFrenchControllers = angular.module('tooFrenchCtrl');
tooFrenchControllers.controller('NotificationCtrl', ['$rootScope', '$scope', 'Reservation', '$timeout', 'AUTH_EVENTS', 'AuthService', 'Messagerie', 'MESSAGE_EVENTS',

    function ($rootScope, $scope, Reservation, $timeout, AUTH_EVENTS, AuthService, Messagerie, MESSAGE_EVENTS) {
        $scope.notifResaCount = 0;
        $rootScope.notifMsgCount = 0;

        Reservation.notifCount().then(function (count) {
            $scope.newResaCount = count;
        });

        Messagerie.getUnseenMsgCount().then(function (count) {
            $rootScope.notifMsgCount = count;
        }, function () {
            $rootScope.notifMsgCount = 0;
        });

        $scope.$on(MESSAGE_EVENTS.read, function (event, args) {
            var count = args.count;
            $rootScope.notifMsgCount -= count;
            if ($rootScope.notifMsgCount < 0) {
                $rootScope.notifMsgCount = 0;
            }
        });
    }
]);