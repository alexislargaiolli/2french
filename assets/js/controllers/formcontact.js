var tooFrenchControllers = angular.module('tooFrenchCtrl');
tooFrenchControllers.controller('FormContactCtrl', ['$scope', '$http', 'vcRecaptchaService', '$translate', '$stateParams',

    function ($scope, $http, vcRecaptchaService, $translate, $stateParams) {
        $scope.message = {};

        $scope.response = null;

        $scope.error = null;

        $scope.success = false;

        $scope.sendMessage = function () {
            $scope.success = false;
            $scope.error = null;
            if ($scope.response) {
                $http.post('contact', {message: $scope.message, recaptcha: $scope.response}).success(function (data) {
                    $scope.success = true;
                }).error(function (data) {
                    $scope.error = "Une erreur c'est produite...";
                });
            }
            else {
                $scope.error = "Vous devez valider le captcha.";
            }
        }

        $scope.setResponse = function (response) {
            $scope.response = response;
        };

        $scope.themes = [];

        for (var i = 0; i < 2; i++) {
            $scope.themes[i] = {};
            $scope.themes[i].value = $translate.instant('contact.theme.' + i);
            $scope.themes[i].key = $translate.instant('contact.theme.' + i + '.key');

            if ($stateParams.theme && $stateParams.theme == $scope.themes[i].key) {
                $scope.message.theme = $scope.themes[i];
            }
        }
    }
]);