'use strict';

/**
 * @ngdoc directive
 * @name udb.search.directive:udbPlacePreview
 * @description
 *  Previews a place provided by a result viewer.
 */
angular
  .module('udb.event-form')
  .directive('udbPlacePreview', udbPlacePreview);

/* @ngInject */
function udbPlacePreview() {
  var placePreviewDirective = {
    restrict: 'AE',
    controller: 'PlaceController',
    controllerAs: 'placeCtrl',
    templateUrl: 'templates/place-preview.directive.html'
  };

  return placePreviewDirective;
}
