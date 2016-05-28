'use strict';
/**
 * @ngdoc function
 * @name tooFrenchApp.controller:ForumCtrl
 * @description
 * # ForumCtrl
 * Controller of the tooFrenchApp
 */
var ctrl = angular.module('tooFrenchApp');
ctrl.controller('ForumCtrl', ['$scope', '$rootScope', 'Post', 'PostCategory', '$timeout', function($scope, $rootScope, Post, PostCategory, $timeout) {
    /**
     * Array of post categories for teacher
     */
    $scope.teacherCategories = PostCategory.query({
        teacher: true
    });

    /**
     * Array of post categories for student
     */
    $scope.generalCategories = PostCategory.query({
        teacher: false
    });

    /**
     * Number of post to load per page
     * @type {number}
     */
    $scope.pageSize = 5;

    /**
     * Array of post loaded by category for teacher posts
     * @type {Array}
     */
    $scope.teacherPostsByCategory = [];

    /**
     * Array of post loaded by category for general posts
     * @type {Array}
     */
    $scope.generalPostsByCategory = [];

    /**
     * Array of more recent posts
     * @type {Array}
     */
    $scope.recentPosts = [];

    /**
     * Array of more popular posts with files
     * @type {Array}
     */
    $scope.popularFilePosts = [];

    /**
     * Array of more popular posts
     * @type {Array}
     */
    $scope.popularPosts = [];

    /**
     * Load panel of most popular posts
     */
    function reloadLeftPanel() {
        Post.getRecentPost().then(function(posts) {
            $scope.recentPosts = posts;
        });

        Post.getPopularPost().then(function(posts) {
            $scope.popularPosts = posts;
        });

        Post.getPopularFilePost().then(function(posts) {
            $scope.popularFilePosts = posts;
        });
    }
    reloadLeftPanel();

    /**
     * Function trigger on navigation on forum home
     */
    $rootScope.$on('$stateChangeSuccess', function(event, toState) {
        if (toState && toState.name == 'forum') {
            reloadLeftPanel();
            //Clear loaded category when user navigate on forum home page
            $scope.teacherPostsByCategory = [];
            $scope.generalPostsByCategory = [];
        }
    });

    /**
     * Load teacher post of a given category
     * @param category
     */
    $scope.onOpenCategory = function(category) {
        if (!$scope.teacherPostsByCategory[category.id]) {
            $scope.teacherPostsByCategory[category.id] = {};
            $scope.teacherPostsByCategory[category.id].values = [];
            $scope.teacherPostsByCategory[category.id].title = '';

            $scope.searchTeacherPost(category);
        }
    };

    $scope.searchTeacherPost = function(category) {
        var title = $scope.teacherPostsByCategory[category.id].title;
        $scope.teacherPostsByCategory[category.id].loading = true;
        //Count posts to load
        Post.getPostTeacherByCategory(category.id, title, true).then(function(count) {
            $scope.teacherPostsByCategory[category.id].count = count.count;
            $scope.teacherPostsByCategory[category.id].pageCount = Math.ceil(count / $scope.pageSize);
            $scope.teacherPostsByCategory[category.id].pageIndex = 1;

            var title = $scope.teacherPostsByCategory[category.id].title;
            //Load posts
            Post.getPostTeacherByCategory(category.id, title, null, $scope.pageSize, 1).then(function(posts) {
                $scope.teacherPostsByCategory[category.id].values = posts;
                $scope.teacherPostsByCategory[category.id].loading = false;
            });
        });
    };

    $scope.clearTeacherFilters = function(category) {
        $scope.teacherPostsByCategory[category.id].title = '';
        $scope.searchTeacherPost(category);
    };

    /**
     * Load next post page of a given teacher category
     * @param category
     */
    $scope.pageChanged = function(category) {
        $scope.teacherPostsByCategory[category.id].loading = true;
        var title = $scope.teacherPostsByCategory[category.id].title;
        Post.getPostTeacherByCategory(category.id, title, null, $scope.pageSize, $scope.teacherPostsByCategory[category.id].pageIndex).then(function(posts) {
            $scope.teacherPostsByCategory[category.id].values = posts;
            $scope.teacherPostsByCategory[category.id].loading = false;
        });
    };

    /**
     * Load general post of a given category
     * @param category
     */
    $scope.onOpenGeneralCategory = function(category) {
        if (!$scope.generalPostsByCategory[category.id]) {
            $scope.generalPostsByCategory[category.id] = {};
            $scope.generalPostsByCategory[category.id].posts = [];
            $scope.generalPostsByCategory[category.id].title = '';
            
            $scope.searchGeneralPost(category);
        }
    };

    $scope.searchGeneralPost = function(category) {
        var title = $scope.generalPostsByCategory[category.id].title;
        $scope.generalPostsByCategory[category.id].loading = true;
        Post.getPostGeneralByCategory(category.id, title, true).then(function(count) {
            $scope.generalPostsByCategory[category.id].count = count.count;
            $scope.generalPostsByCategory[category.id].pageCount = Math.ceil(count / $scope.pageSize);
            $scope.generalPostsByCategory[category.id].pageIndex = 1;
            
            var title = $scope.generalPostsByCategory[category.id].title;
            Post.getPostGeneralByCategory(category.id, title, null, $scope.pageSize, 1).then(function(posts) {
                $scope.generalPostsByCategory[category.id].values = posts;
                $scope.generalPostsByCategory[category.id].loading = false;
            });
        });
    };

    $scope.clearGeneralFilters = function(category) {
        $scope.generalPostsByCategory[category.id].title = '';
        $scope.searchGeneralPost(category);
    };

    /**
     * Load next post page of a given general category
     * @param category
     */
    $scope.pageGeneralChanged = function(category) {
        $scope.generalPostsByCategory[category.id].loading = true;
        var title = $scope.generalPostsByCategory[category.id].title;
        console.log('blablabla');
        Post.getPostGeneralByCategory(category.id, title, null, $scope.pageSize, $scope.generalPostsByCategory[category.id].pageIndex).then(function(posts) {
            $scope.generalPostsByCategory[category.id].values = posts;
            $scope.generalPostsByCategory[category.id].loading = false;
        });
    };

}]);