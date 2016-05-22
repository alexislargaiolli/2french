'use strict';
/**
 * @ngdoc function
 * @name tooFrenchApp.controller:AdminPostCategoryCtrl
 * @description
 * # AdminPostCategoryCtrl
 * Controller of the tooFrenchApp
 */
var ctrl = angular.module('tooFrenchApp');
ctrl.controller('AdminPostCategoryCtrl', ['$scope', 'PostCategory', 'Post', 'DataTable',  '$mdDialog', function($scope, PostCategory, Post, DataTable, $mdDialog) {
	$scope.categorys = PostCategory.query();
	$scope.category = new PostCategory;
	
	$scope.postCount = Post.getResource().count();
	
	$scope.columns = [{
        'header': 'Titre',
        'field': 'title',
        'sortable' : true,
        'filter': 'contains'
    }, {
        'header': 'Date',
        'field': 'date',
        'sortable' : true
    },
    {
        'header': 'Categorie',
        'field': 'category.name.fr',
        'filter': 'contains'
    },
    {
        'header': 'Vues',
        'sortable' : true,
        'field': 'seenCount'
    },
    {
        'header': 'Téléchargement',
        'sortable' : true,
        'field': 'downloadCount'
    },
    {
        'header': 'Commentaire',
        'sortable' : true,
        'field': 'comments',
        'subfield': 'length'
    }];
        
    $scope.datatable = new DataTable('post', $scope.columns);
    $scope.datatable.populate = 'comments,category';
    $scope.datatable.load().then(function () {

    });
	
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
		var confirm = $mdDialog.confirm({
			title: 'Attention',
			content: 'Êtes-vous sur de vouloir valider cette catégorie ?',
			ok: 'Oui, supprimer',
			cancel:'Non, annuler'
		});
		$mdDialog.show(confirm).then(function() {
			f.$delete(function() {
				var index = $scope.categorys.indexOf(f);
				$scope.categorys.splice(index, 1);
			});
		}, function() {

		});
	}


}]);