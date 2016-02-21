'use strict';
/**
 * @ngdoc function
 * @name tooFrenchApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the tooFrenchApp
 */
var ctrl = angular.module('tooFrenchApp');
ctrl.controller('AdminDiplomaCtrl', ['$scope', 'Diploma' , 'DataTable', '$mdDialog', '$mdSidenav', '$mdToast', function($scope, Diploma, DataTable, $mdDialog, $mdSidenav, $mdToast) {
    $scope.menuOpen = false;
    $scope.columns = [{
        'header' : 'Utilisateur',
        'field': 'owner',
        'subfield' : 'email',
        'sortable' : true
    },{
        'header' : 'Validé',
        'field': 'diplomaValidated',
        'sortable' : true
    }];

    $scope.selected;
    $scope.datatable = new DataTable('diploma', $scope.columns);
    $scope.datatable.selectionType = 1;
    $scope.datatable.load().then(function(){

    });

    $scope.datatable.onSelect = function(elt){
        $scope.selected = elt;
        $mdSidenav('right').toggle();
    }
    $scope.datatable.onUnselect = function(elt){
        $scope.selected = null;
        $mdSidenav('right').toggle();
    }
    $scope.closeNavbar = function(){
        $mdSidenav('right').close();
    }

    $scope.validate = function(ev){
        var confirm = $mdDialog.confirm({
            title: 'Attention',
            content: 'Êtes-vous sur de vouloir valider ce diplôme ?',
            ok: 'Oui, valider',
            cancel:'Non, annuler'
        });
        $mdDialog.show(confirm).then(function() {
            Diploma.validate($scope.selected.id).then(function(d){
                $scope.datatable.toggleSelect(d);
                $scope.datatable.load();
                $mdToast.show(
                    $mdToast.simple()
                        .content("Le diplôme a été validé")
                        .position('top right')
                        .hideDelay(3000)
                );
            },function(){
                $mdToast.show(
                    $mdToast.simple()
                        .content("Une erreur c'est produite pendant la validation... Veuillez réessayer")
                        .position('top right')
                        .hideDelay(3000)
                );
            });

        }, function() {

        });
    }

}]);