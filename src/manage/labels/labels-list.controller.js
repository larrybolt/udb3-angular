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
  llc.pagedItemViewer = undefined;
  llc.query = '';
  llc.page = 0;

  llc.findLabels = function(query, offset) {
    llc.loading = true;

    function updateSearchResultViewer(searchResult) {
      if (query === llc.query) {
        llc.pagedItemViewer.setResults(offset, searchResult);
      } else {
        llc.query = query;
        llc.pagedItemViewer = new QuerySearchResultViewer(query, offset, searchResult);
      }
    }

    LabelService
      .find(llc.query, labelsPerPage, offset)
      .then(updateSearchResultViewer)
      .finally(function () {
        llc.loading = false;
      });
  };

  var labelsSearchSubmittedListener = $rootScope.$on('labelSearchSubmitted', function(event, args) {
    llc.findLabels(args.query || '', 0);
  });

  llc.pageChanged = function() {
    offset = (llc.page - 1) * labelsPerPage;
    llc.findLabels(llc.query, offset);
  };

  $scope.$on('$destroy', labelsSearchSubmittedListener);
}
