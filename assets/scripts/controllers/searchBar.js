var tooFrenchControllers = angular.module('tooFrenchCtrl');
tooFrenchControllers.controller('SearchBarCtrl', ['$scope', '$state', 'Profile', '$http', '$timeout',

	function($scope, $state, Profile, $http, $timeout) {
		$scope.city = null;
		$scope.optionsCity = {
			types: ['(regions)']
		};
		$scope.search = function(){
			if($scope.city){
				var city = $scope.city.address_components[0].long_name;
			}
			console.log(city);
			$state.go('results', {city : city});
		}
	}
]);