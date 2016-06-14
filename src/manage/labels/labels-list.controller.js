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
function LabelsListController(LabelSearchResultViewer, rx, $scope) {
  var llc = this;
  var labelsPerPage = 10;
  var query$ = rx.createObservableFunction(llc, 'queryChanged');
  var filteredQuery$ = query$.filter(ignoreShortQueries);
  var page$ = rx.createObservableFunction(llc, 'pageChanged');
  var resultViewer = new LabelSearchResultViewer(filteredQuery$, page$, labelsPerPage);
  var searchResult$ = resultViewer.getSearchResult$();

  /**
   * @param {string} query
   * @return {boolean}
   */
  function ignoreShortQueries(query) {
    // Only if the query is longer than 2 characters
    return query.length > 2;
  }

  llc.loading = false;
  llc.query = '';
  llc.page = 0;

  query$
    .safeApply($scope, function (query) {
      llc.query = query;
    })
    .subscribe();

  searchResult$
    .safeApply($scope, function (searchResult) {
      llc.searchResult = searchResult;
      llc.loading = false;
    })
    .subscribe();

  filteredQuery$
    .merge(page$)
    .safeApply($scope, function () {
      llc.loading = true;
    })
    .subscribe();
}
