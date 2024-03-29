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
    'google.places',
    'angularFileUpload',
    'multipleDatePicker',
    'vcRecaptcha',
    'vAccordion',
    'anim-in-out',
    'bootstrapLightbox',
    'angular-carousel',
    'ngImgCrop',
    'tmh.dynamicLocale',
    'textAngular',
    'ngMaterial',
    'angular-svg-round-progress',
    'duScroll',
    'chart.js'
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

tooFrenchApp.constant('NOTIFICATION_EVENTS', {
    messageUpdate: 'messageUpdate',
    resaUpdate: 'resaUpdate'
});

tooFrenchApp.config(function ($httpProvider, $stateProvider, $urlRouterProvider, $translateProvider, USER_ROLES, uiGmapGoogleMapApiProvider, uiSelectConfig, $mdIconProvider, $mdThemingProvider) {


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

        var version = "?v=1.0.11";

        $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
            .state('home', {
                url: '/home',
                templateUrl: 'partials/main.html' + version
            })

            .state('forbidden', {
                url: '/forbidden',
                templateUrl: 'partials/forbidden.html' + version
            })

            .state('learn', {
                url: '/learn',
                templateUrl: 'partials/learn.html' + version
            })

            .state('teach', {
                url: '/teach',
                templateUrl: 'partials/teach.html' + version
            })
            .state('forum', {
                url: '/forum',
                controller: 'ForumCtrl',
                templateUrl: 'partials/forum/forum.html' + version,
                data: {
                    auth: true,
                }
            })

            .state('forum.post', {
                url: '/:postId',
                controller: 'ForumPostCtrl',
                templateUrl: 'partials/forum/forum-post.html' + version,
                data: {
                    auth: true,
                }
            })

            .state('forum.create', {
                url: '/post/create/:teacher',
                controller: 'ForumCreatePostCtrl',
                templateUrl: 'partials/forum/forum-create-post.html' + version,
                data: {
                    auth: true,
                }
            })

            .state('login', {
                url: '/login',
                controller: 'LoginCtrl',
                templateUrl: 'partials/login.html' + version
            })

            .state('forgottenPassword', {
                url: '/forgottenPassword',
                controller: 'ForgottenPasswordCtrl',
                templateUrl: 'partials/forgottenPassword.html' + version
            })

            .state('resetPassword', {
                url: '/resetPassword/:token',
                controller: 'ResetPasswordCtrl',
                templateUrl: 'partials/resetPassword.html' + version
            })

            .state('register', {
                url: '/register',
                controller: 'RegisterCtrl',
                templateUrl: 'partials/register.html' + version,
                data: {
                    auth: false,
                }
            })

            .state('profile', {
                url: '/profile/:profileId',
                controller: 'ProfileCtrl',
                templateUrl: 'partials/profile.html' + version,
                data: {
                    auth: true
                }
            })

            .state('myprofile', {
                url: '/myprofile',
                controller: 'MyProfileCtrl',
                templateUrl: 'partials/myprofile.html' + version,
                data: {
                    auth: true
                }
            })

            .state('reservation', {
                url: '/reservation/:profileId/:formula',
                controller: 'ReservationCtrl',
                templateUrl: 'partials/reservation.html' + version,
                data: {
                    auth: true
                }
            })

            .state('addReview', {
                url: '/addreview/:reservationId',
                controller: 'AddReviewCtrl',
                templateUrl: 'partials/add-review.html' + version,
                data: {
                    auth: true
                }
            })

            .state('admin', {
                url: '/admin',
                templateUrl: 'partials/admin.html' + version,
                controller: 'AdminCtrl',
                data: {
                    auth: true,
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor],
                }
            })
            .state('admin.statistics', {
                url: '/statistics',
                templateUrl: 'partials/admin/statistics.html' + version,
                controller: 'AdminStatisticsCtrl',
                data: {
                    auth: true,
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor],
                }
            })
            .state('admin.users', {
                url: '/users',
                templateUrl: 'partials/admin/users.html' + version,
                controller: 'AdminUserCtrl',
                data: {
                    auth: true,
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor],
                }
            })
            .state('admin.formations', {
                url: '/formations',
                templateUrl: 'partials/admin/formations.html' + version,
                controller: 'AdminFormationCtrl',
                data: {
                    auth: true,
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor],
                }
            })
            .state('admin.equipments', {
                url: '/equipments',
                templateUrl: 'partials/admin/equipments.html' + version,
                controller: 'AdminEquipmentCtrl',
                data: {
                    auth: true,
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor],
                }
            })
            .state('admin.extras', {
                url: '/extras',
                templateUrl: 'partials/admin/extras.html' + version,
                controller: 'AdminExtraCtrl',
                data: {
                    auth: true,
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor],
                }
            })
            .state('admin.recommandations', {
                url: '/recommandations',
                templateUrl: 'partials/admin/recommandations.html' + version,
                controller: 'AdminRecommandationCtrl',
                data: {
                    auth: true,
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor],
                }
            })
            .state('admin.utillinks', {
                url: '/utillinks',
                templateUrl: 'partials/admin/utillinks.html' + version,
                controller: 'AdminUtilLinkCtrl',
                data: {
                    auth: true,
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor],
                }
            })
            .state('admin.diplomas', {
                url: '/diplomas',
                templateUrl: 'partials/admin/diplomas.html' + version,
                controller: 'AdminDiplomaCtrl',
                data: {
                    auth: true,
                    authorizedRoles: [USER_ROLES.admin],
                }
            })
            .state('admin.forum', {
                url: '/forum',
                templateUrl: 'partials/admin/forum.html' + version,
                controller: 'AdminPostCategoryCtrl',
                data: {
                    auth: true,
                    authorizedRoles: [USER_ROLES.admin],
                }
            })
            .state('temp', {
                url: '/temp',
                templateUrl: 'partials/temp.html' + version,
                controller: 'UploadPhotoCtrl'
            })
            .state('uploader', {
                url: '/uploader',
                templateUrl: 'partials/temps/uploader.html' + version,
                controller: 'UploaderCtrl'
            })
            .state('results', {
                url: '/results/:country/:lvl1/:lvl2/:city/:days/:periods',
                templateUrl: 'partials/results.html' + version,
                controller: 'SearchCtrl'
            })
            .state('recommandations', {
                url: '/recommandations/:country/:lvl1/:lvl2/:city',
                templateUrl: 'partials/recommandations.html' + version,
                controller: 'RecommandationCtrl'
            })
            .state('messagerie', {
                url: '/messagerie/:conversationId',
                templateUrl: 'partials/messagerie.html' + version,
                controller: 'MessagerieCtrl',
                data: {
                    auth: true
                }
            })
            .state('planning', {
                url: '/planning/:history/:resaId',
                templateUrl: 'partials/planning.html' + version,
                controller: 'PlanningCtrl',
                data: {
                    auth: true
                }
            })
            .state('contact', {
                url: '/contact/:theme',
                templateUrl: 'partials/contact.html' + version,
                controller: 'FormContactCtrl'
            })
            .state('mentions', {
                url: '/mentions',
                templateUrl: 'partials/mentions.html' + version
            })
            .state('parameters', {
                url: '/parameters',
                templateUrl: 'partials/parameters/parameters.html' + version
            })
            .state('parameters.notifications', {
                url: '/parameters/notifications',
                controller: 'ParametersNotificationsCtrl',
                templateUrl: 'partials/parameters/parameters-notifications.html' + version
            })
            .state('parameters.password', {
                url: '/parameters/password',
                controller: 'ParametersPasswordCtrl',
                templateUrl: 'partials/parameters/parameters-password.html' + version
            })
            .state('faq', {
                url: '/faq',
                templateUrl: 'partials/faq.html' + version
            })
            .state('informations', {
                url: '/informations',
                templateUrl: 'partials/informations.html' + version
            })
            .state('myteachers', {
                url: '/myteachers',
                templateUrl: 'partials/myteachers.html' + version,
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
        $translateProvider.preferredLanguage('fr');

        //================================================
        // Google api support
        //================================================
        uiGmapGoogleMapApiProvider.configure({
            //    key: 'your api key',
            v: '3.17',
            libraries: 'geometry,visualization'
        });

        uiSelectConfig.theme = 'bootstrap';
        $mdIconProvider.fontSet('fa', 'fontawesome');
        $mdThemingProvider.definePalette('amazingPaletteName', {
            '50': '04bfc6',
            '100': '04bfc6',
            '200': '04bfc6',
            '300': '04bfc6',
            '400': '04bfc6',
            '500': '04bfc6',
            '600': '0098be',
            '700': '0098be',
            '800': '0098be',
            '900': '0098be',
            'A100': '04bfc6',
            'A200': '04bfc6',
            'A400': '04bfc6',
            'A700': '04bfc6',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
                '200', '300', '400', 'A100']
        });
        $mdThemingProvider.theme('default')
            .primaryPalette('amazingPaletteName');
    }
);


