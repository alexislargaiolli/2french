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
    $scope.interval = 3000;
    var slides = $scope.slides = [{
        image: 'http://res.cloudinary.com/hmn3vaygs/image/upload/v1435768122/diapo1_qfdqgy.jpg', text : 'home.carousel.caption'
    }, {
        image: 'http://res.cloudinary.com/hmn3vaygs/image/upload/v1435768133/diapo2_ua1ctu.jpg', text : 'home.carousel.caption'
    }, {
        image: 'http://res.cloudinary.com/hmn3vaygs/image/upload/v1435768188/diapo3_ysaweo.jpg', text : 'home.carousel.caption'
    }, {
        image: 'http://res.cloudinary.com/hmn3vaygs/image/upload/v1435768139/diapo4_iogtop.jpg', text : 'home.carousel.caption'
    }, {
        image: 'http://res.cloudinary.com/hmn3vaygs/image/upload/v1435768131/diapo5_xy4tpl.jpg', text : 'home.carousel.caption'
    }];

}]);