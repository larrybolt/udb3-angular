'use strict';

/**
 * @ngdoc module
 * @name udb.manage.roles
 * @description
 * The udb manage roles module
 */
angular
  .module('udb.manage.roles', [
    'ngSanitize',
    'ui.bootstrap',
    'udb.core',
    'udb.manage'
  ])
  .component('rolesComponent', {
    controller: 'RolesListController',
    controllerAs: 'rlc',
    templateUrl: 'templates/roles-list.html',
    $canActivate: isAuthorized
  });

function isAuthorized(authorizationService) {
  return authorizationService.isLoggedIn();
}
isAuthorized.$inject = ['authorizationService'];