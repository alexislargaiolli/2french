'use strict';
/**
 * @ngdoc function
 * @name tooFrenchApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the tooFrenchApp
 */
var ctrl = angular.module('tooFrenchApp');
ctrl.controller('AdminDiplomaCtrl', ['$scope', 'Diploma' ,'dialogs', function($scope, Diploma, dialogs) {
    $scope.diplomas = [];
    Diploma.getWithProfile().then(function(diplomas){
        $scope.diplomas = diplomas;
    });

    $scope.validate = function(diplomaId){
        var dlg = dialogs.confirm('Validation', 'Êtes-vous sur de vouloir valider ce diplôme ?');
        dlg.result.then(function(btn) {
            Diploma.validate(diplomaId).then(function(diploma){
                var index = $scope.diplomas.indexOf(diploma);
                $scope.diplomas.splice(index, 1);
            },function(){

            });
        }, function(btn) {

        });
    }

}]);