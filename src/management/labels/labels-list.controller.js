'use strict';

/**
 * @ngdoc function
 * @name udbApp.controller:LabelsListController
 * @description
 * # LabelsListController
 */
angular
  .module('udb.management.labels')
  .controller('LabelsListController', LabelsListController);

/* @ngInject */
function LabelsListController(LabelSearchResultGenerator, rx, $scope) {
  var llc = this;
  var labelsPerPage = 1;
  var minQueryLength = 3;
  var query$ = rx.createObservableFunction(llc, 'queryChanged');
  var filteredQuery$ = query$.filter(ignoreShortQueries);
  var page$ = rx.createObservableFunction(llc, 'pageChanged');
  var searchResultGenerator = new LabelSearchResultGenerator(filteredQuery$, page$, labelsPerPage);
  var searchResult$ = searchResultGenerator.getSearchResult$();

  /**
   * @param {string} query
   * @return {boolean}
   */
  function ignoreShortQueries(query) {
    return query.length >= minQueryLength;
  }

  /**
   * @param {PagedCollection} searchResult
   */
  function showSearchResult(searchResult) {
    llc.searchResult = searchResult;
    llc.loading = false;
  }

  llc.loading = false;
  llc.query = '';
  llc.page = 0;
  llc.minQueryLength = minQueryLength;

  query$
    .safeApply($scope, function (query) {
      llc.query = query;
    })
    .subscribe();

  searchResult$
    .safeApply($scope, showSearchResult)
    .subscribe();

  filteredQuery$
    .merge(page$)
    .safeApply($scope, function () {
      llc.loading = true;
    })
    .subscribe();
}
