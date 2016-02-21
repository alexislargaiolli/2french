var tooFrenchControllers = angular.module('tooFrenchApp');
tooFrenchControllers.controller('SearchBarCtrl', ['$scope', '$state', 'Profile', '$http', '$timeout', '$rootScope', 'multipleDatePickerBroadcast',

    function ($scope, $state, Profile, $http, $timeout, $rootScope, multipleDatePickerBroadcast) {
        $scope.city = null;
        $scope.optionsCity = {
            types: ['(regions)']
        };
        $scope.search = function () {
            if ($scope.city) {
                var city = $scope.city.address_components[0].short_name;
                var lvl2 = null;
                if ($scope.city.address_components.length > 1) {
                    lvl2 = $scope.city.address_components[1].short_name;
                }
                var lvl1 = null;
                if ($scope.city.address_components.length > 2) {
                    lvl1 = $scope.city.address_components[2].short_name;
                }
                var country = null;
                if ($scope.city.address_components.length > 3) {
                    country = $scope.city.address_components[3].short_name;
                }
                var i = 0;
                var periods = [];
                $state.go('results', {
                    country: country,
                    lvl1: lvl1,
                    lvl2: lvl2,
                    city: city,
                    days: JSON.stringify(selectedDays),
                    periods: JSON.stringify(periods)
                });
            }
        }

        $rootScope.$on('$translateChangeSuccess', function () {
            multipleDatePickerBroadcast.localeChanged('searchCalendar');
        });

        var selectedDays = [];
        $scope.onDayClickSearch = function (event, date) {
            event.preventDefault() // prevent the select to happen
            if (date.selectable) {
                date.selected = !date.selected;
                var timespan = date.valueOf();

                var i =selectedDays.indexOf(timespan);
                if (i == -1) {
                    selectedDays.push(timespan);
                }
                else {
                    selectedDays.splice(i, 1);
                }
            }
        }

        $timeout(function () {
            $('.dropdown-menu input, .dropdown-menu').click(function (e) {
                e.stopPropagation();
            });
        }, 100);
    }
]);