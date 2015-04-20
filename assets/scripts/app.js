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
  'angularFileUpload'
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

tooFrenchApp.constant('LOCALE_EVENTS', {
  localeChange: 'locale-change'
});

tooFrenchApp.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', '$translateProvider', 'USER_ROLES', 'uiGmapGoogleMapApiProvider',

  function($httpProvider, $stateProvider, $urlRouterProvider, $translateProvider, USER_ROLES, uiGmapGoogleMapApiProvider) {


    //================================================
    // Check if the user is connected
    //================================================
    var checkLoggedin = function($q, $timeout, $http, $state, $rootScope) {
      // Initialize a new promise
      var deferred = $q.defer();
      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {
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
    $httpProvider.interceptors.push(function($q, $location) {
      return {
        response: function(response) {
          // do something on success
          return response;
        },
        responseError: function(response) {
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
      templateUrl: 'views/forum.html'
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
    .state('temp', {
      url: '/temp',
      templateUrl: 'views/temp.html',
      controller: 'UploadPhotoCtrl',      
    })
    .state('uploader', {
      url: '/uploader',
      templateUrl: 'views/temps/uploader.html',
      controller: 'UploaderCtrl',      
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
]);


tooFrenchApp.run(['$rootScope', '$state', 'AUTH_EVENTS', 'AuthService', 'editableOptions',
  function($rootScope, $state, AUTH_EVENTS, AuthService, editableOptions) {
    editableOptions.theme = 'bs3';
    AuthService.getUser().then(function() {
      $rootScope.$on('$stateChangeStart', function(event, next) {
        if (next.data) {
          if (next.data.auth === true) {
            if (!AuthService.isAuthenticated()) {
              event.preventDefault();
              $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            } else if (next.data.authorizedRoles) {
              if (!AuthService.isAuthorized(next.data.authorizedRoles)) {
                event.preventDefault();
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
      });
    });
  }
]);

var tooFrenchControllers = angular.module('tooFrenchCtrl', ['ngRoute', 'ui.router', 'xeditable', 'uiGmapgoogle-maps', 'pascalprecht.translate', 'tooFrenchService', 'angularFileUpload', 'ui.select','ui.bootstrap', 'dialogs.main', 'google.places', 'ngImgCrop']);
tooFrenchControllers.config(function(uiSelectConfig){
    //================================================
    // Angular ui components
    //================================================
    uiSelectConfig.theme = 'bootstrap';
});

angular.module('tooFrenchService', ['ngRoute', 'ngResource']);


tooFrenchControllers.controller('ApplicationController', ['$scope', 'USER_ROLES', 'AUTH_EVENTS', 'LOCALE_EVENTS', 'AuthService', 'Session', '$translate',

  function($scope, USER_ROLES, AUTH_EVENTS, LOCALE_EVENTS, AuthService, Session, $translate) {
    $scope.currentUser = null;
    $scope.userRoles = USER_ROLES;
    $scope.isAuthorized = AuthService.isAuthorized;
    $scope.locale = $translate.preferredLanguage();
    $scope.lg = $translate.preferredLanguage().substring(0, 2);

    $scope.setCurrentUser = function(user) {
      $scope.currentUser = user;
    };

    $scope.logout = function() {
      if ($scope.currentUser !== null) {
        AuthService.logout().then(function() {
          $scope.setCurrentUser(null);
        });
      }
    }

    $scope.$on(LOCALE_EVENTS.localeChange, function(event, args) {
      $scope.lg = args.next.substring(0, 2);
      $scope.locale = args.next;
    });

    $scope.$on(AUTH_EVENTS.loginSuccess, function() {
      $scope.setCurrentUser(Session.user);
    });
    $scope.$on(AUTH_EVENTS.notAuthenticated, function() {
      console.log('not authenticated');
    });
    $scope.$on(AUTH_EVENTS.notAuthorized, function() {
      console.log('not authorized');
    });
  }
]);

