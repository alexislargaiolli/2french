/**
 * Created by alex on 27/09/15.
 */
var tooFrenchControllers = angular.module('tooFrenchCtrl');
tooFrenchControllers.controller('LearnCtrl', ['$rootScope', '$scope',

    function ($rootScope, $scope) {
        $scope.toggled = [true, true, true, true, true, true];
    }
]);