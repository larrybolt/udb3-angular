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
function LabelsListController(LabelService, QuerySearchResultViewer, rx) {
  var llc = this;
  var labelsPerPage = 10;
  var offset;
  llc.loading = false;
  llc.pagedItemViewer = undefined;
  llc.query = '';
  llc.page = 0;
  var query$ = rx.createObservableFunction(llc, 'queryChanged');

  query$
    .filter(function (queryString) {
      // Only if the query string is longer than 2 characters
      return queryString.length > 2;
    })
    .debounce(300)
    .subscribe(queryChanged);

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

  /**
   * @param {string} queryString
   */
  function queryChanged(queryString) {
    llc.findLabels(queryString, 0);
  }

  llc.pageChanged = function() {
    offset = (llc.page - 1) * labelsPerPage;
    llc.findLabels(llc.query, offset);
  };
}
