'use strict';
/**
 * @ngdoc function
 * @name tooFrenchApp.controller:ForumCtrl
 * @description
 * # ForumCtrl
 * Controller of the tooFrenchApp
 */
var ctrl = angular.module('tooFrenchApp');
ctrl.controller('ForumCreatePostCtrl', ['$scope', '$timeout', 'Post', 'PostCategory', 'Session', '$state' , '$upload', '$stateParams', function($scope, $timeout, Post, PostCategory, Session, $state, $upload, $stateParams) {
    var p = Post.getResource();
    $scope.post = new p();
    if($stateParams.teacher == 1) {
        $scope.categories = PostCategory.query({teacher : true});
    }
    else{
        $scope.categories = PostCategory.query({teacher : false});
    }
    $scope.attachedFiles = [];
    $scope.uploading = false;
    $scope.uploadingFiles = [];

    var handleFileSelect = function(evt) {
        $timeout(function() {
            console.log('file added');
            var f = evt.currentTarget.files[0];
            $scope.attachedFiles.push(f);
        });
    };

    $timeout(function() {
        var inputId = '#fileInput';
        var elts = angular.element(inputId);
        elts.on('change', handleFileSelect);
    });

    $scope.removeFile = function(f){
        var index = $scope.attachedFiles.indexOf(f);
        if(index != -1){
            $scope.attachedFiles.splice(index);
        }
    }

    $scope.createPost = function(){
        if($scope.attachedFiles.length > 0){
            $scope.post.files = [];
            $scope.uploading = true;
            var i=0;
            for(i=0; i<$scope.attachedFiles.length; ++i){
                var file = $scope.attachedFiles[i];
                var user = Session.userId;
                $scope.uploadingFiles[file.name] = {};
                $scope.uploadingFiles[file.name].uploading = true;
                $scope.uploadingFiles[file.name].progress = 0;
                $upload.upload({
                    url: 'post/uploadFile',
                    file: file,
                    user:user
                }).progress(function(evt) {
                    $scope.uploadingFiles[evt.config.file.name].progress = Math.round((evt.loaded * 100.0) / evt.total);
                }).success(function(data, status, headers, config) {
                    $scope.uploadingFiles[config.file.name].uploading = false;
                    $scope.post.files.push(data);
                    onFileUploaded();
                }).error(function(data, status, headers, config) {
                    $scope.uploadingFiles[config.file.name].uploading = false;
                    $scope.uploadingFiles[config.file.name].error = true;
                    onFileUploaded();
                });
            }
        }
        else{
            submitPost();
        }
    }

    var onFileUploaded = function(){
        var i=0;
        var allUploaded = true;
        var hasError = false;
        for(i=0; i<$scope.uploadingFiles.length; ++i){
            if($scope.uploadingFiles[i].uploading){
                allUploaded = false;
            }
            if($scope.uploadingFiles[i].error){
                hasError = true;
            }
        }
        $scope.uploading = !allUploaded;
        if(allUploaded && !hasError){
            submitPost();
        }
    }

    var submitPost = function(){
        $scope.post.teacher = $stateParams.teacher == 1;
        if(!$scope.isTeacher){
            $scope.post.teacher = false;
        }
        $scope.post.author = Session.user.profile;
        $scope.post.locale = $scope.currentLocale;
        $scope.post.comments = [];
        $scope.post.$save(function(post){
            $state.go('forum.post', {postId : post.id});
        });
    }

}]);