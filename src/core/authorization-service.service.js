'use strict';

/**
 * @ngdoc service
 * @name udb.core.authorizationService
 * @description
 * # authorizationService
 * Service in the udb.core.
 */
angular
  .module('udb.core')
  .service('authorizationService', AuthorizationService);

/* @ngInject */
function AuthorizationService($q, uitidAuth, udbApi, $location) {
  this.isLoggedIn = function () {
    var deferred = $q.defer();

    var deferredUser = udbApi.getMe();
    deferredUser.then(
      function (user) {
        deferred.resolve(user);
      },
      function () {
        uitidAuth.login();

        // We are redirecting away from the current page, so no need to
        // resolve or reject the deferred.
      }
    );

    return deferred.promise;
  };

  this.redirectIfLoggedIn = function (path) {
    if (uitidAuth.getUser()) {
      $location.path(path);

      return true;
    } else if (uitidAuth.getToken()) {
      var userPromise = udbApi.getMe(),
        deferred = $q.defer();

      userPromise.then(function () {
        deferred.resolve(true);
        $location.path(path);
      }, function () {
        deferred.reject();
      });

      return deferred.promise;
    } else {
      return false;
    }
  };
}
