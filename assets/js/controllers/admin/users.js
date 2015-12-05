'use strict';
/**
 * @ngdoc function
 * @name tooFrenchApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the tooFrenchApp
 */
var ctrl = angular.module('tooFrenchApp');
ctrl.controller('AdminUserCtrl', ['$scope', 'User', '$http', 'DataTable', '$mdDialog', '$mdSidenav', '$mdToast', function($scope, User, $http, DataTable, $mdDialog, $mdSidenav, $mdToast) {
	$scope.menuOpen = false;
	$scope.columns = [{
		'header' : 'Prénom',
		'field': 'profile',
		'subfield' : 'firstname'
	},{
		'header' : 'Email',
		'field': 'email',
		'filter' : 'contains'
	}, {
		'header' : 'Role',
		'field': 'role'
	}];
	$scope.selected;
	$scope.datatable = new DataTable('user', $scope.columns);
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

	$scope.removeCurrent = function(ev){
		var confirm = $mdDialog.confirm({
			title: 'Attention',
			content: 'Êtes-vous sur de vouloir supprimer cet utilisateur ?',
			ok: 'Oui, supprimer',
			cancel:'Non, annuler'
		});
		$mdDialog.show(confirm).then(function() {
			User.remove({id : $scope.selected.id}, function(u){
				$scope.datatable.toggleSelect(u);
				$scope.datatable.load();

				$mdToast.show(
					$mdToast.simple()
						.content("L'utilisateur " + u.username + " a été supprimé.")
						.position('top right')
						.hideDelay(3000)
				);
			}, function(err){
				$mdToast.show(
					$mdToast.simple()
						.content("Une erreur c'est produite pendant la suppression... Veuillez réessayer")
						.position('top right')
						.hideDelay(3000)
				);
			});
		}, function() {

		});
	}
}]);