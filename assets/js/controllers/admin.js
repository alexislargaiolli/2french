'use strict';
/**
 * @ngdoc function
 * @name tooFrenchApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the tooFrenchApp
 */
var ctrl = angular.module('tooFrenchApp');
ctrl.controller('AdminCtrl', ['$scope', 'DataTable', function($scope, DataTable) {
    $scope.columns = [{
        'header' : 'Id',
        'field': 'id'
    }, {
        'header' : 'Username',
        'field': 'username',
        'filter' : 'contains'
    }, {
        'header' : 'Role',
        'field': 'role'
    }];

    $scope.datatable = new DataTable('user', $scope.columns);
    $scope.datatable.load().then(function(){

    });
}]);