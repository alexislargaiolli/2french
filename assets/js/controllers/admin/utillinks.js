'use strict';
/**
 * @ngdoc function
 * @name tooFrenchApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the tooFrenchApp
 */
var ctrl = angular.module('tooFrenchApp');
ctrl.controller('AdminUtilLinkCtrl', ['$scope', 'UtilLink', 'dialogs', function($scope, UtilLink, dialogs) {
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
		var dlg = dialogs.confirm('Please Confirm', 'Is this awesome or what?');
		dlg.result.then(function(btn) {
			f.$delete(function() {
				var index = $scope.utillinks.indexOf(f);
				$scope.utillinks.splice(index, 1);
			});
		}, function(btn) {

		});

	}


}]);