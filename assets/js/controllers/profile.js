var tooFrenchControllers = angular.module('tooFrenchCtrl');
tooFrenchControllers.controller('ProfileCtrl', ['$scope', '$stateParams', 'uiGmapGoogleMapApi', 'uiGmapLogger', 'Profile', 'Formation', 'Equipment', 'Service', 'FormationLevel', 'Lightbox', 'Review',

    function ($scope, $stateParams, uiGmapGoogleMapApi, uiGmapLogger, Profile, Formation, Equipment, Service, FormationLevel, Lightbox, Review) {
        $scope.period = moment().date(10).format('MM-YYYY');
        $scope.scheduleIndex = -1;
        $scope.selectedPhotoIndex = 0;

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

        $scope.profile = Profile.get({
            id: $stateParams.profileId
        }, function () {
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

            var lat = null;
            var lon = null;
            if ($scope.profile.accomodationCoords) {
                lat = $scope.profile.accomodationCoords.lat;
                lon = $scope.profile.accomodationCoords.lng;
            }
            if (lat && lon) {
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
                    "title": $scope.profile.location.formatted_address,
                    "distance": "585m",
                    "hoofdcat": "70",
                    "img": "http://snm-crm.nl/wealert/img/70/ambu_6_thumb.jpg?2u",
                    "reactiecount": "0",
                    "likecount": "0",
                    "showWindow": false,
                    "date": "2u"
                }];
            }
        });

        $scope.reviews = [];

        Review.getTeacherReviews($stateParams.profileId).then(function (reviews) {
            $scope.reviews = reviews;
        });

        $scope.dayClick = function (event, date) {
            event.preventDefault() // prevent the select to happen
        }

        $scope.onMonthChanged = function (newMonth, oldMonth) {
            $scope.period = newMonth.format('MM-YYYY');
            $scope.scheduleIndex = findShedule($scope.period);
            if ($scope.scheduleIndex == -1) {
                var schedule = {period: $scope.period, dayoff: [], undispos: []};
                $scope.scheduleIndex = $scope.profile.schedules.push(schedule) - 1;
            }
        };

        uiGmapGoogleMapApi.then(function (maps) {

        });

        $scope.selectPhoto = function (index) {
            $scope.selectedPhotoIndex = index;
        }

        $scope.openLightboxModal = function () {
            if ($scope.profile.photos[$scope.selectedPhotoIndex]) {
                Lightbox.openModal($scope.profile.photos, $scope.selectedPhotoIndex);
            }
        };
    }
]);