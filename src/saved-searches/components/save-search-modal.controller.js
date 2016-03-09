'use strict';

/**
 * @ngdoc function
 * @name udb.entry.controller:SaveSearchModalController
 * @description
 * # SaveSearchModalController
 * Controller of the udb.entry
 */
angular
  .module('udb.saved-searches')
  .controller('SaveSearchModalController', SaveSearchModalController);

/* @ngInject */
function SaveSearchModalController($scope, $uibModalInstance) {

  var ok = function () {
    var name = $scope.queryName;
    $scope.wasSubmitted = true;

    if (name) {
      $uibModalInstance.close(name);
    }
  };

  var cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.cancel = cancel;
  $scope.ok = ok;
  $scope.queryName = '';
  $scope.wasSubmitted = false;
}
