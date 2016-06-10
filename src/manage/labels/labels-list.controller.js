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
  var labelsPerPage = 10;
  llc.loading = false;
  llc.pagedItemViewer = new QuerySearchResultViewer(labelsPerPage, 1);
  llc.query = '';

  /**
   * @param {PagedCollection} data
   */
  function setLabelsResults(data) {
    llc.pagedItemViewer.loading = true;
    llc.pagedItemViewer.setResults(data);
    llc.labels = data.member;
  }

  llc.findLabels = function(query) {
    // Reset the pager when search query is changed.
    if (query !== llc.query) {
      llc.pagedItemViewer.currentPage = 1;
    }
    llc.query = query;
    LabelService
      .find(llc.query, labelsPerPage, llc.pagedItemViewer.currentPage)
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
