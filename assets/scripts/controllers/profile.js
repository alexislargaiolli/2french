var tooFrenchControllers = angular.module('tooFrenchCtrl');
tooFrenchControllers.controller('ProfileCtrl', ['$scope', '$stateParams', 'uiGmapGoogleMapApi', 'uiGmapLogger', 'Profile', 'Formation', 'Equipment', 'Service', 'FormationLevel',

	function($scope, $stateParams, uiGmapGoogleMapApi, uiGmapLogger, Profile, Formation, Equipment, Service, FormationLevel) {
		$scope.profile = Profile.get({
			id: $stateParams.profileId
		}, function() {
			var lat = $scope.profile.city.geometry.location.k;
			var lon = $scope.profile.city.geometry.location.D;
			if ($scope.profile.location) {
				lat = $scope.profile.location.geometry.location.k;
				lon = $scope.profile.location.geometry.location.D;
			}
			$scope.map = {
				center: {
					latitude: lat,
					longitude: lon
				},
				zoom: 8
			};
			$scope.map.markers = [{
				"id": "50651",
				"latitude": lat,
				"longitude": lon,
				"title": "Zorgambulance met spoed naar W. Plokkerstraat in Spijkenisse",
				"distance": "585m",
				"hoofdcat": "70",
				"img": "http://snm-crm.nl/wealert/img/70/ambu_6_thumb.jpg?2u",
				"reactiecount": "0",
				"likecount": "0",
				"showWindow": false,
				"date": "2u"
			}];
		});

		uiGmapGoogleMapApi.then(function(maps) {

		});
	}
]);