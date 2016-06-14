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
  var query$ = rx.createObservableFunction(llc, 'queryChanged')
    .filter(ignoreShortQueries)
    .debounce(300);
  var offset$ = rx.createObservableFunction(llc, 'pageChanged')
    .map(pageToOffset(labelsPerPage))
    .startWith(0);
  var searchParameters$ = rx.Observable.combineLatest(
    query$,
    offset$,
    combineQueryParameters
  );

  /**
   * @param {string} query
   * @param {Number} offset
   * @return {{query: *, offset: *}}
   */
  function combineQueryParameters(query, offset) {
    return {query: query, offset: offset};
  }

  /**
   * @param {string} query
   * @return {boolean}
   */
  function ignoreShortQueries(query) {
    // Only if the query is longer than 2 characters
    return query.length > 2;
  }

  /**
   * @param {Number} itemsPerPage
   * @return {Function}
   */
  function pageToOffset(itemsPerPage) {
    return function(page) {
      return (page - 1) * itemsPerPage;
    };
  }

  llc.findLabels = function(searchParameters) {
    llc.loading = true;

    function updateSearchResultViewer(searchResult) {
      llc.pagedItemViewer = new QuerySearchResultViewer(searchParameters.query, searchParameters.offset, searchResult);
    }

    LabelService
      .find(searchParameters.query, labelsPerPage, searchParameters.offset)
      .then(updateSearchResultViewer)
      .finally(function () {
        llc.loading = false;
      });
  };

  searchParameters$.subscribe(llc.findLabels);
}
