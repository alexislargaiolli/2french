'use strict';
/**
 * @ngdoc function
 * @name tooFrenchApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the tooFrenchApp
 */
var ctrl = angular.module('tooFrenchApp');
ctrl.controller('AdminFormationCtrl', ['$scope', 'Formation', '$mdDialog', function($scope, Formation, $mdDialog) {
	$scope.formations = Formation.query();
	$scope.formation = new Formation;
	$scope.createFormation = function() {
		$scope.formation = new Formation;
	}
	$scope.saveFormation = function() {
		if ($scope.formation.id) {
			$scope.formation.$update();
		} else {
			$scope.formation.$save(function() {
				$scope.formations.push($scope.formation);
			});
		}
	}
	$scope.selectFormation = function(f) {
		$scope.formation = f;
	}
	$scope.deleteFormation = function(f) {
		var confirm = $mdDialog.confirm({
			title: 'Attention',
			content: 'Êtes-vous sur de vouloir valider cette formation ?',
			ok: 'Oui, supprimer',
			cancel:'Non, annuler'
		});
		$mdDialog.show(confirm).then(function() {
			f.$delete(function() {
				var index = $scope.formations.indexOf(f);
				$scope.formations.splice(index, 1);
			});
		}, function() {

		});
	}
}]);