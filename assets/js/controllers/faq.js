/**
 * Created by alex on 27/09/15.
 */
var tooFrenchControllers = angular.module('tooFrenchCtrl');
tooFrenchControllers.controller('FaqCtrl', ['$rootScope', '$scope',

    function ($rootScope, $scope) {
        $scope.toggleStudentTeacher = $rootScope.isTeacher ? 0 : 1;

        $scope.teacherStatus = [];

        $scope.studentStatus = [];
    }
]);