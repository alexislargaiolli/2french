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
    $scope.interval = 500;
    var slides = $scope.slides = [{
        image: 'http://res.cloudinary.com/hmn3vaygs/image/upload/v1440947478/diapo1_q7oakl.jpg'
    }, {
        image: 'http://res.cloudinary.com/hmn3vaygs/image/upload/v1440947477/diapo2_eb2ckf.jpg'
    }, {
        image: 'http://res.cloudinary.com/hmn3vaygs/image/upload/v1440947479/diapo3_atnrof.jpg'
    }];

}]);