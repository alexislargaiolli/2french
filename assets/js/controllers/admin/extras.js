'use strict';
/**
 * @ngdoc function
 * @name tooFrenchApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the tooFrenchApp
 */
var ctrl = angular.module('tooFrenchApp');
ctrl.controller('AdminExtraCtrl', ['$scope', 'Extra', 'dialogs', function($scope, Extra, dialogs) {
	$scope.extras = Extra.query();
	$scope.extra = new Extra();
	$scope.createExtra = function() {
		$scope.extra = new Extra();
	}
	$scope.saveExtra = function() {
		if ($scope.extra.id) {
			$scope.extra.$update();
		} else {
			$scope.extra.$save(function() {
				$scope.extras.push($scope.extra);
			});
		}
	}
	$scope.selectExtra = function(f) {
		$scope.extra = f;
	}
	$scope.deleteExtra = function(f) {
		var dlg = dialogs.confirm('Please Confirm', 'Is this awesome or what?');
		dlg.result.then(function(btn) {
			f.$delete(function() {
				var index = $scope.extras.indexOf(f);
				$scope.extras.splice(index, 1);
			});
		}, function(btn) {

		});

	}


}]);