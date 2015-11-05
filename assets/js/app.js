'use strict';

/**
 * @ngdoc overview
 * @name tooFrenchApp
 * @description
 * # tooFrenchApp
 *
 * Main module of the application.
 */
var tooFrenchApp = angular.module('tooFrenchApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'pascalprecht.translate',
    'xeditable',
    'uiGmapgoogle-maps',
    'cloudinary',
    'tooFrenchCtrl',
    'tooFrenchService',
    'ui.select',
    'ui.bootstrap',
    'dialogs.main',
    'google.places',
    'angularFileUpload',
    'multipleDatePicker',
    'vcRecaptcha',
    'vAccordion',
    'anim-in-out',
    'bootstrapLightbox',
    'angular-carousel'
]);


tooFrenchApp.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionCreated: 'auth-session-created',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
});

tooFrenchApp.constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    teacher: 'teacher',
    student: 'student'
});

tooFrenchApp.constant('MESSAGE_EVENTS', {
    read: 'msg-read',
    update: 'msg-update'
});

tooFrenchApp.constant('LOCALE_EVENTS', {
    localeChange: 'locale-change'
});

tooFrenchApp.config(function ($httpProvider, $stateProvider, $urlRouterProvider, $translateProvider, USER_ROLES, uiGmapGoogleMapApiProvider) {


        //================================================
        // Check if the user is connected
        //================================================
        var checkLoggedin = function ($q, $timeout, $http, $state, $rootScope) {
            // Initialize a new promise
            var deferred = $q.defer();
            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function (user) {
                // Authenticated
                if (user !== '0')
                    deferred.resolve();
                // Not Authenticated
                else {
                    $rootScope.message = 'You need to log in.';
                    //$timeout(function(){deferred.reject();}, 0);
                    deferred.reject();
                    $state.go('login');
                }
            });
            return deferred.promise;
        };


        //================================================
        // Add an interceptor for AJAX errors
        //================================================
        $httpProvider.interceptors.push(function ($q, $location) {
            return {
                response: function (response) {
                    // do something on success
                    return response;
                },
                responseError: function (response) {
                    if (response.status === 401)
                        $location.url('/login');
                    if (response.status === 403)
                        $location.url('/forbidden');
                    return $q.reject(response);
                }
            };
        });


        //================================================
        // State management
        //================================================
        $urlRouterProvider.otherwise('/home');

        $stateProvider

            // HOME STATES AND NESTED VIEWS ========================================
            .state('home', {
                url: '/home',
                templateUrl: 'views/main.html'
            })

            .state('forbidden', {
                url: '/forbidden',
                templateUrl: 'views/forbidden.html'
            })

            .state('learn', {
                url: '/learn',
                templateUrl: 'views/learn.html'
            })

            .state('teach', {
                url: '/teach',
                templateUrl: 'views/teach.html'
            })

            .state('forum', {
                url: '/forum',
                controller: 'ForumCtrl',
                templateUrl: 'views/forum/forum.html',
                data: {
                    auth: true,
                }
            })

            .state('forum.post', {
                url: '/:postId',
                controller: 'ForumPostCtrl',
                templateUrl: 'views/forum/forum-post.html',
                data: {
                    auth: true,
                }
            })

            .state('forum.create', {
                url: '/post/create/:teacher',
                controller: 'ForumCreatePostCtrl',
                templateUrl: 'views/forum/forum-create-post.html',
                data: {
                    auth: true,
                }
            })

            .state('login', {
                url: '/login',
                controller: 'LoginCtrl',
                templateUrl: 'views/login.html'
            })

            .state('register', {
                url: '/register',
                controller: 'RegisterCtrl',
                templateUrl: 'views/register.html',
                data: {
                    auth: false,
                }
            })

            .state('profile', {
                url: '/profile/:profileId',
                controller: 'ProfileCtrl',
                templateUrl: 'views/profile.html',
                data: {
                    auth: true
                }
            })

            .state('myprofile', {
                url: '/myprofile',
                controller: 'MyProfileCtrl',
                templateUrl: 'views/myprofile.html',
                data: {
                    auth: true
                }
            })

            .state('reservation', {
                url: '/reservation/:profileId/:formula',
                controller: 'ReservationCtrl',
                templateUrl: 'views/reservation.html',
                data: {
                    auth: true
                }
            })

            .state('addReview', {
                url: '/addreview/:reservationId',
                controller: 'AddReviewCtrl',
                templateUrl: 'views/add-review.html',
                data: {
                    auth: true
                }
            })

            .state('admin', {
                url: '/admin',
                templateUrl: 'views/admin.html',
                controller: 'AdminCtrl',
                data: {
                    auth: true,
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor],
                }
            })
            .state('admin.users', {
                url: '/users',
                templateUrl: 'views/admin/users.html',
                controller: 'AdminUserCtrl',
                data: {
                    auth: true,
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor],
                }
            })
            .state('admin.formations', {
                url: '/formations',
                templateUrl: 'views/admin/formations.html',
                controller: 'AdminFormationCtrl',
                data: {
                    auth: true,
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor],
                }
            })
            .state('admin.equipments', {
                url: '/equipments',
                templateUrl: 'views/admin/equipments.html',
                controller: 'AdminEquipmentCtrl',
                data: {
                    auth: true,
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor],
                }
            })
            .state('admin.extras', {
                url: '/extras',
                templateUrl: 'views/admin/extras.html',
                controller: 'AdminExtraCtrl',
                data: {
                    auth: true,
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor],
                }
            })
            .state('admin.recommandations', {
                url: '/recommandations',
                templateUrl: 'views/admin/recommandations.html',
                controller: 'AdminRecommandationCtrl',
                data: {
                    auth: true,
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor],
                }
            })
            .state('admin.utillinks', {
                url: '/utillinks',
                templateUrl: 'views/admin/utillinks.html',
                controller: 'AdminUtilLinkCtrl',
                data: {
                    auth: true,
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor],
                }
            })
            .state('admin.diplomas', {
                url: '/diplomas',
                templateUrl: 'views/admin/diplomas.html',
                controller: 'AdminDiplomaCtrl',
                data: {
                    auth: true,
                    authorizedRoles: [USER_ROLES.admin],
                }
            })
            .state('admin.forum', {
                url: '/forum',
                templateUrl: 'views/admin/forum.html',
                controller: 'AdminPostCategoryCtrl',
                data: {
                    auth: true,
                    authorizedRoles: [USER_ROLES.admin],
                }
            })
            .state('temp', {
                url: '/temp',
                templateUrl: 'views/temp.html',
                controller: 'UploadPhotoCtrl'
            })
            .state('uploader', {
                url: '/uploader',
                templateUrl: 'views/temps/uploader.html',
                controller: 'UploaderCtrl'
            })
            .state('results', {
                url: '/results/:country/:lvl1/:lvl2/:city/:days/:periods',
                templateUrl: 'views/results.html',
                controller: 'SearchCtrl'
            })
            .state('recommandations', {
                url: '/recommandations/:country/:lvl1/:lvl2/:city',
                templateUrl: 'views/recommandations.html',
                controller: 'RecommandationCtrl'
            })
            .state('messagerie', {
                url: '/messagerie',
                templateUrl: 'views/messagerie.html',
                controller: 'MessagerieCtrl',
                data: {
                    auth: true
                }
            })
            .state('planning', {
                url: '/planning',
                templateUrl: 'views/planning.html',
                controller: 'PlanningCtrl',
                data: {
                    auth: true
                }
            })
            .state('contact', {
                url: '/contact/:theme',
                templateUrl: 'views/contact.html',
                controller: 'FormContactCtrl'
            })
            .state('mentions', {
                url: '/mentions',
                templateUrl: 'views/mentions.html'
            })
            .state('parameters', {
                url: '/parameters',
                controller: 'ParametersCtrl',
                templateUrl: 'views/parameters.html'
            })
            .state('faq', {
                url: '/faq',
                templateUrl: 'views/faq.html'
            })
            .state('informations', {
                url: '/informations',
                templateUrl: 'views/informations.html'
            })
            .state('myteachers', {
                url: '/myteachers',
                templateUrl: 'views/myteachers.html',
                controller: 'FavListCtrl',
                data: {
                    auth: true
                }
            });

        //================================================
        // Translation support
        //================================================
        $translateProvider.useStaticFilesLoader({
            prefix: '/languages/',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('frFR');


        //================================================
        // Google api support
        //================================================
        uiGmapGoogleMapApiProvider.configure({
            //    key: 'your api key',
            v: '3.17',
            libraries: 'weather,geometry,visualization'
        });
    }
);


