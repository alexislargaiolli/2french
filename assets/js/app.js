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

tooFrenchApp.config(function ($httpProvider, $stateProvider, $urlRouterProvider, $translateProvider, USER_ROLES, uiGmapGoogleMapApiProvider, uiSelectConfig) {


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
            console.log('check  log');
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

        uiSelectConfig.theme = 'bootstrap';
    }
);


tooFrenchApp.run(['$rootScope', '$state', '$window', 'AUTH_EVENTS', 'AuthService', 'editableOptions', '$templateCache', 'Session', 'Messagerie', '$timeout', 'Reservation', 'Tour',
    function ($rootScope, $state, $window, AUTH_EVENTS, AuthService, editableOptions, $templateCache, Session, Messagerie, $timeout, Reservation, Tour) {
        editableOptions.theme = 'bs3';

        $rootScope.$on('$viewContentLoaded',
            function (event) {
                $rootScope.updateFooter($window.innerHeight);
            });

        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
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

        $(window).resize(function () {
            $rootScope.$apply(function () {
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

        $rootScope.$watch(function () {
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

        $rootScope.$on(AUTH_EVENTS.loginSuccess, function (event, args) {
            if (!Session.user.tour) {
                if ($rootScope.isTeacher) {
                    Tour.startTeacherTour();
                }
                else {
                    Tour.startStudentTour();
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
        });

    }
]);

/*var tooFrenchControllers = angular.module('tooFrenchCtrl', ['ngRoute', 'ui.router', 'xeditable', 'uiGmapgoogle-maps', 'pascalprecht.translate', 'tooFrenchService', 'angularFileUpload', 'ui.select', 'ui.bootstrap', 'dialogs.main', 'google.places', 'ngImgCrop', 'multipleDatePicker', 'vcRecaptcha', 'angular-carousel']);*/

/*angular.module('tooFrenchService', ['ngRoute', 'ngResource']);*/


/*tooFrenchControllers.controller('ApplicationController', ['$rootScope', '$scope', '$window', '$state', '$timeout', 'AUTH_EVENTS', 'MESSAGE_EVENTS', 'AuthService', 'Session', 'Profile', 'Messagerie', 'Reservation', 'UserFavList', '$translate', '$http',

    function ($rootScope, $scope, $window, $state, $timeout, AUTH_EVENTS, MESSAGE_EVENTS, AuthService, Session, Profile, Messagerie, Reservation, UserFavList, $translate, $http) {
        $rootScope.userfavlist = UserFavList;

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

        $scope.$on(AUTH_EVENTS.notAuthenticated, function () {
            console.log('not authenticated');
        });
        $scope.$on(AUTH_EVENTS.notAuthorized, function () {
            console.log('not authorized');
        });





    }
]);*/