'use strict';

/**
 * @ngdoc module
 * @name udb.dashboard
 * @description
 * The udb dashboard module
 */
angular
  .module('udb.dashboard', [
    'ngSanitize',
    'ui.bootstrap',
    'udb.config'
  ])
  .component('dashboard', {
    controller: 'DashboardController',
    templateUrl: 'dashboard.html'
  });
