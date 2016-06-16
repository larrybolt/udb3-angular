'use strict';

/**
 * @ngdoc module
 * @name udb.manage
 * @description
 * The udb manage module
 */
angular
  .module('udb.manage', [
    'ngSanitize',
    'ui.bootstrap',
    'udb.core',
    'udb.manage.labels'
  ])
  .component('manageComponent', {
    controller: 'ManageController',
    controllerAs: 'mc',
    template: '<ng-outlet></ng-outlet>',
    $routeConfig: [
      {
        path: '/labels/overview',
        name: 'LabelsList',
        component: 'labelsComponent'
      },
      {
        path: '/label/:id',
        name: 'LabelEditor',
        component: 'udbLabelEditor'
      }
    ]
  });