tooFrenchApp.run(['$rootScope', '$state', '$window', 'AUTH_EVENTS', 'AuthService', 'editableOptions', '$templateCache',
    function ($rootScope, $state, $window, AUTH_EVENTS, AuthService, editableOptions, $templateCache) {
        editableOptions.theme = 'bs3';
        $templateCache.remove('index.html');

        $rootScope.$on('$viewContentLoaded',
            function (event) {
                $rootScope.updateFooter($window.innerHeight);
            });

        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            if (typeof(current) !== 'undefined') {
                $templateCache.remove(current.templateUrl);
            }
            $rootScope.currentState = toState.name;
        });

        var processChange = function (event, next) {
            if (next.data) {
                if (next.data.auth === true) {
                    if (!$rootScope.session.authenticated) {
                        event.preventDefault();
                        $state.go('login');
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                    } else if (next.data.authorizedRoles) {
                        if (!$rootScope.session.isAuthorized(next.data.authorizedRoles)) {
                            event.preventDefault();
                            $state.go('forbidden');
                            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                        }
                    }
                }
                if (next.data.auth === false) {
                    if ($rootScope.session.authenticated) {
                        event.preventDefault();
                    }
                }
            }
        }
        $rootScope.$on('$stateChangeStart', function (event, next) {
            if ($rootScope.sessionInitialized) {
                processChange(event, next);
            }
            else {
                AuthService.getUser().then(function () {
                    processChange(event, next);
                });
            }
        });
    }
]);

