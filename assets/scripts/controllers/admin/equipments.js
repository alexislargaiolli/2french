'use strict';
/**
 * @ngdoc function
 * @name tooFrenchApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the tooFrenchApp
 */
var ctrl = angular.module('tooFrenchCtrl');
ctrl.controller('AdminEquipmentCtrl', ['$scope', 'Equipment', 'dialogs', function($scope, Equipment, dialogs) {
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
		var dlg = dialogs.confirm('Please Confirm', 'Is this awesome or what?');
		dlg.result.then(function(btn) {
			f.$delete(function() {
				var index = $scope.equipments.indexOf(f);
				$scope.equipments.splice(index, 1);
			});
		}, function(btn) {

		});

	}


}]);