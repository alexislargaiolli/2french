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
	$scope.users = [];
	$scope.user = null;
	$scope.pageSize = 10;
	$scope.pageIndex = 1;
	$scope.count = 0;
	$scope.loading = true;

	$scope.pageChanged = function () {
		$scope.loading = true;
		$http.get('/user/adminSearch', {
			params: {
				count: 0,
				pageSize: $scope.pageSize,
				pageIndex: $scope.pageIndex
			}
		}).success(function (users) {
			$scope.loading = false;
			$scope.users = users;
		}).error(function (data, status, headers, config) {

		});
	}
	$scope.pageChanged();

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