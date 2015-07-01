var tooFrenchServices = angular.module('tooFrenchService');
tooFrenchServices.factory('UserFavList', ['$resource', '$http', '$q', 'Session',
	function($resource, $http, $q, Session){
   		return {
            getResource : function(){
                return $resource('/userfavlist/:id', {id: '@id'}, {'update': {method: 'PUT'}});
            },
			getFavList : function(){
                var deferred = $q.defer();
                var UserFavList = this.getResource();
                UserFavList.query({owner : Session.userId}, function(favlists){
                    if(favlists && favlists.length > 0){
                        deferred.resolve(favlists[0]);
                    }
                    else{
                        deferred.resolve({favorits : []});
                    }
                });
                return deferred.promise;
            },
            addFavorit : function(profileId){
                var deferred = $q.defer();
                var UserFavList = this.getResource();
                UserFavList.query({owner : Session.userId}, function(favlists){
                    var favlist = favlists[0];
                    if(!favlist){
                        favlist = new UserFavList({owner : Session.userId, favorits : []});
                        favlist.favorits.push(profileId);
                        favlist.$save(function(f){
                            deferred.resolve(f);
                        }, function(){
                            deferred.reject(favlist);
                        });
                    }
                    else{
                        favlist.favorits.push(profileId);
                        favlist.$update(function(f){
                            deferred.resolve(f);
                        }, function(){
                            deferred.reject(favlist);
                        });
                    }
                });
                return deferred.promise;
            }
		}
    }
]);