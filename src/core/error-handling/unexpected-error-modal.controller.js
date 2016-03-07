'use strict';

/**
 * @ngdoc function
 * @name udb.core.controller:UnexpectedErrorModalController
 * @description
 * # UnexpectedErrorModalController
 * Controller of the udb.core
 */
angular
  .module('udb.core')
  .controller('UnexpectedErrorModalController', UnexpectedErrorModalController);

/* @ngInject */
function UnexpectedErrorModalController($scope, $uibModalInstance, errorMessage) {

  var dismiss = function () {
    $uibModalInstance.dismiss('closed');
  };

  $scope.dismiss = dismiss;
  $scope.errorMessage = errorMessage;
}
