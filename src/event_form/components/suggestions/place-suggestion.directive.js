'use strict';

/**
 * @ngdoc directive
 * @name udb.search.directive:udbPlaceSuggestion
 * @description
 * # udbPlaceSuggestion
 */
angular
  .module('udb.event-form')
  .directive('udbPlaceSuggestion', udbPlaceSuggestion);

/* @ngInject */
function udbPlaceSuggestion() {
  var placeSuggestionDirective = {
    restrict: 'AE',
    controller: 'OfferController',
    controllerAs: 'placeCtrl',
    templateUrl: 'templates/place-suggestion.directive.html'
  };

  return placeSuggestionDirective;
}
