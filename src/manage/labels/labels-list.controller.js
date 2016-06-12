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
  var offset;
  llc.loading = false;
  llc.pagedItemViewer = new QuerySearchResultViewer(labelsPerPage, 1);
  llc.query = '';

  llc.findLabels = function(query) {
    // Reset the pager when search query is changed.
    if (query !== llc.query) {
      llc.pagedItemViewer.currentPage = 1;
    }

    // Calculate the offset for the pager
    offset = (llc.pagedItemViewer.currentPage - 1) * labelsPerPage;
    llc.query = query;
    llc.loading = true;
    LabelService
      .find(llc.query, labelsPerPage, offset)
      .then(llc.pagedItemViewer.setResults)
      .finally(function () {
        llc.loading = false;
      });
  };

  var labelsSearchSubmittedListener = $rootScope.$on('labelSearchSubmitted', function(event, args) {
    llc.findLabels(args.query || '');
  });

  llc.pageChanged = function() {
    llc.findLabels(llc.query);
  };

  $scope.$on('$destroy', labelsSearchSubmittedListener);
}
