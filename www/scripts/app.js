'use strict';

/**
 * @ngdoc overview
 * @name tooFrenchApp
 * @description
 * # tooFrenchApp
 *
 * Main module of the application.
 */
angular
  .module('tooFrenchApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'pascalprecht.translate'
  ])
  .config(function($httpProvider,$stateProvider, $urlRouterProvider, $translateProvider, USER_ROLES) {
    


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
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url : '/about',
            templateUrl : 'views/about.html'
        })

        .state('login', {
            url : '/login',
            controller: 'LoginCtrl',
            templateUrl : 'views/login.html'
        })

        .state('register', {
            url : '/register',
            controller: 'RegisterCtrl',
            templateUrl : 'views/register.html',
            data: {
                auth: false,                
            }
        })

        .state('profile', {
            url : '/profile',
            templateUrl : 'views/profile.html',
            data: {
              auth: true
            }
        })

        .state('admin', {
            url : '/admin',
            templateUrl : 'views/admin.html',
            controller: 'AdminCtrl',
            data: {
              auth: true,
              authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor],              
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
  })
.run(function ($rootScope, $state, AUTH_EVENTS, AuthService) {
  $rootScope.$on('$stateChangeStart', function (event, next) {    
    if(next.data){
      if(next.data.auth === true){          
          if(!AuthService.isAuthenticated()){            
            event.preventDefault();
            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
          }
          else if(next.data.authorizedRoles){
            if(!AuthService.isAuthorized(next.data.authorizedRoles)){
                event.preventDefault();
                $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
            }
          }
      }
      if(next.data.auth === false){  
          if(AuthService.isAuthenticated()){
              event.preventDefault();
          }
      }
    }
  });
})
.controller('ApplicationController', function ($scope,
                                               USER_ROLES,
                                               AUTH_EVENTS,
                                               AuthService) {
  $scope.currentUser = null;
  $scope.userRoles = USER_ROLES;
  $scope.isAuthorized = AuthService.isAuthorized;
  
  AuthService.getUser().then(function(user){$scope.setCurrentUser(user);});

  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
  };

  $scope.logout = function(){
    if($scope.currentUser !== null){
      AuthService.logout().then(function(){
        $scope.setCurrentUser(null);
      });
    }
  }

  $scope.$on(AUTH_EVENTS.notAuthenticated, function(){
    console.log('not authenticated');
  });
  $scope.$on(AUTH_EVENTS.notAuthorized, function(){
    console.log('not authorized');
  });
});
