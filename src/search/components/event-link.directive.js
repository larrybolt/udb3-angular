'use strict';

/**
 * @ngdoc directive
 * @name udb.search.directive:udbEventLink
 * @description
 *  Renders a link for an event.
 */
angular
  .module('udb.event-form')
  .directive('udbEventLink', udbEventLink);

/* @ngInject */
function udbEventLink() {
  var eventLinkDirective = {
    restrict: 'AE',
    controller: 'OfferController',
    controllerAs: 'eventCtrl',
    templateUrl: 'templates/event-link.directive.html'
  };

  return eventLinkDirective;
}
