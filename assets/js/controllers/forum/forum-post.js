'use strict';
/**
 * @ngdoc function
 * @name tooFrenchApp.controller:ForumCtrl
 * @description
 * # ForumCtrl
 * Controller of the tooFrenchApp
 */
var ctrl = angular.module('tooFrenchApp');
ctrl.controller('ForumPostCtrl', ['$scope', 'Post', '$stateParams', 'Session', '$timeout', function ($scope, Post, $stateParams, Session, $timeout) {
    $scope.pageSize = 5;
    $scope.pageIndex = 1;
    $scope.post = null;
    $scope.loading = true;
    $scope.hasComment = true;
    $scope.comments = [];
    $scope.count = 0;
    Post.findOne($stateParams.postId).then(function (post) {
        $scope.post = post;
    });

    Post.getComments($stateParams.postId, 1, $scope.pageSize, $scope.pageIndex).then(function (count) {
        $scope.loading = true;
        $scope.count = count.count;
        $scope.hasComment = $scope.count != 0;
        $scope.pageChanged();
    });

    var goToLast = function(){
        $scope.loading = true;
        Post.getComments($stateParams.postId, 1, $scope.pageSize, $scope.pageIndex).then(function (count) {
            $scope.count = count.count;
            $scope.pageIndex = Math.ceil($scope.count / $scope.pageSize);
            $scope.hasComment = $scope.count != 0;
            $scope.pageChanged();
        })
    }

    $scope.pageChanged = function () {
        $scope.loading = true;
        Post.getComments($stateParams.postId, 0, $scope.pageSize, $scope.pageIndex).then(function (comments) {
            $scope.comments = comments;
            $scope.loading = false;
        });
    }

    var c = Post.getCommentResource();
    $scope.com = new c();
    $scope.comStatus = null;

    $scope.addComment = function () {
        $scope.com.author = Session.user.profile;
        $scope.com.post = $scope.post.id;
        $scope.com.$save(function (com) {
            $scope.com = new c();
            goToLast();
        }, function () {
            $scope.errorCom = 'forum.post.comm.add.error';
            $scope.comStatus = -1;
        });
    }
}]);