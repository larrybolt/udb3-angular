'use strict';

/**
 * @ngdoc module
 * @name udb.manage.users
 * @description
 * The udb manage users module
 */
angular
  .module('udb.manage.users', [
    'ngSanitize',
    'ui.bootstrap'
  ])
  .component('usersComponent', {
    controller: 'UsersListController',
    controllerAs: 'ulc',
    templateUrl: 'templates/users-list.html',
    $canActivate: isAuthorized
  });

function isAuthorized(authorizationService) {
  return authorizationService.isLoggedIn();
}
isAuthorized.$inject = ['authorizationService'];