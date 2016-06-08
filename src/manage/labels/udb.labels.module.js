'use strict';

/**
 * @ngdoc module
 * @name udb.manage.labels
 * @description
 * The udb manage labels module
 */
angular
  .module('udb.manage.labels', [
    'ngSanitize',
    'ui.bootstrap',
    'udb.manage'
  ])
  .component('labelsComponent', {
    controller: 'LabelsListController',
    controllerAs: 'llc',
    templateUrl: 'templates/labels-list.html',
    $canActivate: isAuthorized
  });

function isAuthorized(authorizationService) {
  return authorizationService.isLoggedIn();
}
isAuthorized.$inject = ['authorizationService'];