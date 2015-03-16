'use strict';

/**
 * @ngdoc function
 * @name tooFrenchApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tooFrenchApp
 */
angular.module('tooFrenchApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
