var tooFrench = angular.module('tooFrenchCtrl');

tooFrench.controller('TranslateCtrl', ['$translate', '$scope', '$rootScope', 'LOCALE_EVENTS',
	function($translate, $scope, $rootScope, LOCALE_EVENTS) {
		$scope.changeLanguage = function(langKey) {
			$rootScope.$broadcast(LOCALE_EVENTS.localeChange, {
				old: $translate.use(),
				next: langKey
			})
			$translate.use(langKey);
		};

		$scope.currentLanguage = function() {
			return $translate.use();
		}
	}
]);