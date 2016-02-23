(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name udbApp.controller:SuggestionPreviewModalController
   * @description
   * Provides a controller to preview suggestions
   */
  angular
    .module('udb.event-form')
    .controller('SuggestionPreviewModalController', SuggestionPreviewModalController);

  /* @ngInject */
  function SuggestionPreviewModalController(
    $scope,
    $uibModalInstance,
    selectedSuggestionId,
    resultViewer,
    suggestionType
  ) {

    /**
     * A factory that helps look for the items in a result viewer by id.
     *
     * @param {string} itemId
     *  The UUID of an UDB item.
     *
     * @return {Function}
     *  A function that can be used as a callback that looks through result viewer items
     */
    function itemIdentifier(itemId) {
      return function(item) {
        return item['@id'].indexOf(itemId) !== -1;
      };
    }

    $scope.previousSuggestion = previousSuggestion;
    $scope.nextSuggestion = nextSuggestion;
    $scope.currentSuggestionId = selectedSuggestionId;
    $scope.currentSuggestionIndex = _.findIndex(resultViewer.events, itemIdentifier(selectedSuggestionId));
    $scope.closePreview = closePreview;
    $scope.suggestionCount = resultViewer.totalItems;
    $scope.currentSuggestion = _.find(resultViewer.events, itemIdentifier(selectedSuggestionId));
    $scope.suggestions = resultViewer.events;
    $scope.suggestionType = suggestionType;

    function previousSuggestion() {
      var previousIndex = $scope.currentSuggestionIndex - 1;
      var suggestion = resultViewer.events[previousIndex.toString()];

      if (suggestion) {
        $scope.currentSuggestion = suggestion;
        $scope.currentSuggestionIndex = previousIndex;
      } else {
        closePreview();
      }
    }

    function nextSuggestion() {
      var nextIndex = $scope.currentSuggestionIndex + 1;
      var suggestion = resultViewer.events[nextIndex.toString()];

      if (suggestion) {
        $scope.currentSuggestion = suggestion;
        $scope.currentSuggestionIndex = nextIndex;
      } else {
        closePreview();
      }
    }

    function closePreview() {
      $uibModalInstance.close();
    }

  }

})();
