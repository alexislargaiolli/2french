var tooFrenchControllers = angular.module('tooFrenchCtrl');
tooFrenchControllers.controller('MyProfileCtrl', ['$rootScope','$scope', 'Session', 'uiGmapGoogleMapApi', 'uiGmapLogger', 'Profile', 'Formation', 'Equipment', 'Extra', 'Service', 'FormationLevel', '$translate', '$upload', '$timeout',

    function ($rootScope, $scope, Session, uiGmapGoogleMapApi, uiGmapLogger, Profile, Formation, Equipment, Extra, Service, FormationLevel, $translate, $upload, $timeout) {

        ////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////              COMMON            ////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////
        $scope.profileLocale = $translate.preferredLanguage();
        $scope.profileLang = $translate.preferredLanguage().substring(0, 2);
        $scope.editCity = false;
        $scope.optionsCity = {
            types: ['(regions)']
        };
        $scope.profile = Profile.get({
            id: Session.user.profile
        }, function () {
            if ($scope.isTeacher) {
                updateMap();
            }
        });

        /**
         * Save profile modifications
         */
        $scope.save = function () {
            $scope.profile.$update(function (p, response) {

            });
        }

        /**
         * Change language listener
         * @param lang the language to set
         */
        $scope.changeProfileLanguage = function (lang) {
            $scope.profileLocale = lang;
            $scope.profileLang = lang.substring(0, 2);
        };

        /**
         * Upload profile picture listner
         * @param url url of the image
         */
        $scope.onUpload = function (url) {
            $scope.profile.photo = url;
        }

        ////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////              TEACHER            ///////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////
        if ($scope.isTeacher) {
            $scope.editLocation = false;
            $scope.formulaToAdd = {};
            $scope.formationToAdd = {};
            $scope.formations = Formation.query();
            $scope.formationLevels = FormationLevel.query();
            $scope.equipments = Equipment.query();
            $scope.services = Service.query();
            $scope.extras = Extra.query();
            $scope.optionsLocation = {};
            $scope.diplomaFile = null;

            var handleDiplomaSelect = function(evt) {
                $scope.diplomaFile = evt.currentTarget.files[0];
            };

            $scope.uploadDiploma = function(){
                $upload.upload({
                    url: 'diploma/upload',
                    file: $scope.diplomaFile
                }).progress(function(evt) {
                    $scope.diplomaProgress = Math.round((evt.loaded * 100.0) / evt.total);
                }).success(function(data, status, headers, config) {
                    $rootScope.diploma = data;
                    console.log('success ' + data);
                }).error(function(data, status, headers, config) {
                    console.log('error ' + data);
                });
            }


            $timeout(function() {
                var inputId = '#diplomaInput';
                var elts = angular.element(inputId);
                elts.on('change', handleDiplomaSelect);
            });

            /**
             * Upload picture listener for accomodation pictures
             * @param url
             */
            $scope.onUploadAccomodation = function (url) {
                if (!$scope.profile.photos) {
                    $scope.profile.photos = [];
                }
                $scope.profile.photos.push({url: url});
            }

            /**
             * Delete accomodation image
             * @param index index the image to delete
             */
            $scope.deletePhoto = function (index) {
                $scope.profile.photos.splice(index, 1);
            }

            /**
             * Event call after change location to update google map component
             */
            $scope.updateLocation = function () {
                if ($scope.editLocation) {
                    updateMap();
                }
            }

            /**
             * Initialization of google map component
             */
            uiGmapGoogleMapApi.then(function (maps) {

            });

            /**
             * Initialize formulaToAdd variable
             */
            $scope.createFormula = function () {
                $scope.formulaToAdd = {};
            }

            /**
             * Add the formulaToAdd variable to user formulas list
             */
            $scope.addFormula = function () {
                if (!$scope.profile.formulas) {
                    $scope.profile.formulas = new Array();
                }
                var index = $scope.profile.formulas.indexOf($scope.formulaToAdd);
                if (index == -1) {
                    $scope.profile.formulas.push($scope.formulaToAdd);
                }

                $scope.formulaToAdd = {};
                $('#dlgAddFormula').modal('hide');
            }

            /**
             * Set the formulaToAdd variable as a given formula
             * @param formula formula to edit
             */
            $scope.editFormula = function (formula) {
                $scope.formulaToAdd = formula;
            }

            /**
             * Delete a formula
             * @param formula formula to delete
             */
            $scope.deleteFormula = function (formula) {
                var index = $scope.profile.formulas.indexOf(formula);
                $scope.profile.formulas.splice(index, 1);
            }

            /**
             * Add a new formation to user formation list
             */
            $scope.addFormation = function () {
                if (!$scope.profile.formations) {
                    $scope.profile.formations = new Array();
                }
                $scope.profile.formations.push($scope.formationToAdd);
                $scope.formationToAdd = {};
                $('#dlgAddFormation').modal('hide');
            }

            /**
             * Update the google map component
             */
            var updateMap = function () {
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
            $scope.dayClick = function (event, date) {
                if (!$scope.profile.daySelected) {
                    $scope.profile.daySelected = [];
                }
                var index = $scope.profile.daySelected.indexOf(date.valueOf());
                if (index == -1) { //If day is not already selected, day is added to selected days list
                    $scope.profile.daySelected.push(date.valueOf());
                }
                else { //Else remove the day from selected day list
                    $scope.profile.daySelected.splice(index, 1);
                }

            }
        }

    }
]);