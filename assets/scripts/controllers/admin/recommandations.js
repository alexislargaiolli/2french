'use strict';
/**
 * @ngdoc function
 * @name tooFrenchApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the tooFrenchApp
 */
var ctrl = angular.module('tooFrenchCtrl');
ctrl.controller('AdminRecommandationCtrl', ['$scope', 'Recommandation', 'dialogs', function($scope, Recommandation, dialogs) {
	$scope.recommandations = Recommandation.query();
	$scope.optionsCity = {
		types: ['(regions)']
	};
	$scope.recommandation = new Recommandation;
	$scope.createRecommandation = function() {
		$scope.recommandation = new Recommandation;
	}
	$scope.saveRecommandation = function() {
		if ($scope.recommandation.id) {
			$scope.recommandation.$update();
		} else {
			$scope.recommandation.$save(function() {
				$scope.recommandations.push($scope.recommandation);
			});
		}
	}
	$scope.selectRecommandation = function(f) {
		$scope.recommandation = f;
	}
	$scope.deleteRecommandation = function(f) {
		var dlg = dialogs.confirm('Please Confirm', 'Is this awesome or what?');
		dlg.result.then(function(btn) {
			f.$delete(function() {
				var index = $scope.recommandations.indexOf(f);
				$scope.recommandations.splice(index, 1);
			});
		}, function(btn) {

		});

	}


}]);