'use strict';

/**
 * @ngdoc function
 * @name udbApp.controller:LabelsListController
 * @description
 * # LabelsListController
 */
angular
  .module('udb.manage.labels')
  .controller('LabelsListController', LabelsListController);

/* @ngInject */
function LabelsListController($scope, $rootScope, LabelService, QuerySearchResultViewer) {
  var llc = this;
  llc.loading = false;
  llc.pagedItemViewer = new QuerySearchResultViewer(10, 1);

  /**
   * @param {PagedCollection} data
   */
  function setLabelsResults(data) {
    llc.pagedItemViewer.loading = true;
    llc.pagedItemViewer.setResults(data);
    llc.labels = data.labels;
  }

  llc.findLabels = function(query) {
    // Reset the pager when search query is changed.
    if (query !== llc.query) {
      llc.pagedItemViewer.currentPage = 1;
    }
    llc.query = query;
    LabelService
      .find(llc.query, llc.pagedItemViewer.currentPage)
      .then(setLabelsResults);
  };

  llc.findLabels();

  var labelsSearchSubmittedListener = $rootScope.$on('labelSearchSubmitted', function(event, args) {
    llc.findLabels(args.query);
  });

  llc.pageChanged = function() {
    llc.findLabels(llc.query);
  };

  $scope.$on('$destroy', labelsSearchSubmittedListener);
}
