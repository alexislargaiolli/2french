'use strict';

/**
 * @ngdoc function
 * @name tooFrenchApp.directive:LoginDirective
 * @description
 * # LoginDirective
 * Directive of the tooFrenchApp for login html component
 */
var tooFrench = angular.module('tooFrenchApp');
tooFrench.directive('loginInput', function() {
  return {
    restrict: 'E',
    templateUrl: '/partials/directives/loginInput.html?v=1.0'
  };
});
