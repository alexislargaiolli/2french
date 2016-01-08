var tooFrenchControllers = angular.module('tooFrenchApp');
tooFrenchControllers.controller('MyProfileCtrl', ['$rootScope', '$scope', 'Session', 'uiGmapGoogleMapApi', 'uiGmapLogger', 'Profile', 'Formation', 'Equipment', 'Extra', 'Service', 'FormationLevel', 'UserFavList', '$translate', '$upload', '$timeout', 'Lightbox', '$http', 'Tour', 'AUTH_EVENTS', 'Review',

    function ($rootScope, $scope, Session, uiGmapGoogleMapApi, uiGmapLogger, Profile, Formation, Equipment, Extra, Service, FormationLevel, UserFavList, $translate, $upload, $timeout, Lightbox, $http, Tour, AUTH_EVENTS, Review) {


        ////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////              COMMON            ////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////
        $scope.profileLocale = $translate.preferredLanguage();
        $scope.editCity = false;
        $scope.optionsCity = {
            types: ['(regions)']
        };
        $scope.period = moment().date(10).format('MM-YYYY');
        $scope.scheduleIndex = -1;
        $scope.needSave = false;
        var tourProfile;

        var findShedule = function (period) {
            if ($scope.profile.schedules.length == 0) {
                return -1;
            }
            var i = 0;
            for (i = 0; i < $scope.profile.schedules.length; i++) {
                if ($scope.profile.schedules[i].period == period) {
                    return i;
                }
            }
            return -1;
        }

        $scope.reviews = [];

        $scope.loginRequest.promise.then(function () {
            $scope.profile = Profile.get({
                id: Session.user.profile
            }, function () {
                if ($scope.isTeacher) {
                    $scope.updateMap();
                    //If schedules is not empty, searches for a schedules for the current pediod
                    if ($scope.profile.schedules && $scope.profile.schedules.length > 0) {
                        $scope.scheduleIndex = findShedule($scope.period);
                    }
                    else {
                        $scope.profile.schedules = [];
                    }
                    //If none schedule found, creates one
                    if ($scope.scheduleIndex == -1) {
                        var schedule = {period: $scope.period, dayoff: [], undispos: []};
                        $scope.scheduleIndex = $scope.profile.schedules.push(schedule) - 1;
                    }
                    if ($rootScope.isTeacher && !Session.user.tour) {
                        Tour.startProfileTour();
                    }
                }
            });





            /**
             * Save profile modifications
             */
            $scope.save = function () {
                $scope.profile.$update(function (p, response) {
                    $scope.needSave = false;
                    Profile.validateProfile(p, function(pr, response){
                        console.log('validate');
                    });
                });
            }

            /**
             * Change language listener
             * @param lang the language to set
             */
            $scope.changeProfileLanguage = function (lang) {
                $scope.profileLocale = lang;
            };

            /**
             * Upload profile picture listner
             * @param url url of the image
             */
            $scope.onUpload = function (url) {
                $scope.profile.photo = url;
                $scope.save();
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
                $scope.optionsLocation = {types: ['geocode']};
                $scope.diplomaFile = null;
                $scope.diplomaUploading = false;
                $scope.selectedPhotoIndex = 0;

                Review.getTeacherReviews(Session.user.profile).then(function (reviews) {
                    $scope.reviews = reviews;
                });

                var handleDiplomaSelect = function (evt) {
                    $timeout(function () {
                        $scope.diplomaFile = evt.currentTarget.files[0];
                    });
                };

                $scope.uploadDiploma = function () {
                    $scope.diplomaUploading = true;
                    var filename = Session.userId;
                    $scope.diplomaProgress =0;
                    $upload.upload({
                        url: 'diploma/upload',
                        file: $scope.diplomaFile,
                        user: filename
                    }).progress(function (evt) {
                        $scope.diplomaProgress = Math.round((evt.loaded * 100.0) / evt.total);
                    }).success(function (data, status, headers, config) {
                        $rootScope.session.diploma = data;
                        $scope.diplomaUploading = false;
                    }).error(function (data, status, headers, config) {
                        console.log('error ' + data);
                        $scope.diplomaUploading = false;
                    });
                }

                $scope.isProfileComplete = function () {
                    return $scope.profile.photo && $scope.profile.motivation && $scope.profile.hourRate && $scope.profile.formations.length > 0 && ($rootScope.session.diplomagit && $rootScope.session.diploma.diplomaValidated);
                }

                $timeout(function () {
                    var inputId = '#diplomaInput';
                    var elts = angular.element(inputId);
                    elts.on('change', handleDiplomaSelect);
                });

                $scope.activeAccomodation = function () {
                    $scope.profile.activeAccomodation = true;
                    $scope.save();
                }

                $scope.cancelAccomodation = function () {
                    $scope.profile.activeAccomodation = false;
                    $scope.save();
                }

                /**
                 * Upload picture listener for accomodation pictures
                 * @param url
                 */
                $scope.onUploadAccomodation = function (url) {
                    if (!$scope.profile.photos) {
                        $scope.profile.photos = [];
                    }
                    $scope.profile.photos[$scope.selectedPhotoIndex] = {url: url};
                    $scope.save();
                }

                /**
                 * Delete accomodation image
                 * @param index index the image to delete
                 */
                $scope.deletePhoto = function (index) {
                    $scope.profile.photos.splice(index, 1);
                    $scope.save();
                }

                $scope.selectPhoto = function (index) {
                    $scope.selectedPhotoIndex = index;
                }

                $scope.openLightboxModal = function () {
                    if ($scope.profile.photos[$scope.selectedPhotoIndex]) {
                        Lightbox.openModal($scope.profile.photos, $scope.selectedPhotoIndex);
                    }
                };

                /**
                 * Event call after change location to update google map component
                 */
                $scope.updateLocation = function () {
                    console.log('updateLocation');
                    if ($scope.editLocation) {
                        $scope.updateMap();
                        $scope.editLocation = false;
                    }
                    else {
                        $scope.editLocation = true;
                    }
                }

                $scope.$on('g-places-autocomplete:select', function (event, args) {
                    if (!$scope.profile.accomodationCoords) {
                        $scope.profile.accomodationCoords = {};
                    }
                    $scope.profile.accomodationCoords.lat = args.geometry.location.lat();
                    $scope.profile.accomodationCoords.lng = args.geometry.location.lng();
                    $scope.updateMap();
                    $timeout(function () {
                        $scope.save();
                        angular.element('#editLocationBtn').click();
                    }, 10);
                });

                /**
                 * Update the google map component
                 */
                $scope.updateMap = function () {
                    var lat, lon;
                    if ($scope.profile.accomodationCoords) {
                        lat = $scope.profile.accomodationCoords.lat;
                        lon = $scope.profile.accomodationCoords.lng;
                    }
                    else {
                        lat = 48.856614;
                        lon = 2.3522219000000177;
                    }

                    if (lat) {
                        $scope.map = {
                            center: {
                                latitude: lat,
                                longitude: lon
                            },
                            zoom: 14
                        };
                        $scope.map.markers = [{
                            "id": '1',
                            "latitude": lat,
                            "longitude": lon,
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
                    $scope.save();
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
                    $scope.save();
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


                var findUndispo = function (date) {
                    if ($scope.profile.schedules[$scope.scheduleIndex].undispos.length == 0) {
                        return -1;
                    }
                    var i = 0;
                    for (i = 0; i < $scope.profile.schedules[$scope.scheduleIndex].undispos.length; i++) {
                        if ($scope.profile.schedules[$scope.scheduleIndex].undispos[i].date === date) {
                            return i;
                        }
                    }
                    return -1;
                }


                /* CALENDAR */
                $scope.dayClick = function (event, date) {
                    event.preventDefault() // prevent the select to happen
                    var v = date.valueOf();
                    var i = findUndispo(v);
                    if (i == -1) {
                        $scope.profile.schedules[$scope.scheduleIndex].undispos.push({date: v, css: 'pm'});
                    }
                    else {
                        var undispo = $scope.profile.schedules[$scope.scheduleIndex].undispos[i];
                        if (undispo.css == 'pm') {
                            $scope.profile.schedules[$scope.scheduleIndex].undispos[i].css = 'am';
                        }
                        else if (undispo.css == 'am') {
                            $scope.profile.schedules[$scope.scheduleIndex].undispos[i].css = 'day';
                        }
                        else if (undispo.css == 'day') {
                            $scope.profile.schedules[$scope.scheduleIndex].undispos.splice(i, 1);
                        }
                    }
                    $scope.needSave = true;
                }

                $scope.onMonthChanged = function (newMonth, oldMonth) {
                    $scope.period = newMonth.format('MM-YYYY');
                    $scope.scheduleIndex = findShedule($scope.period);
                    if ($scope.scheduleIndex == -1) {
                        var schedule = {period: $scope.period, dayoff: [], undispos: []};
                        $scope.scheduleIndex = $scope.profile.schedules.push(schedule) - 1;
                    }
                };

            }
        });
    }

]);