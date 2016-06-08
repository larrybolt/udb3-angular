'use strict';

/**
 * @ngdoc directive
 * @name udb.search.controller:PlaceController
 * @description
 * # EventController
 */
angular
  .module('udb.search')
  .controller('PlaceController', PlaceController);

/* @ngInject */
function PlaceController($controller, $scope) {
  angular.extend(this, $controller('OfferController', {$scope: $scope}));
}
