angular.module('tooFrenchApp').controller('TranslateController', function($translate, $scope) {
  $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
  };

  $scope.currentLanguage = function(){
  	return $translate.use();
  }
});