'use strict';

/**
 * @ngdoc directive
 * @name udb.dashboard.directive:dashboard.html
 * @description
 * # udb dashboard directive
 */
angular
  .module('udb.dashboard')
  .directive('udbDashboard', udbDashboardDirective);

/* @ngInject */
function udbDashboardDirective() {
  return {
    templateUrl: 'templates/dashboard.html',
    restrict: 'EA'
  };
}
