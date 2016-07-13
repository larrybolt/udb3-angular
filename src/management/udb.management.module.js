'use strict';

/**
 * @ngdoc module
 * @name udb.management
 * @description
 * # Management Module
 */
angular
  .module('udb.management', [
    'udb.core',
    'udb.management.labels'
  ])
  .component('udbManagement', {
    template: '<div ui-view></div>',
    $routeConfig: [
      {
        path: '/labels/overview',
        name: 'LabelsList',
        component: 'labelsComponent'
      },
      {
        path: '/labels/create',
        name: 'LabelCreator',
        component: 'udbLabelCreator'
      },
      {
        path: '/labels/:id',
        name: 'LabelEditor',
        component: 'udbLabelEditor'
      }
    ],
    $canActivate: isAuthorized
  });

function isAuthorized(authorizationService) {
  return authorizationService.isLoggedIn();
}
isAuthorized.$inject = ['authorizationService'];