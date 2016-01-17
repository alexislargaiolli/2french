'use strict';

/**
 * @ngdoc service
 * @name tooFrenchApp.auth
 * @description
 * # auth
 * Service in the tooFrenchApp.
 */
var tooFrenchServices = angular.module('tooFrenchApp');

tooFrenchServices.factory('AuthService', ['$http', '$rootScope', '$q', 'Session', 'AUTH_EVENTS', function ($http, $rootScope, $q, Session, AUTH_EVENTS) {
    return {
        getUser: function () {
            var deferred = $q.defer();
            $rootScope.loginRequest = deferred;
            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function (data) {
                if (data != 0 && data.user !== null) {
                    $rootScope.session.create(data);
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, {data: data});
                    deferred.resolve(data.user);
                }
                else {
                    deferred.resolve();
                }
                $rootScope.sessionInitialized = 1;
            });
            return deferred.promise;
        },
        login: function (credential, success, error) {
            var deferred = $q.defer();
            $http.post('/auth/local', {
                identifier: credential.email,
                password: credential.pwd
            }).success(function (data, status, headers, config) {
                if (data.status == 2) {
                    $rootScope.session.create(data);
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, {data: data});
                    deferred.resolve(data.user);
                }
                else {
                    deferred.reject(data.message);
                }
            }).
                error(function (data, status, headers, config) {
                    deferred.reject(data.message);
                });
            return deferred.promise;
        },
        logout: function () {
            var deferred = $q.defer();
            $http.get('/logout').success(function (data, status, headers, config) {
                $rootScope.session.destroy();
                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
                deferred.resolve();
            }).
                error(function (data, status, headers, config) {
                    deferred.reject();
                });
            return deferred.promise;
        },
        isLogged: function () {
            var deferred = $q.defer();
            $http.get('/loggedin').success(function (user) {
                if (user !== '0') {
                    deferred.resolve();
                }
                else {
                    deferred.reject();
                }
            });
            return deferred.promise;
        },

        register: function (username, email, password, teacher, firstname, city) {
            var deferred = $q.defer();
            $http.post('/auth/local/register', {
                username: username,
                email: email,
                password: password,
                teacher: teacher,
                firstname: firstname,
                city: city
            }).success(function (data, status, headers, config) {
                if (data.status == 2) {
                    $rootScope.session.create(data);
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, {data: data});
                    deferred.resolve(data.user);
                }
                else {
                    deferred.reject(data.message);
                }
            }).
                error(function (data, status, headers, config) {
                    deferred.reject(data.message);
                });
            return deferred.promise;
        },
        forgot: function (email) {
            var deferred = $q.defer();
            $http.post('/user/forgot', {
                email: email
            }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).
                error(function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        },
        checkToken: function (token) {
            var deferred = $q.defer();
            $http.post('/user/checkResetToken', {
                token: token
            }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).
                error(function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        },
        resetPassword: function (token, password, confirm) {
            var deferred = $q.defer();
            $http.post('/user/resetPassword', {
                token: token,
                password: password,
                confirm: confirm
            }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).
                error(function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }
    }
}]);

tooFrenchServices.service('Session', function ($rootScope, AUTH_EVENTS) {
    this.create = function (data) {
        this.id = data.user.id;
        this.userId = data.user.id;
        this.user = data.user;
        this.role = data.user.role;
        this.profile = data.profile;
        this.favlistId = data.favlist ? data.favlist.id : null;
        this.diploma = data.diploma;
        this.authenticated = true;
        $rootScope.isTeacher = (this.role == "teacher") || (this.role == "admin");
        $rootScope.isStudent = (this.role == "student");
        $rootScope.isAdmin = this.role == "admin";
        $rootScope.session = this;
        $rootScope.$broadcast(AUTH_EVENTS.sessionCreated);
    };
    this.destroy = function () {
        this.id = null;
        this.userId = null;
        this.user = null;
        this.role = null;
        this.profile = null;
        this.favlistId = null;
        this.diploma = null;
        this.authenticated = false;
        $rootScope.isTeacher = false;
        $rootScope.isStudent = false;
        $rootScope.isAdmin = false;
        $rootScope.session = this;
    };
    this.isAuthorized = function (authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        return (this.authenticated && authorizedRoles.indexOf(this.role) !== -1);
    }
    $rootScope.session = this;
    return this;
});