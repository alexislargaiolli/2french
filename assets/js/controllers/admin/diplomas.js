'use strict';
/**
 * @ngdoc function
 * @name tooFrenchApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the tooFrenchApp
 */
var ctrl = angular.module('tooFrenchApp');
ctrl.controller('AdminDiplomaCtrl', ['$scope', 'Diploma' ,'$mdDialog', function($scope, Diploma, $mdDialog) {
    $scope.diplomas = [];
    Diploma.getWithProfile().then(function(diplomas){
        $scope.diplomas = diplomas;
    });

    $scope.validate = function(diploma){
        var confirm = $mdDialog.confirm({
            title: 'Attention',
            content: 'Êtes-vous sur de vouloir valider ce diplôme ?',
            ok: 'Oui, supprimer',
            cancel:'Non, annuler'
        });
        $mdDialog.show(confirm).then(function() {
            Diploma.validate(diploma.id).then(function(d){
                var index = $scope.diplomas.indexOf(diploma);
                $scope.diplomas.splice(index, 1);
            },function(){

            });
        }, function() {

        });
    }

}]);