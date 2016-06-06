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

  /**
   * @param {string} path
   * @return {Promise.<boolean>}
   *  Resolves to TRUE when no user is logged in and no redirect has occurred.
   */
  this.redirectIfLoggedIn = function (path) {
    var deferredRedirect = $q.defer();

    function redirect() {
      $location.path(path);
      deferredRedirect.resolve(false);
    }

    if (uitidAuth.getToken()) {
      udbApi
        .getMe()
        .then(redirect, deferredRedirect.reject);
    } else {
      deferredRedirect.resolve(true);
    }

    return deferredRedirect.promise;
  };
}
