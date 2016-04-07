
'use strict';

/**
 * @ngdoc function
 * @name udbApp.controller:PlaceDeleteConfirmModalCtrl
 * @description
 * # PlaceDeleteConfirmModalCtrl
 * Modal to delete an event.
 */
angular
  .module('udb.dashboard')
  .controller('PlaceDeleteConfirmModalCtrl', PlaceDeleteConfirmModalController);

/* @ngInject */
function PlaceDeleteConfirmModalController(
  $scope,
  $uibModalInstance,
  eventCrud,
  place,
  events,
  appConfig
) {
  $scope.place = place;
  $scope.saving = false;
  $scope.events = events ? events : [];
  $scope.hasEvents = $scope.events.length > 0;
  $scope.baseUrl = appConfig.udb3BaseUrl;
  $scope.cancelRemoval = cancelRemoval;
  $scope.deletePlace = deletePlace;

  function deletePlace() {
    $scope.saving = true;
    $scope.error = false;

    function showError() {
      $scope.saving = false;
      $scope.error = true;
    }

    eventCrud
      .deleteOffer(place)
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
