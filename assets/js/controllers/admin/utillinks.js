'use strict';
/**
 * @ngdoc function
 * @name tooFrenchApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the tooFrenchApp
 */
var ctrl = angular.module('tooFrenchApp');
ctrl.controller('AdminUtilLinkCtrl', ['$scope', 'UtilLink', '$mdDialog', function($scope, UtilLink, $mdDialog) {
	$scope.utillinks = UtilLink.query();
	$scope.optionsCity = {
		types: ['(regions)']
	};
	$scope.utillink = new UtilLink;
	$scope.createUtilLink = function() {
		$scope.utillink = new UtilLink;
	}
	$scope.saveUtilLink = function() {
		if ($scope.utillink.id) {
			$scope.utillink.$update();
		} else {
			$scope.utillink.$save(function() {
				$scope.utillinks.push($scope.utillink);
			});
		}
	}
	$scope.selectUtilLink = function(f) {
		$scope.utillink = f;
	}
	$scope.deleteUtilLink = function(f) {
		var confirm = $mdDialog.confirm({
			title: 'Attention',
			content: 'Êtes-vous sur de vouloir valider ce lien ?',
			ok: 'Oui, supprimer',
			cancel:'Non, annuler'
		});
		$mdDialog.show(confirm).then(function() {
			f.$delete(function() {
				var index = $scope.utillinks.indexOf(f);
				$scope.utillinks.splice(index, 1);
			});
		}, function() {

		});
	}


}]);