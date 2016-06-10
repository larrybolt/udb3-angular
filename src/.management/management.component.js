'use strict';

angular
  .module('udb.management')
  .component('udbManagement', {
    template: '<h1>Manage</h1> <ng-outlet></ng-outlet>',
    $routeConfig: [
      {
        path: '/label/:id',
        name: 'LabelEditor',
        component: 'udbLabelEditor'
      }
    ]
  });
