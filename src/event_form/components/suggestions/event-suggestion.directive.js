'use strict';

/**
 * @ngdoc directive
 * @name udb.search.directive:udbEventSuggestion
 * @description
 *  Displays the event suggestions provided by a result viewer.
 */
angular
  .module('udb.event-form')
  .directive('udbEventSuggestion', udbEventSuggestion);

/* @ngInject */
function udbEventSuggestion() {
  var eventSuggestionDirective = {
    restrict: 'AE',
    controller: 'OfferController',
    controllerAs: 'eventCtrl',
    templateUrl: 'templates/event-suggestion.directive.html'
  };

  return eventSuggestionDirective;
}
