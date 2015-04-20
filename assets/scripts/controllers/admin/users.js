'use strict';
/**
 * @ngdoc function
 * @name tooFrenchApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the tooFrenchApp
 */
var ctrl = angular.module('tooFrenchCtrl');
ctrl.controller('AdminUserCtrl', ['$scope', 'User', 'dialogs', function($scope, User, dialogs) {
	$scope.users = User.query();
	$scope.user = null;

	$scope.saveUser = function() {
		if ($scope.user.id) {
			$scope.user.$update();
		} else {
			$scope.user.$save(function() {
				$scope.users.push($scope.user);
			});
		}
	}
	$scope.selectUser = function(f) {
		$scope.user = f;
	}
	$scope.deleteUser = function(f) {
		var dlg = dialogs.confirm('Please Confirm', 'Is this awesome or what?');
		dlg.result.then(function(btn) {
			f.$delete(function() {
				var index = $scope.users.indexOf(f);
				$scope.users.splice(index, 1);
			});
		}, function(btn) {

		});
	}
}]);