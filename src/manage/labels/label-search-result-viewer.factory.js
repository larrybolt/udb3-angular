'use strict';

/**
 * @ngdoc service
 * @name udb.manage.LabelSearchResultViewer
 * @description
 * # QuerySearchResultViewer
 * User search result viewer factory
 */
angular
  .module('udb.manage')
  .factory('LabelSearchResultViewer', LabelSearchResultViewerFactory);

function LabelSearchResultViewerFactory(LabelService, rx) {
  /**
   * @class SearchResultViewer
   * @constructor
   * @param {Observable} query$
   * @param {Observable} page$
   * @param {Number} itemsPerPage
   */
  var ResultViewer = function (query$, page$, itemsPerPage) {
    this.itemsPerPage = itemsPerPage;
    this.query$ = query$.debounce(300);
    this.offset$ = page$.map(pageToOffset(itemsPerPage)).startWith(0);

    this.searchParameters$ = rx.Observable.combineLatest(
      this.query$,
      this.offset$,
      combineQueryParameters
    );
  };

  /**
   * @param {string} query
   * @param {Number} offset
   * @return {{query: *, offset: *}}
   */
  function combineQueryParameters(query, offset) {
    return {query: query, offset: offset};
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

  /**
   * @param {{query: *, offset: *}} searchParameters
   */
  function findLabels(searchParameters) {
    return LabelService.find(searchParameters.query, ResultViewer.itemsPerPage, searchParameters.offset);
  }

  ResultViewer.prototype.getSearchResult$ = function () {
    return this.searchParameters$
      .selectMany(findLabels);
  };

  return (ResultViewer);
}
