var tooFrenchControllers = angular.module('tooFrenchCtrl');
tooFrenchControllers.controller('RecommandationCtrl', ['$scope', '$stateParams', '$state', '$http', '$timeout',

	function($scope, $stateParams, $state, $http, $timeout) {
		$scope.recommandations = [];
		$scope.utillinks = [];
		$scope.city = $stateParams.city;

		$scope.search = function(){
			$http.get('/recommandation/findByCity', {params : {city : $scope.city}}).
				success(function(recommandations, status, headers, config) {
					angular.forEach(recommandations, function(recommandation, key) {
						$scope.recommandations.push(recommandation);
					});
				}).
				error(function(data, status, headers, config) {

				});
			$http.get('/utilLink/findByCity', {params : {city : $scope.city}}).
				success(function(utillinks, status, headers, config) {
					angular.forEach(utillinks, function(utillink, key) {
						$scope.utillinks.push(utillink);
					});
				}).
				error(function(data, status, headers, config) {

				});
		}
		$scope.search();
	}
]);