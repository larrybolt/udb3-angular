'use strict';

/**
 * @ngdoc function
 * @name udbApp.controller:EventFormImageRemoveController
 * @description
 * # EventFormImageRemoveController
 * Modal for removing images from an offer.
 */
angular
  .module('udb.event-form')
  .controller('EventFormImageRemoveController', EventFormImageRemoveController);

/* @ngInject */
function EventFormImageRemoveController($scope, $uibModalInstance, EventFormData, eventCrud, image) {

  // Scope vars.
  $scope.saving = false;
  $scope.error = false;

  // Scope functions.
  $scope.cancel = cancel;
  $scope.removeImage = removeImage;

  /**
   * Cancel the modal.
   */
  function cancel() {
    $uibModalInstance.dismiss('cancel');
  }

  function showError() {
    $scope.error = true;
    $scope.saving = false;
  }

  function triggerLoadingState() {
    $scope.saving = true;
    $scope.error = false;
  }

  function removeImage() {
    triggerLoadingState();

    function updateEventFormDataAndCloseModal() {
      EventFormData.removeMediaObject(image);
      $scope.saving = false;
      $uibModalInstance.close();
    }

    eventCrud
      .removeImage(EventFormData, image)
      .then(updateEventFormDataAndCloseModal, showError);
  }
}
