'use strict';
/**
 * @ngdoc function
 * @name tooFrenchApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the tooFrenchApp
 */
var ctrl = angular.module('tooFrenchCtrl');
ctrl.controller('HomeCtrl', ['$scope', function ($scope) {
    $scope.interval = 5000;
    var slides = $scope.slides = [{
        image: 'http://res.cloudinary.com/hmn3vaygs/image/upload/v1435767999/diapo1_nbj0gs.png'
    }, {
        image: 'http://res.cloudinary.com/hmn3vaygs/image/upload/v1435768133/diapo2_ua1ctu.jpg'
    }, {
        image: 'http://res.cloudinary.com/hmn3vaygs/image/upload/v1435768188/diapo3_ysaweo.jpg'
    }, {
        image: 'http://res.cloudinary.com/hmn3vaygs/image/upload/v1435768139/diapo4_iogtop.jpg'
    }, {
        image: 'http://res.cloudinary.com/hmn3vaygs/image/upload/v1435768131/diapo5_xy4tpl.jpg'
    }];
}]);