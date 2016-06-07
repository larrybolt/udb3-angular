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
    'udb.manage',
    'udb.manage.users'
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