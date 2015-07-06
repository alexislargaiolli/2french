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
			var i =0;
			var days = [];
			var periods = [];
			for(i=0; i< $scope.schedules.length; i++){
				if($scope.schedules[i].undispos.length > 0){
					periods.push($scope.schedules[i].period);
					var j=0;
					for(j=0; j<$scope.schedules[i].undispos.length; j++){
						days.push($scope.schedules[i].undispos[j]);
					}
				}
			}
			$state.go('results', {city : city, days : JSON.stringify(days), periods : JSON.stringify(periods)});
		}

		$scope.scheduleIndex = 0;

		$scope.schedules = [{period : moment().date(10).format('MM-YYYY'), undispos : []}];

		$scope.onDayClick = function (event, date) {
			var v = date.valueOf();
			var i = findUndispo(v);
			if (i == -1) {
				$scope.schedules[$scope.scheduleIndex].undispos.push({"date": v, "css": "am"});
			}
			else {
				var undispo = $scope.schedules[$scope.scheduleIndex].undispos[i];
				if (undispo.css == 'am') {
					$scope.schedules[$scope.scheduleIndex].undispos[i].css = "pm";
				}
				else if (undispo.css == 'pm') {
					$scope.schedules[$scope.scheduleIndex].undispos[i].css = "day";
				}
				else if (undispo.css == 'day') {
					$scope.schedules[$scope.scheduleIndex].undispos.splice(i, 1);
				}
			}
		}

		$scope.onMonthChanged = function (newMonth, oldMonth) {
			var period = newMonth.format('MM-YYYY');
			$scope.scheduleIndex = findShedule(period);
			if($scope.scheduleIndex == -1){
				var schedule = {period : period, undispos: []};
				$scope.scheduleIndex = $scope.schedules.push(schedule) - 1;
			}
		};

		$timeout(function(){
			$('.dropdown-menu input, .dropdown-menu').click(function(e) {
				e.stopPropagation();
			});
		},100);

		var findShedule = function (period) {
			var i = 0;
			for (i = 0; i < $scope.schedules.length; i++) {
				if ($scope.schedules[i].period == period) {
					return i;
				}
			}
			return -1;
		}

		var findUndispo = function (date) {
			if ($scope.schedules[$scope.scheduleIndex].undispos.length == 0) {
				return -1;
			}
			var i = 0;
			for (i = 0; i < $scope.schedules[$scope.scheduleIndex].undispos.length; i++) {
				if ($scope.schedules[$scope.scheduleIndex].undispos[i].date === date) {
					return i;
				}
			}
			return -1;
		}
	}
]);