tooFrenchApp.run(['$rootScope', '$state', '$window', 'AUTH_EVENTS', 'AuthService', 'editableOptions', '$templateCache', 'Session', 'Messagerie', '$timeout', 'Reservation', 'Tour', 'UserFavList', 'tmhDynamicLocale', 'taOptions',
    function ($rootScope, $state, $window, AUTH_EVENTS, AuthService, editableOptions, $templateCache, Session, Messagerie, $timeout, Reservation, Tour, UserFavList, tmhDynamicLocale, taOptions) {
        editableOptions.theme = 'bs3';
        taOptions.defaultTagAttributes.a.target = '_blank';

        $templateCache.remove('partials/*');
        moment.locale('fr');
        $rootScope.today = moment();
        $rootScope.userfavlist = UserFavList;
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

        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            if (typeof(current) !== 'undefined') {
                $templateCache.remove(current.templateUrl);
            }
        });

        $rootScope.$on('$stateChangeStart', function (event, next) {
            if (typeof(current) !== 'undefined') {
                $templateCache.remove(next.templateUrl);
            }
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
            });
        });

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
            $rootScope.userfavlist.initialize();
            if (!$rootScope.session.user.tour) {
                if ($rootScope.isTeacher) {
                    Tour.startTeacherTour();
                }
                else {
                    Tour.startStudentTour();
                }
            }
        });
    }
]);