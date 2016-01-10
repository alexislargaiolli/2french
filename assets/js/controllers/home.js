'use strict';
/**
 * @ngdoc function
 * @name tooFrenchApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the tooFrenchApp
 */
var ctrl = angular.module('tooFrenchApp');
ctrl.controller('HomeCtrl', ['$scope', '$rootScope', '$timeout', function ($scope, $rootScope, $timeout) {
    $scope.interval = 5000;
    var slides = $scope.slides = [{
        image: 'https://res.cloudinary.com/hmn3vaygs/image/upload/v1452444404/diapo0_1_jq4ixj.jpg'
    },{
        image: 'https://res.cloudinary.com/hmn3vaygs/image/upload/v1440947478/diapo1_q7oakl.jpg'
    }, {
        image: 'https://res.cloudinary.com/hmn3vaygs/image/upload/v1444153972/diapo2_1_xfi6i3.jpg'
    }, {
        image: 'https://res.cloudinary.com/hmn3vaygs/image/upload/v1440947479/diapo3_atnrof.jpg'
    }];

    angular.element(document).ready(function () {
        $timeout(function(){
            $rootScope.updateCarousel();
        }, 200);
    });
}]);