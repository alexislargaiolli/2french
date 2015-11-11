var tooFrench = angular.module('tooFrenchApp');

tooFrench.controller('TranslateCtrl', ['$translate', '$scope', '$rootScope', 'LOCALE_EVENTS', '$http',
    function ($translate, $scope, $rootScope, LOCALE_EVENTS, $http) {
        $scope.changeLanguage = function (langKey) {
            $rootScope.$broadcast(LOCALE_EVENTS.localeChange, {
                old: $translate.use(),
                next: langKey
            })
            $translate.use(langKey);
            $rootScope.currentLocale = $translate.preferredLanguage();
            $rootScope.currentLg = $translate.preferredLanguage().substring(0, 2);
            $http.post('/user/userChangeLocale', {
                locale: $rootScope.currentLg
            }).success(function (data, status, headers, config) {

            }).
            error(function (data, status, headers, config) {

            });
        };

        $scope.currentLanguage = function () {
            return $translate.use();
        }

        $rootScope.currentLocale = $translate.preferredLanguage();
        $rootScope.currentLg = $translate.preferredLanguage().substring(0, 2);
    }
]);