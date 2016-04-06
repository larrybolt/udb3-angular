
'use strict';

/**
 * @ngdoc function
 * @name udbApp.controller:EventDeleteConfirmModalCtrl
 * @description
 * # EventDeleteConfirmModalCtrl
 * Modal to delete an event.
 */
angular
  .module('udb.dashboard')
  .controller('EventDeleteConfirmModalCtrl', EventDeleteConfirmModalController);

/* @ngInject */
function EventDeleteConfirmModalController($scope, $uibModalInstance, eventCrud, item) {

  $scope.item = item;
  $scope.saving = false;
  $scope.error = false;

  $scope.cancelRemoval = cancelRemoval;
  $scope.deleteEvent = deleteEvent;

  /**
   * Delete the event.
   */
  function deleteEvent() {
    $scope.error = false;
    $scope.saving = true;

    function showError() {
      $scope.saving = false;
      $scope.error = true;
    }

    eventCrud
      .deleteOffer(item)
      .then($uibModalInstance.close)
      .catch(showError);
  }

  /**
   * Cancel, modal dismiss.
   */
  function cancelRemoval() {
    $uibModalInstance.dismiss();
  }

}
