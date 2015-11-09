/**
 * Created by alex on 09/11/15.
 */
/**
 * @ngdoc function
 * @name tooFrenchApp.directive:LoadingScreen
 * @description
 * # LoadingScreen
 * Directive that show a loading screen during application bootstrapping
 */
var tooFrenchApp = angular.module('tooFrenchApp');

// This CSS class-based directive controls the pre-bootstrap loading screen. By
// default, it is visible on the screen; but, once the application loads, we'll
// fade it out and remove it from the DOM.
// --
// NOTE: Normally, I would probably just jQuery to fade-out the container; but,
// I thought this would be a nice moment to learn a bit more about AngularJS
// animation. As such, I'm using the ng-leave workflow to learn more about the
// ngAnimate module.
tooFrenchApp.directive(
    "mAppLoading",
    function ($animate, $timeout) {

        // Return the directive configuration.
        return ({
            link: link,
            restrict: "C"
        });


        // I bind the JavaScript events to the scope.
        function link(scope, element, attributes) {

            $animate.leave(element.children().eq(1)).then(
                function cleanupAfterAnimation() {

                    // Remove the root directive element.
                    element.remove();

                    // Clear the closed-over variable references.
                    scope = element = attributes = null;

                }
            );

        }

    }
);