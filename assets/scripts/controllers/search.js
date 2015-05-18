var tooFrenchControllers = angular.module('tooFrenchCtrl');
tooFrenchControllers.controller('SearchCtrl', ['$scope', '$stateParams', '$state', 'Profile', '$http', '$timeout',

	function($scope, $stateParams, $state, Profile, $http, $timeout) {
		$scope.results = [];
		$scope.city = $stateParams.city;

		$scope.search = function(){
			console.log($scope.city);
			$http.get('/profile/findByCity', {params : {city : $scope.city}}).
			  success(function(profiles, status, headers, config) {
			    	angular.forEach(profiles, function(profile, key) {
			    		console.log(profile.firstname);
						$scope.results.push(profile);
					});
					console.log($scope.results);
			    
				//$state.go('results');
			  }).
			  error(function(data, status, headers, config) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			  });			
		}
		$scope.search();
	}
]);