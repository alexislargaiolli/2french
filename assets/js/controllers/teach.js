/**
 * Created by alex on 27/09/15.
 */
var tooFrenchControllers = angular.module('tooFrenchApp');
tooFrenchControllers.controller('TeachCtrl', ['$rootScope', '$scope',

    function ($rootScope, $scope) {
        $scope.toggled = [true, true, true, true];
    }
]);