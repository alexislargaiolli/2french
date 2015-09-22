'use strict';
/**
 * @ngdoc function
 * @name tooFrenchApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the tooFrenchApp
 */
var ctrl = angular.module('tooFrenchCtrl');
ctrl.controller('AdminFormationCtrl', ['$scope', 'Formation', 'dialogs', function($scope, Formation, dialogs) {
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
		var dlg = dialogs.confirm('Please Confirm', 'Is this awesome or what?');
		dlg.result.then(function(btn) {
			f.$delete(function() {
				var index = $scope.formations.indexOf(f);
				$scope.formations.splice(index, 1);
			});
		}, function(btn) {

		});

	}
}]);