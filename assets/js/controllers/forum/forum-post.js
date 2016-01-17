'use strict';
/**
 * @ngdoc function
 * @name tooFrenchApp.controller:ForumCtrl
 * @description
 * # ForumCtrl
 * Controller of the tooFrenchApp
 */
var ctrl = angular.module('tooFrenchApp');
ctrl.controller('ForumPostCtrl', ['$scope', 'Post', '$stateParams', 'Session', '$timeout', '$mdDialog', '$translate', '$state', function ($scope, Post, $stateParams, Session, $timeout, $mdDialog, $translate, $state) {
    $scope.pageSize = 5;
    $scope.pageIndex = 1;
    $scope.post = null;
    $scope.loading = true;
    $scope.hasComment = true;
    $scope.comments = [];
    $scope.count = 0;
    $scope.toolbar = [
        ['h4', 'h5', 'h6', 'quote'],
        ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
        ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
        ['insertImage', 'insertLink', 'insertVideo', 'wordcount', 'charcount']
    ];

    Post.findOne($stateParams.postId).then(function (post) {
        $scope.post = post;


        if ($scope.isAdmin) {
            $scope.removePost = function () {
                var confirm = $mdDialog.confirm({
                    title: $translate.instant('common.confirmation.title'),
                    content: $translate.instant('post.remove.confirm.message'),
                    ok: 'Oui, supprimer',
                    cancel: 'Non, annuler'
                });
                $mdDialog.show(confirm).then(function () {
                    Post.getResource().remove({id: $stateParams.postId}, function () {
                        $state.go('forum');
                    });
                }, function () {

                });
            }

            $scope.removeComment = function (comment) {
                var confirm = $mdDialog.confirm({
                    title: $translate.instant('common.confirmation.title'),
                    content: $translate.instant('post.comment.remove.confirm.message'),
                    ok: 'Oui, supprimer',
                    cancel: 'Non, annuler'
                });
                $mdDialog.show(confirm).then(function () {
                    Post.getCommentResource().remove({id: comment.id}, function () {
                        var index = $scope.comments.indexOf(comment);
                        $scope.comments.splice(index, 1);
                    });
                }, function () {

                });
            }
        }
    });

    Post.getComments($stateParams.postId, 1, $scope.pageSize, $scope.pageIndex).then(function (count) {
        $scope.loading = true;
        $scope.count = count.count;
        $scope.hasComment = $scope.count != 0;
        $scope.pageChanged();
    });

    var goToLast = function () {
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