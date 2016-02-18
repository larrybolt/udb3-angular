'use strict';

/**
 * @ngdoc directive
 * @name udb.search.directive:udbPlace
 * @description
 * # udbPlace
 */
angular
  .module('udb.search')
  .directive('udbPlace', udbPlace);

/* @ngInject */
function udbPlace() {
  var placeDirective = {
    restrict: 'AE',
    controller: 'PlaceController',
    controllerAs: 'placeCtrl',
    templateUrl: 'templates/place.directive.html'
  };

  return placeDirective;
}