// This CSS class-based directive controls the pre-bootstrap loading screen. By
// default, it is visible on the screen; but, once the application loads, we'll
// fade it out and remove it from the DOM.
// --
// NOTE: Normally, I would probably just jQuery to fade-out the container; but,
// I thought this would be a nice moment to learn a bit more about AngularJS
// animation. As such, I'm using the ng-leave workflow to learn more about the
// ngAnimate module.
tooFrenchApp.directive(
    "mAppLoading",
    function ($animate, $timeout) {

        // Return the directive configuration.
        return ({
            link: link,
            restrict: "C"
        });


        // I bind the JavaScript events to the scope.
        function link(scope, element, attributes) {

            $animate.leave(element.children().eq(1)).then(
                function cleanupAfterAnimation() {

                    // Remove the root directive element.
                    element.remove();

                    // Clear the closed-over variable references.
                    scope = element = attributes = null;

                }
            );

        }

    }
);

tooFrenchApp.filter('range', function () {
    return function (input, min, max) {
        min = parseInt(min); //Make string input int
        max = parseInt(max);
        for (var i = min; i < max; i++)
            input.push(i);
        return input;
    };
});

var tooFrenchControllers = angular.module('tooFrenchCtrl', ['ngRoute', 'ui.router', 'xeditable', 'uiGmapgoogle-maps', 'pascalprecht.translate', 'tooFrenchService', 'angularFileUpload', 'ui.select', 'ui.bootstrap', 'dialogs.main', 'google.places', 'ngImgCrop', 'multipleDatePicker', 'vcRecaptcha', 'angular-carousel']);
tooFrenchControllers.config(function (uiSelectConfig) {
    //================================================
    // Angular ui components
    //================================================
    uiSelectConfig.theme = 'œ';
});

angular.module('tooFrenchService', ['ngRoute', 'ngResource']);


