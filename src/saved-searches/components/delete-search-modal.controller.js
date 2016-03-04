'use strict';

/**
 * @ngdoc function
 * @name udb.entry.controller:DeleteSearchModalController
 * @description
 * # DeleteSearchModalController
 * Controller of the udb.entry
 */
angular
  .module('udb.saved-searches')
  .controller('DeleteSearchModalController', DeleteSearchModalController);

/* @ngInject */
function DeleteSearchModalController($scope, $uibModalInstance) {

  var confirm = function () {
    $uibModalInstance.close();
  };

  var cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.cancel = cancel;
  $scope.confirm = confirm;
}
