var tooFrenchControllers = angular.module('tooFrenchApp');
/**
 * Controller behind planning view
 */
tooFrenchControllers.controller('PlanningCtrl', ['$scope', 'Reservation', 'ContactService', '$stateParams', '$anchorScroll', '$location', '$timeout', '$document',

    function ($scope, Reservation, ContactService, $stateParams, $anchorScroll, $location, $timeout, $document) {
        /**
         * Array of user reservations
         * @type {Array}
         */
        $scope.resas = [];

        /**
         * Date of the day
         * @type {Date}
         */
        $scope.todayDate = new Date();

        /**
         * Flag to indicate if reservations are being fetch
         * @type {boolean}
         */
        $scope.loading = false;

        /**
         * Flag to show past or active reservation
         * @type {boolean}
         */
        $scope.history = $stateParams.history == 'true' ? true : false;

        /**
         * Message for contacting user
         * @type {{}}
         */
        $scope.message = {};

        /**
         * Wait login process before fetching reservations
         */
        $scope.loginRequest.promise.then(function () {
            if ($scope.isTeacher) {

                $scope.loadResa = function (history) {
                    $scope.history = history;
                    $scope.loading = true;
                    $scope.resas = [];
                    Reservation.teacherResa(history ? history : null).then(function (resas) {
                        $scope.resas = resas;
                        $scope.loading = false;
                        $scope.processParams();
                    }, function (err) {
                        $scope.resas = [];
                        $scope.loading = false;
                    });
                }

                $scope.changeStatus = function (resa, status) {
                    Reservation.teacherChangeStatus(resa.id, status).then(function (r) {
                        resa.status = r[0].status;
                    });
                }
            }
            else {
                $scope.loadResa = function (history) {
                    $scope.history = history;
                    $scope.loading = true;
                    $scope.resas = [];
                    Reservation.studentResa(history ? history : null).then(function (resas) {
                        $scope.loading = false;
                        $scope.resas = resas;
                        for (var i = 0; i < $scope.resas.length; i++) {
                            var d = new Date($scope.resas[i].date);
                            $scope.resas[i].done = d < $scope.todayDate;
                        }
                        $scope.processParams();
                    }, function () {
                        $scope.loading = false;
                        $scope.resas = [];
                    });
                }
            }
            $scope.loadResa($scope.history);

            $scope.processParams = function () {
                if ($stateParams.resaId) {
                    $scope.goToResa($stateParams.resaId);
                }
            }

            $scope.goToResa = function (resaId) {
                $timeout(function(){
                    var eltId = 'resa_' + resaId;
                    var resaElt = angular.element(document.getElementById(eltId));
                    $document.scrollToElementAnimated(resaElt);
                },300);
            }

            /**
             * Cancel a reservation
             * @param resa reservation to cancel
             */
            $scope.cancelResa = function (resa) {
                Reservation.cancelReservation(resa.id).then(function (r) {
                    resa.status = r[0].status;
                });
            }

            $scope.setUserToContact = function (profileId, recipientName) {
                $scope.message.recipient = profileId;
                $scope.message.content = "";
                $scope.message.recipientName = recipientName;
                angular.element('#contactDlg').modal('show');
            }

            $scope.sendMessage = function () {
                ContactService.sendMessage($scope.message.content, $scope.message.recipient, function () {
                    angular.element('#contactDlg').modal('hide');
                });
            }
        });
    }
]);