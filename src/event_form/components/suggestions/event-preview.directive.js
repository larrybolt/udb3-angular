'use strict';

/**
 * @ngdoc directive
 * @name udb.search.directive:udbEventPreview
 * @description
 *  Previews an event provided by a result viewer.
 */
angular
  .module('udb.event-form')
  .directive('udbEventPreview', udbEventPreview);

/* @ngInject */
function udbEventPreview() {
  var eventPreviewDirective = {
    restrict: 'AE',
    controller: 'EventController',
    controllerAs: 'eventCtrl',
    templateUrl: 'templates/event-preview.directive.html'
  };

  return eventPreviewDirective;
}
