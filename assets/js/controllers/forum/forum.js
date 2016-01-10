'use strict';
/**
 * @ngdoc function
 * @name tooFrenchApp.controller:ForumCtrl
 * @description
 * # ForumCtrl
 * Controller of the tooFrenchApp
 */
var ctrl = angular.module('tooFrenchApp');
ctrl.controller('ForumCtrl', ['$scope', '$rootScope', 'Post', 'PostCategory', '$timeout', function ($scope, $rootScope, Post, PostCategory, $timeout) {
    $scope.teacherCategories = PostCategory.query({teacher : true});
    $scope.generalCategories = PostCategory.query({teacher : false});
    $scope.pageSize = 5;

    $scope.teacherPostsByCategory = [];
    $scope.generalPostsByCategory = [];

    $scope.recentPosts = [];
    $scope.popularFilePosts = [];
    $scope.popularPosts = [];
    $scope.teacherPostsByCategory = [];

    function reloadLeftPanel(){
        Post.getRecentPost().then(function (posts) {
            $scope.recentPosts = posts;
        });

        Post.getPopularPost().then(function (posts) {
            $scope.popularPosts = posts;
        });

        Post.getPopularFilePost().then(function (posts) {
            $scope.popularFilePosts = posts;
        });
        console.log('reload');
    }
    reloadLeftPanel();

    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
        if(toState && toState.name == 'forum'){
            //reloadLeftPanel();
        }
    });

    $scope.onOpenCategory = function (category) {
        if (!$scope.teacherPostsByCategory[category.id]) {
            $scope.teacherPostsByCategory[category.id] = {};
            $scope.teacherPostsByCategory[category.id].values = [];
            $scope.teacherPostsByCategory[category.id].loading = true;
            $scope.teacherPostsByCategory[category.id] = [];
            Post.getPostTeacherByCategory(category.id, 1).then(function (count) {
                $scope.teacherPostsByCategory[category.id].count = count.count;
                $scope.teacherPostsByCategory[category.id].pageCount = Math.ceil(count / $scope.pageSize);
                $scope.teacherPostsByCategory[category.id].pageIndex = 1;
                Post.getPostTeacherByCategory(category.id, 0, $scope.pageSize, 1).then(function (posts) {
                    $scope.teacherPostsByCategory[category.id].values = posts;
                    $scope.teacherPostsByCategory[category.id].loading = false;
                });
            });
        }
    }

    $scope.pageChanged = function (category) {
        $scope.teacherPostsByCategory[category.id].loading = true;
        Post.getPostTeacherByCategory(category.id, 0, $scope.pageSize, $scope.teacherPostsByCategory[category.id].pageIndex).then(function (posts) {
            $scope.teacherPostsByCategory[category.id].values = posts;
            $scope.teacherPostsByCategory[category.id].loading = false;
        });
    }

    $scope.onOpenGeneralCategory = function (category) {
        if (!$scope.generalPostsByCategory[category.id]) {
            $scope.generalPostsByCategory[category.id] = {};
            $scope.generalPostsByCategory[category.id].posts = [];
            $scope.generalPostsByCategory[category.id].loading = true;
            Post.getPostGeneralByCategory(category.id, 1).then(function (count) {
                $scope.generalPostsByCategory[category.id].count = count.count;
                $scope.generalPostsByCategory[category.id].pageCount = Math.ceil(count / $scope.pageSize);
                $scope.generalPostsByCategory[category.id].pageIndex = 1;
                Post.getPostGeneralByCategory(category.id, 0, $scope.pageSize, 1).then(function (posts) {
                    $scope.generalPostsByCategory[category.id].values = posts;
                    $scope.generalPostsByCategory[category.id].loading = false;
                });
            });
        }
    }

    $scope.pageGeneralChanged = function (category) {
        $scope.generalPostsByCategory[category.id].loading = true;
        Post.getPostGeneralByCategory(category.id, 0, $scope.pageSize, $scope.teacherPostsByCategory[category.id].pageIndex).then(function (posts) {
            $scope.generalPostsByCategory[category.id].values = posts;
            $scope.generalPostsByCategory[category.id].loading = false;
        });
    }

}]);