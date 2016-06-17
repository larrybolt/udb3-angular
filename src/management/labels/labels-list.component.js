'use strict';

/**
 * @ngdoc function
 * @name udbApp.component:LabelsComponent
 * @description
 * # Labels Component
 */
angular
  .module('udb.management.labels')
  .component('labelsComponent', {
    controller: 'LabelsListController',
    controllerAs: 'llc',
    templateUrl: 'templates/labels-list.html'
  });
