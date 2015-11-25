var tooFrench = angular.module('tooFrenchApp');

tooFrench.controller('TranslateCtrl', ['$translate', '$scope', '$rootScope', '$http', 'tmhDynamicLocale', 'AUTH_EVENTS',
    function ($translate, $scope, $rootScope, $http, tmhDynamicLocale, AUTH_EVENTS) {
        $scope.changeLanguage = function (langKey) {
            $translate.use(langKey);
        };

        $rootScope.$on('$translateChangeSuccess', function () {
            $rootScope.currentLocale = $translate.use();
            tmhDynamicLocale.set($rootScope.currentLocale);
            if ($rootScope.session.authenticated) {
                $http.post('/user/userChangeLocale', {
                    locale: $rootScope.currentLocale
                }).success(function (data, status, headers, config) {

                }).
                    error(function (data, status, headers, config) {

                    });
            }
        });

        $rootScope.$on(AUTH_EVENTS.loginSuccess, function (event, args) {
            $scope.changeLanguage(args.data.user.defaultLocale);
        });

        $scope.currentLanguage = function () {
            return $translate.use();
        }

        $rootScope.currentLocale = $translate.preferredLanguage();
    }
]);