'use strict';

/**
 * @ngdoc directive
 * @name udb.search.directive:udbEvent
 * @description
 * # udbEvent
 */
angular
  .module('udb.search')
  .directive('udbEvent', udbEvent);

/* @ngInject */
function udbEvent() {
  var eventDirective = {
    restrict: 'AE',
    controller: 'OfferController',
    controllerAs: 'eventCtrl',
    templateUrl: 'templates/event.directive.html'
  };

  return eventDirective;
}
