/**
 * Created by alex on 09/11/15.
 */
var tooFrenchApp = angular.module('tooFrenchApp');

tooFrenchApp.filter('range', function () {
    return function (input, min, max) {
        min = parseInt(min); //Make string input int
        max = parseInt(max);
        for (var i = min; i < max; i++)
            input.push(i);
        return input;
    };
});
