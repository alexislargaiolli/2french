'use strict';
/**
 * @ngdoc function
 * @name tooFrenchApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the tooFrenchApp
 */
var ctrl = angular.module('tooFrenchApp');
ctrl.controller('AdminEquipmentCtrl', ['$scope', 'Equipment', '$mdDialog', function($scope, Equipment, $mdDialog) {
	$scope.equipments = Equipment.query();
	$scope.equipment = new Equipment;
	$scope.createEquipment = function() {
		$scope.equipment = new Equipment;
	}
	$scope.saveEquipment = function() {
		if ($scope.equipment.id) {
			$scope.equipment.$update();
		} else {
			$scope.equipment.$save(function() {
				$scope.equipments.push($scope.equipment);
			});
		}
	}
	$scope.selectEquipment = function(f) {
		$scope.equipment = f;
	}
	$scope.deleteEquipment = function(f) {
		var confirm = $mdDialog.confirm({
			title: 'Attention',
			content: 'Êtes-vous sur de vouloir valider cet équipement ?',
			ok: 'Oui, supprimer',
			cancel:'Non, annuler'
		});
		$mdDialog.show(confirm).then(function() {
			f.$delete(function() {
				var index = $scope.equipments.indexOf(f);
				$scope.equipments.splice(index, 1);
			});
		}, function() {

		});

	}


}]);