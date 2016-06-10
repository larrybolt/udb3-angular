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
    controller: 'OfferController',
    controllerAs: 'placeCtrl',
    templateUrl: 'templates/place.directive.html'
  };

  return placeDirective;
}
