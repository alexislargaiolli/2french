'use strict';
/**
 * @ngdoc function
 * @name tooFrenchApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the tooFrenchApp
 */
var ctrl = angular.module('tooFrenchApp');
ctrl.controller('AdminStatisticsCtrl', ['$scope', 'Reservation', '$http', '$timeout', '$q', function($scope, Reservation, $http, $timeout, $q) {
    $scope.intervals = [];
    $scope.labels = [];
    $scope.series = ['Nombre de réservation total', 'Nombre de réservation validées', 'Nombre de réservation en refusées', 'Nombre de réservation en attente', 'Nombre de réservation annulée'];
    $scope.filters = {year : '2016'};
    $scope.loading = false;
    $scope.data = [];

    function initIntervals(year) {
        for (var i = 1; i < 13; i++) {
            var from = moment(i + "/1/" + year, "MM-DD-YYYY");
            $scope.labels.push(from.format('MMMM'));
            $scope.intervals.push({
                from: from,
                to: moment(from).add(1, 'months')
            });
        }
    }

    function updateLoadingStatus(){
        if($scope.data.length == 5){
            $scope.loading = false;    
        }
    }

    $scope.loadDatas = function() {
        $scope.intervals = [];
        $scope.labels = [];
        $scope.data = [];
        $scope.loading = true;
        initIntervals($scope.filters.year);

        Reservation.countBetween({ intervals: $scope.intervals }).then(function(datas) {
            $scope.data[0] = datas;
            updateLoadingStatus();
        });

        Reservation.countBetween({ intervals: $scope.intervals, "status": "validated" }).then(function(datas) {
            $scope.data[1] = datas;
            updateLoadingStatus();
        });

        Reservation.countBetween({ intervals: $scope.intervals, "status": "refused" }).then(function(datas) {
            $scope.data[2] = datas;
            updateLoadingStatus();
        });

        Reservation.countBetween({ intervals: $scope.intervals, "status": "pending" }).then(function(datas) {
            $scope.data[3] = datas;
            updateLoadingStatus();
        });

        Reservation.countBetween({ intervals: $scope.intervals, "status": "canceled" }).then(function(datas) {
            $scope.data[4] = datas;
            updateLoadingStatus();
        });
    }

}]);
