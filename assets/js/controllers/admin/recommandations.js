'use strict';
/**
 * @ngdoc function
 * @name tooFrenchApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the tooFrenchApp
 */
var ctrl = angular.module('tooFrenchApp');
ctrl.controller('AdminRecommandationCtrl', ['$scope', 'Recommandation', '$mdDialog', function($scope, Recommandation, $mdDialog) {
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
		var confirm = $mdDialog.confirm({
			title: 'Attention',
			content: 'Êtes-vous sur de vouloir valider cette recommandation ?',
			ok: 'Oui, supprimer',
			cancel:'Non, annuler'
		});
		$mdDialog.show(confirm).then(function() {
			f.$delete(function() {
				var index = $scope.recommandations.indexOf(f);
				$scope.recommandations.splice(index, 1);
			});
		}, function() {

		});

	}


}]);