var tooFrenchControllers = angular.module('tooFrenchCtrl');
tooFrenchControllers.controller('SearchCtrl', ['$scope', '$stateParams', '$state', 'Profile', '$http', '$timeout', 'UserFavList', 'Session',

	function($scope, $stateParams, $state, Profile, $http, $timeout, UserFavList, Session) {
		$scope.results = [];
		$scope.recommandations = [];
		$scope.utillinks = [];
		$scope.city = $stateParams.city;
		$scope.days = $stateParams.days;
		$scope.messageContent;
		$scope.userToContact;

		$scope.search = function(){
			console.log($scope.days);
			$http.get('/profile/findByCity', {params : {city : $scope.city, days : $scope.days}}).
			  success(function(profiles, status, headers, config) {
					$scope.results = profiles;
					/*angular.forEach(profiles, function(profile, key) {
						$scope.results.push(profile);
					});*/
			  }).
			  error(function(data, status, headers, config) {

			  });
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

		$scope.setUserToContact= function(u){
			$scope.userToContact = u;
		}

		$scope.addFavorit = function(profileId){
			console.log('addFavorit');
			UserFavList.addFavorit(profileId).then(function(){
				alert('ok');
			});
		}


	}
]);