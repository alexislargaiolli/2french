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
			$state.go('results', {city : city, days : $scope.daysSelected});
		}

		$scope.daysSelected = [];

		$scope.onDayClick = function (event, date) {
			var index = $scope.daysSelected.indexOf(date.valueOf());
			if (index == -1) { //If day is not already selected, day is added to selected days list
				$scope.daysSelected.push(date.valueOf());
			}
			else { //Else remove the day from selected day list
				$scope.daysSelected.splice(index, 1);
			}
		}

		$timeout(function(){
			$('.dropdown-menu input, .dropdown-menu').click(function(e) {
				e.stopPropagation();
			});
		},100);
	}
]);