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
    'bootstrapLightbox'
]);


tooFrenchApp.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
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
                url: '/results/:city/:days/:periods',
                templateUrl: 'views/results.html',
                controller: 'SearchCtrl'
            })
            .state('recommandations', {
                url: '/recommandations/:city',
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
                url: '/contact',
                templateUrl: 'views/contact.html',
                controller: 'FormContactCtrl'
            })
            .state('mentions', {
                url: '/mentions',
                templateUrl: 'views/mentions.html'
            })
            .state('parameters', {
                url: '/parameters',
                templateUrl: 'views/parameters.html'
            })
            .state('faq', {
                url: '/faq',
                templateUrl: 'views/faq.html'
            })
            .state('informations', {
                url: '/informations',
                templateUrl: 'views/informations.html'
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
        editableOptions.theme = 'bootstrap';
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

        var processChange = function(event, next){
            if (next.data) {
                if (next.data.auth === true) {
                    if (!AuthService.isAuthenticated()) {
                        event.preventDefault();
                        $state.go('login');
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                    } else if (next.data.authorizedRoles) {
                        if (!AuthService.isAuthorized(next.data.authorizedRoles)) {
                            event.preventDefault();
                            $state.go('forbidden');
                            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                        }
                    }
                }
                if (next.data.auth === false) {
                    if (AuthService.isAuthenticated()) {
                        event.preventDefault();
                    }
                }
            }
        }
        $rootScope.$on('$stateChangeStart', function (event, next) {
            if($rootScope.sessionInitialized){
                processChange(event, next);
            }
            else{
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

var tooFrenchControllers = angular.module('tooFrenchCtrl', ['ngRoute', 'ui.router', 'xeditable', 'uiGmapgoogle-maps', 'pascalprecht.translate', 'tooFrenchService', 'angularFi' +
'leUpload', 'ui.select', 'ui.bootstrap', 'dialogs.main', 'google.places', 'ngImgCrop', 'multipleDatePicker', 'vcRecaptcha']);
tooFrenchControllers.config(function (uiSelectConfig) {
    //================================================
    // Angular ui components
    //================================================
    uiSelectConfig.theme = 'œ';
});

angular.module('tooFrenchService', ['ngRoute', 'ngResource']);


tooFrenchControllers.controller('ApplicationController', ['$rootScope', '$scope', '$window', '$state', '$http', '$timeout', 'USER_ROLES', 'AUTH_EVENTS', 'LOCALE_EVENTS', 'MESSAGE_EVENTS', 'AuthService', 'Session', '$translate', 'Profile', 'Messagerie', 'Reservation',

    function ($rootScope, $scope, $window, $state, $http, $timeout, USER_ROLES, AUTH_EVENTS, LOCALE_EVENTS, MESSAGE_EVENTS, AuthService, Session, $translate, Profile, Messagerie, Reservation) {
        $scope.currentUser = null;
        $scope.currentProfile = null;
        $scope.userRoles = USER_ROLES;
        $scope.isAuthorized = AuthService.isAuthorized;
        $scope.locale = $translate.preferredLanguage();
        $rootScope.currentLocale = $translate.preferredLanguage();
        $rootScope.currentLg = $translate.preferredLanguage().substring(0, 2);
        $scope.lg = $translate.preferredLanguage().substring(0, 2);
        $scope.unseenMsgCount = 0;
        $rootScope.isConnected = false;
        $rootScope.newResaCount = 0;

        $scope.setCurrentUser = function (user) {
            $scope.currentUser = user;
            $rootScope.isConnected = $scope.currentUser != null;
        };

        $scope.logout = function () {
            if ($scope.currentUser !== null) {
                AuthService.logout().then(function () {
                    $scope.setCurrentUser(null);
                });
            }
        }

        $scope.$on(LOCALE_EVENTS.localeChange, function (event, args) {
            $scope.lg = args.next.substring(0, 2);
            $scope.locale = args.next;
            //moment.lang($scope.lg);
        });

        $scope.$on(MESSAGE_EVENTS.read, function (event, args) {
            $timeout(function () {
                var count = args.count;
                $scope.unseenMsgCount = 0;
            }, 10);
        });

        $scope.$on(MESSAGE_EVENTS.update, function (event, args) {
            Messagerie.getUnseenMsgCount().then(function (count) {
                $scope.unseenMsgCount = count;
            }, function () {
                $scope.unseenMsgCount = -1;
            });
        });

        $scope.$on(AUTH_EVENTS.loginSuccess, function () {
            $scope.currentProfile = Profile.get({
                id: Session.user.profile
            }, function () {

            });
            if ($scope.isTeacher) {
                $http.get('diploma/userDiploma').success(function (data) {
                    $rootScope.diploma = data;
                });
            }
            Reservation.newTeacherResaCount().then(function (count) {
                $rootScope.newResaCount = count;
            });
            $scope.setCurrentUser(Session.user);
        });
        $scope.$on(AUTH_EVENTS.logoutSuccess, function () {
            $rootScope.isConnected = false;
            $rootScope.diploma = null;
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
            });
        });

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
    }
]);