tooFrenchControllers.controller('ApplicationController', ['$rootScope', '$scope', '$window', '$state', '$timeout', 'AUTH_EVENTS', 'MESSAGE_EVENTS', 'AuthService', 'Session', 'Profile', 'Messagerie', 'Reservation', 'UserFavList', '$translate', '$http',

    function ($rootScope, $scope, $window, $state, $timeout, AUTH_EVENTS, MESSAGE_EVENTS, AuthService, Session, Profile, Messagerie, Reservation, UserFavList, $translate, $http) {
        $rootScope.userfavlist = UserFavList;

        $scope.logout = function () {
            AuthService.logout().then(function () {

            });
        }

        /* $scope.$on(MESSAGE_EVENTS.read, function (event, args) {
         $timeout(function () {
         var count = args.count;
         $scope.unseenMsgCount -= count;
         }, 10);
         });

         $scope.$on(MESSAGE_EVENTS.update, function (event, args) {
         Messagerie.getUnseenMsgCount().then(function (count) {
         $scope.unseenMsgCount = count;
         }, function () {
         $scope.unseenMsgCount = -1;
         });
         });*/

        $scope.$on(AUTH_EVENTS.loginSuccess, function (event, args) {
            Session.create(args.data);

            if (!Session.user.tour) {
                if ($rootScope.isTeacher) {
                    tour.init();
                    tour.start();
                }
                else {
                    tourStudent.init();
                    tourStudent.start();
                }
            }
            (function updateNotification() {
                if ($rootScope.session.authenticated) {
                    Messagerie.getUnseenMsgCount().then(function (count) {
                        $rootScope.notifMsgCount = count;
                        $timeout(updateNotification, 3000);
                    }, function () {
                        $rootScope.notifMsgCount = 0;
                        $timeout(updateNotification, 3000);
                    });
                }
            })();

            (function updateNotificationResa() {
                if ($rootScope.session.authenticated) {
                    Reservation.notifCount().then(function (count) {
                        $rootScope.notifResaCount = count;
                        $timeout(updateNotificationResa, 3000);
                    });
                }
            })();

            $rootScope.userfavlist.getFavList();
            $rootScope.$broadcast(AUTH_EVENTS.sessionCreated);
        });

        $scope.$on(AUTH_EVENTS.logoutSuccess, function () {
            Session.destroy();
            $rootScope.userfavlist.destroy();
            $state.go('home');
        });


        $scope.$on(AUTH_EVENTS.notAuthenticated, function () {
            console.log('not authenticated');
        });
        $scope.$on(AUTH_EVENTS.notAuthorized, function () {
            console.log('not authorized');
        });


        $(window).resize(function () {
            $scope.$apply(function () {
                $rootScope.updateFooter(window.innerHeight);
                if ($rootScope.currentState == 'home') {
                    $rootScope.updateCarousel();
                }
            });
        });

        $rootScope.updateCarousel = function () {
            var h = angular.element('.carousel-image').height();
            angular.element('#homeCarousel').height(h);
        }

        $scope.$watch(function () {
            return $window.innerHeight;
        }, function (value) {
            $rootScope.updateFooter(value);
        });

        $rootScope.updateFooter = function (pageHeight) {
            var headerHeight = angular.element('#header').height();
            var footerHeight = angular.element('#footer').height();
            var bodyMinSize = pageHeight - headerHeight - footerHeight;
            angular.element('#main-container').css('min-height', bodyMinSize);
        }

        var tour;
        var tourStudent;
        $rootScope.$on('$translateChangeSuccess', function () {

            tour = new Tour({
                name: "tourteacher2",
                debug: true,
                storage: false,
                onEnd: function (tour) {
                    if (tour.notOver == 1) {
                        console.log('not over');
                        $state.go('myprofile');
                    }
                    else {
                        Session.user.tour = true;
                        $http.get('/user/userEndTour');
                    }
                },
                template: "<div class='popover tour'>" +
                "<div class='arrow'></div>" +
                "<h3 class='popover-title'></h3>" +
                "<span class='fa fa-times-circle endTourBtn' data-role='end'></span>" +
                "<div class='popover-content'></div>" +
                "<div class='popover-navigation'>" +
                "<span class='prev-btn fa fa-arrow-circle-left' data-role='prev'></span>" +
                "<span class='next-btn fa fa-arrow-circle-right' data-role='next'></span>" +
                "</div>" +
                "</nav>" +
                "</div>",
                steps: [
                    {
                        element: "#logo",
                        title: $translate.instant('tour.1.title'),
                        content: $translate.instant('tour.2.content'),
                        placement: 'right',
                        backdrop: true,
                        template: "<div class='popover tour'>" +
                        "<div class='arrow'></div>" +
                        "<h3 class='popover-title'></h3>" +
                        "<span class='fa fa-times-circle endTourBtn' data-role='end'></span>" +
                        "<div class='popover-content'></div>" +
                        "<div class='popover-navigation'>" +
                        "<span class='next-btn fa fa-arrow-circle-right' data-role='next'></span>" +
                        "</div>" +
                        "</nav>" +
                        "</div>"
                    },
                    {
                        element: "#link-myprofile",
                        title: $translate.instant('tour.2.title'),
                        content: $translate.instant('tour.2.content'),
                        backdrop: true,
                        placement: 'left',
                        onNext: function (tour) {
                            tour.notOver = 1;
                            tour.end();
                        },
                        template: "<div class='popover tour'>" +
                        "<div class='arrow'></div>" +
                        "<h3 class='popover-title'></h3>" +
                        "<span class='fa fa-times-circle endTourBtn' data-role='end'></span>" +
                        "<div class='popover-content'></div>" +
                        "<div class='popover-navigation'>" +
                        "<span class='prev-btn fa fa-arrow-circle-left' data-role='prev'></span>" +
                        "<span class='next-btn fa fa-arrow-circle-right' data-role='next'></span>" +
                        "</div>" +
                        "</nav>" +
                        "</div>"
                    }
                ]
            });

            tourStudent = new Tour({
                name: "tourstudent",
                debug: true,
                storage: false,
                onEnd: function (tour) {
                    Session.user.tour = true;
                    $http.get('/user/userEndTour');
                },
                template: "<div class='popover tour'>" +
                "<div class='arrow'></div>" +
                "<h3 class='popover-title'></h3>" +
                "<span class='fa fa-times-circle endTourBtn' data-role='end'></span>" +
                "<div class='popover-content'></div>" +
                "<div class='popover-navigation'>" +
                "<span class='prev-btn fa fa-arrow-circle-left' data-role='prev'></span>" +
                "<span class='next-btn fa fa-arrow-circle-right' data-role='next'></span>" +
                "</div>" +
                "</nav>" +
                "</div>",
                steps: [
                    {
                        element: "#logo",
                        title: $translate.instant('tour.student.1.title'),
                        content: $translate.instant('tour.student.1.content'),
                        placement: 'right',
                        backdrop: true,
                        template: "<div class='popover tour'>" +
                        "<div class='arrow'></div>" +
                        "<h3 class='popover-title'></h3>" +
                        "<span class='fa fa-times-circle endTourBtn' data-role='end'></span>" +
                        "<div class='popover-content'></div>" +
                        "<div class='popover-navigation'>" +
                        "<span class='next-btn fa fa-arrow-circle-right' data-role='next'></span>" +
                        "</div>" +
                        "</nav>" +
                        "</div>"
                    },
                    {
                        element: "#searchBar",
                        title: $translate.instant('tour.student.2.title'),
                        content: $translate.instant('tour.student.2.content'),
                        backdrop: true,
                        placement: 'bottom'
                    },
                    {
                        element: "#link-planning",
                        title: $translate.instant('tour.student.3.title'),
                        content: $translate.instant('tour.student.3.content'),
                        backdrop: true,
                        placement: 'bottom'
                    },
                    {
                        element: "#link-message",
                        title: $translate.instant('tour.student.4.title'),
                        content: $translate.instant('tour.student.4.content'),
                        backdrop: true,
                        placement: 'bottom'
                    },
                    {
                        element: "#link-myteachers",
                        title: $translate.instant('tour.student.5.title'),
                        content: $translate.instant('tour.student.5.content'),
                        backdrop: true,
                        placement: 'bottom'
                    },
                    {
                        element: "#link-forum",
                        title: $translate.instant('tour.student.6.title'),
                        content: $translate.instant('tour.student.6.content'),
                        backdrop: true,
                        placement: 'bottom'
                    }, {
                        element: "#logo",
                        title: $translate.instant('tour.student.7.title'),
                        content: $translate.instant('tour.student.7.content'),
                        backdrop: true,
                        placement: 'bottom',
                        template: "<div class='popover tour'>" +
                        "<div class='arrow'></div>" +
                        "<h3 class='popover-title'></h3>" +
                        "<span class='fa fa-times-circle endTourBtn' data-role='end'></span>" +
                        "<div class='popover-content'></div>" +
                        "<div class='popover-navigation'>" +
                        "<span class='prev-btn fa fa-arrow-circle-left' data-role='prev'></span>" +
                        "</div>" +
                        "</nav>" +
                        "</div>"
                    }
                ]
            });
        });

        /*socket.on('test', function(data){
         console.log('SOCKET : ' + data);
         });*/
    }
]);