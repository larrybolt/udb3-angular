(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name udbApp.controller:DashboardCtrl
   * @description
   * # DashboardCtrl
   * dashboard
   */
  angular
    .module('udb.dashboard')
    .controller('DashboardController', DashboardController);

  /* @ngInject */
  function DashboardController($scope, $uibModal, udbApi, eventCrud, jsonLDLangFilter, SearchResultViewer) {

    var dash = this;

    dash.pagedItemViewer = new SearchResultViewer(50, 1);
    dash.openDeleteConfirmModal = openDeleteConfirmModal;
    dash.updateItemViewer = updateItemViewer;

    function setItemViewerData(response) {
      dash.pagedItemViewer.setResults(response.data);
    }

    function updateItemViewer() {
      udbApi
        .getDashboardItems(dash.pagedItemViewer.currentPage)
        .then(setItemViewerData);
    }
    updateItemViewer();

    function openEventDeleteConfirmModal(item) {
      var modalInstance = $uibModal.open({
        templateUrl: 'templates/event-delete-confirm-modal.html',
        controller: 'EventDeleteConfirmModalCtrl',
        resolve: {
          item: function () {
            return item;
          }
        }
      });
      modalInstance.result.then(updateItemViewer);
    }

    function openPlaceDeleteConfirmModal(item) {

      function displayModal(place, events) {
        var modalInstance = $uibModal.open({
          templateUrl: 'templates/place-delete-confirm-modal.html',
          controller: 'PlaceDeleteConfirmModalCtrl',
          resolve: {
            place: function () {
              return place;
            },
            events: function () {
              return event;
            }
          }
        });

        modalInstance.result.then(updateItemViewer);
      }

      // Check if this place has planned events.
      eventCrud
        .findEventsForLocation(item.id)
        .then(function(jsonResponse) {
          displayModal(item, jsonResponse.data.events);
        });
    }

    /**
     * Open the confirmation modal to delete an event/place.
     *
     * @param {Object} item
     */
    function openDeleteConfirmModal(item) {
      var itemType = item['@id'].indexOf('event') === -1 ? 'place' : 'event';

      if (itemType === 'event') {
        openEventDeleteConfirmModal(item);
      }
      else {
        openPlaceDeleteConfirmModal(item);
      }
    }

  }

})();
