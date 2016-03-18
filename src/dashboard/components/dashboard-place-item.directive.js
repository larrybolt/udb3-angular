'use strict';

/**
 * @ngdoc directive
 * @name udb.dashboard.directive:udbDashboardPlaceItem
 * @description
 *  Renders a dashboard item for place.
 */
angular
  .module('udb.dashboard')
  .directive('udbDashboardPlaceItem', udbDashboardPlaceItem);

/* @ngInject */
function udbDashboardPlaceItem() {
  var dashboardPlaceItemDirective = {
    restrict: 'AE',
    controller: 'PlaceController',
    controllerAs: 'placeCtrl',
    templateUrl: 'templates/dashboard-item.directive.html',
    replace: true
  };

  return dashboardPlaceItemDirective;
}
