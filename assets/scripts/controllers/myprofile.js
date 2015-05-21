var tooFrenchControllers = angular.module('tooFrenchCtrl');
tooFrenchControllers.controller('MyProfileCtrl', ['$scope', 'Session', 'uiGmapGoogleMapApi', 'uiGmapLogger', 'Profile', 'Formation', 'Equipment', 'Extra', 'Service', 'FormationLevel', '$translate',

	function($scope, Session, uiGmapGoogleMapApi, uiGmapLogger, Profile, Formation, Equipment, Extra, Service, FormationLevel, $translate) {
		$scope.profileLocale = $translate.preferredLanguage();
		$scope.profileLang = $translate.preferredLanguage().substring(0, 2);

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

		$scope.changeProfileLanguage = function(lang){
			$scope.profileLocale = lang;
			$scope.profileLang = lang.substring(0, 2);
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

		$scope.createFormula = function(){
			$scope.formulaToAdd = {};
		}

		$scope.addFormula = function() {
			if (!$scope.profile.formulas) {
				$scope.profile.formulas = new Array();
			}
			var index = $scope.profile.formulas.indexOf($scope.formulaToAdd);
			if(index == -1){
				$scope.profile.formulas.push($scope.formulaToAdd);
			}
			
			$scope.formulaToAdd = {};
			$('#dlgAddFormula').modal('hide');
		}

		$scope.editFormula = function(formula){
			$scope.formulaToAdd = formula;
		}

		$scope.deleteFormula = function(formula){
			var index = $scope.profile.formulas.indexOf(formula);
			$scope.profile.formulas.splice(index, 1);
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
				lat = $scope.profile.location.geometry.location.F;
				lon = $scope.profile.location.geometry.location.A;
				console.log($scope.profile.location.geometry);
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
			var index = $scope.profile.daySelected.indexOf(date.valueOf());
			if( index == -1){ //If day is not already selected, day is added to selected days list
				$scope.profile.daySelected.push(date.valueOf());	
			}
			else{ //Else remove the day from selected day list
				$scope.profile.daySelected.splice(index, 1);	
			}
			
		}
	}
]);