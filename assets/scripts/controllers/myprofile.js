var tooFrenchControllers = angular.module('tooFrenchCtrl');
tooFrenchControllers.controller('MyProfileCtrl', ['$scope', 'Session', 'uiGmapGoogleMapApi', 'uiGmapLogger', 'Profile', 'Formation', 'Equipment', 'Extra', 'Service', 'FormationLevel',

	function($scope, Session, uiGmapGoogleMapApi, uiGmapLogger, Profile, Formation, Equipment, Extra, Service, FormationLevel) {
		$scope.editable = true;
		$scope.editCity = false;
		$scope.editLocation = false;
		$scope.formulaToAdd = {};
		$scope.formationToAdd = {};		
		$scope.formations = Formation.query();
		$scope.formationLevels = FormationLevel.query();
		$scope.equipments = Equipment.query();
		$scope.services = Service.query();
		$scope.extras = Extra.query();

		$scope.profile = Profile.get({
			id: Session.user.profile
		}, function() {			
			updateMap();
		});

		$scope.optionsCity = {
			types: ['(regions)']
		};

		$scope.optionsLocation = {
			
		};

		uiGmapGoogleMapApi.then(function(maps) {

		});

		$scope.onUpload = function(url) {
			$scope.profile.photo = url;
		}

		$scope.onUploadAccomodation = function(url) {
			if (!$scope.profile.photos) {
				$scope.profile.photos = [];
			}
			$scope.profile.photos.push({url : url});
		}

		$scope.updateLocation = function() {
			if ($scope.editLocation) {
				updateMap();
			}
		}

		$scope.save = function() {
			$scope.profile.$update(function(p, response){
				
			});
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

		$scope.deletePhoto = function(index){
			$scope.profile.photos.splice(index, 1);
		}

		var updateMap = function(){
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
		}

		/* CALENDAR */
		$scope.dayClick = function(event, date){
			if(!$scope.profile.daySelected){
				$scope.profile.daySelected = [];
			}
			$scope.profile.daySelected.push(date.valueOf());
		}
	}
]);