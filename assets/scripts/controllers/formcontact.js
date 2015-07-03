var tooFrenchControllers = angular.module('tooFrenchCtrl');
tooFrenchControllers.controller('FormContactCtrl', ['$scope', '$http', 'vcRecaptchaService',

    function($scope, $http, vcRecaptchaService) {
        $scope.message = {};

        $scope.response = null;

        $scope.error = null;

        $scope.success = false;

        $scope.sendMessage = function(){
            $scope.success = false;
            $scope.error = null;
            if($scope.response){
                var response = vcRecaptchaService.getResponse();
                $http.post('contact', {message : $scope.message, recaptcha : $scope.response}).success(function(data){
                    $scope.success = true;
                }).error(function(data){
                    $scope.error = "Une erreur c'est produite...";
                });
            }
            else{
                $scope.error = "Vous devez valider le captcha.";
            }
        }

        $scope.setResponse = function (response) {
            $scope.response = response;
        };
    }
]);