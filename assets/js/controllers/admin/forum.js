'use strict';
/**
 * @ngdoc function
 * @name tooFrenchApp.controller:AdminPostCategoryCtrl
 * @description
 * # AdminPostCategoryCtrl
 * Controller of the tooFrenchApp
 */
var ctrl = angular.module('tooFrenchApp');
ctrl.controller('AdminPostCategoryCtrl', ['$scope', 'PostCategory', 'dialogs', function($scope, PostCategory, dialogs) {
	$scope.categorys = PostCategory.query();
	$scope.category = new PostCategory;
	$scope.createPostCategory = function() {
		$scope.category = new PostCategory;
	}
	$scope.savePostCategory = function() {
		if ($scope.category.id) {
			$scope.category.$update();
		} else {
			$scope.category.$save(function() {
				$scope.categorys.push($scope.category);
			});
		}
	}
	$scope.selectPostCategory = function(f) {
		$scope.category = f;
	}
	$scope.deletePostCategory = function(f) {
		var dlg = dialogs.confirm('Please Confirm', 'Is this awesome or what?');
		dlg.result.then(function(btn) {
			f.$delete(function() {
				var index = $scope.categorys.indexOf(f);
				$scope.categorys.splice(index, 1);
			});
		}, function(btn) {

		});

	}


}]);