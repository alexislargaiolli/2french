var tooFrenchControllers = angular.module('tooFrenchCtrl');
tooFrenchControllers.controller('ProfileCtrl', ['$scope', '$stateParams', 'uiGmapGoogleMapApi', 'uiGmapLogger', 'Profile', 'Formation', 'Equipment', 'Service', 'FormationLevel',

	function($scope, $stateParams, uiGmapGoogleMapApi, uiGmapLogger, Profile, Formation, Equipment, Service, FormationLevel) {
		$scope.editable = $scope.currentUser !== null && $scope.currentUser.profile == $stateParams.profileId;
		$scope.editCity = false;
		$scope.editLocation = false;
		$scope.formulaToAdd = {};
		$scope.formationToAdd = {};
		$scope.profile = Profile.get({
			id: $stateParams.profileId
		}, function() {
			var lat = $scope.profile.city.geometry.location.k;
			var lon = $scope.profile.city.geometry.location.D;
			if ($scope.profile.location) {
				lat = $scope.profile.location.coord.latitude;
				lon = $scope.profile.location.coord.longitude;
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
		$scope.formations = Formation.query();
		$scope.formationLevels = FormationLevel.query();
		$scope.equipments = Equipment.query();
		$scope.services = Service.query();

		$scope.optionsCity = {
			types: ['(regions)']
		};

		$scope.optionsLocation = {
			types: ['(cities)']
		};

		uiGmapGoogleMapApi.then(function(maps) {

		});

		$scope.updateLocation = function() {
			if ($scope.editLocation) {
				var lat = $scope.profile.location.geometry.location.k;
				var lon = $scope.profile.location.geometry.location.D;
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
			}
		}

		$scope.save = function() {
			$scope.profile.$update();
		}
		$scope.addFormula = function() {
			if (!$scope.profile.formulas) {
				$scope.profile.formulas = new Array();
			}
			$scope.profile.formulas.push($scope.formulaToAdd);
			$scope.formulaToAdd = {};
			$('#dlgAddFormula').modal('hide');
		}
		$scope.addFormation = function() {
			if (!$scope.profile.formations) {
				$scope.profile.formations = new Array();
			}
			$scope.profile.formations.push($scope.formationToAdd);
			$scope.formationToAdd = {};
			$('#dlgAddFormation').modal('hide');
		}
	}
]);