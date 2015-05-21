'use strict';

/**
 * @ngdoc service
 * @name tooFrenchApp.auth
 * @description
 * # auth
 * Service in the tooFrenchApp.
 */
var tooFrenchServices = angular.module('tooFrenchService');

tooFrenchServices.factory('AuthService', ['$http', '$q', 'Session' , function($http, $q, Session){
	return {
			getUser: function() {
				console.log('auth service getuser');
				var deferred = $q.defer();
				// Make an AJAX call to check if the user is logged in
				$http.get('/loggedin').success(function(data) {
					if(data != 0 && data.user !== null){
						console.log(data);
						Session.create(data.user.id, data.user.id, data.user, data.user.role);
						deferred.resolve(data.user);
					}
					else{
						deferred.reject();
					}
				});
				return deferred.promise;
			},
			login: function(credential, success, error) {
				var deferred = $q.defer();
				$http.post('/auth/local', {identifier : credential.email, password : credential.pwd}).success(function(data, status, headers, config) {
				    if(data.status == 2){
				    	Session.create(data.user.id, data.user.id, data.user, data.user.role);
				    	deferred.resolve(data.user);
				    }
				    else{
				    	deferred.reject(data.message);
				    }				    
				  }).
				  error(function(data, status, headers, config) {
				    deferred.reject(data.message);
				  });
				  return deferred.promise;
			},
			logout: function() {
				var deferred = $q.defer();
				$http.get('/logout').success(function(data, status, headers, config) {				   
			    	Session.destroy();
			    	deferred.resolve();	    				   
				  }).
				  error(function(data, status, headers, config) {
				    deferred.reject();
				  });
				  return deferred.promise;
			},
			isLogged: function() {
				var deferred = $q.defer();
				$http.get('/loggedin').success(function(user) {					
					if (user !== '0'){
						deferred.resolve();
					}
					else {
						deferred.reject();
					}
				});
				return deferred.promise;
			},

			isAuthenticated: function () {
				return !!Session.userId;								
      		},

			isAuthorized: function(authorizedRoles) {
			    if (!angular.isArray(authorizedRoles)) {
			      authorizedRoles = [authorizedRoles];
			    }
			    return (this.isAuthenticated() && authorizedRoles.indexOf(Session.userRole) !== -1);
			},

			register: function(username, email, password, teacher, firstname, city){
				var deferred = $q.defer();
				$http.post('/auth/local/register', {username : username, email : email, password : password, teacher : teacher, firstname : firstname, city : city}).success(function(data, status, headers, config) {				   
			    	if(data.status == 2){
			    		Session.create(data.user.id, data.user.id, data.user, data.user.role);
			    		deferred.resolve(data.user);
			    	}
			    	else{
			    		deferred.reject(data.message);
			    	}			    				    	
				  }).
				  error(function(data, status, headers, config) {
				    deferred.reject(data.message);
				  });
				  return deferred.promise;
			}
		}
}]);

tooFrenchServices.service('Session', function ($rootScope, AUTH_EVENTS) {
  this.create = function (sessionId, userId, user, userRole) {
    this.id = sessionId;
    this.userId = userId;
    this.user = user;
    this.userRole = userRole;
    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
  };
  this.destroy = function () {
    this.id = null;
    this.userId = null;
    this.user = null;
    this.userRole = null;
    $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
  };
  return this;
});