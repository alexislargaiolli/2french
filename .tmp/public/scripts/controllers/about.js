'use strict';

/**
 * @ngdoc function
 * @name tooFrenchApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tooFrenchApp
 */
angular.module('tooFrenchApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
