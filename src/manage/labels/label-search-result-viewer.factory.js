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

function LabelSearchResultViewerFactory(LabelService) {

  /**
   * @class SearchResultViewer
   * @constructor
   * @param    {Number}           query
   * @param    {Number}           start
   * @param    {PagedCollection}  searchResult
   *
   * @property {Object[]}   items           A list of search results items
   * @property {Number}     itemsPerPage    The current page size
   * @property {Number}     totalItems      The total items found
   * @property {Number}     currentPage     The index of the current page without zeroing
   */
  var QuerySearchResultViewer = function (query, start, searchResult) {
    this.query = query;
    this.setResults(start, searchResult);
  };

  QuerySearchResultViewer.prototype = {
    /**
     * @param {Number}           start
     * @param {PagedCollection}  pagedResult
     */
    setResults: function (start, pagedResult) {
      var viewer = this;
      viewer.start = start;
      viewer.itemsPerPage = pagedResult.itemsPerPage;
      viewer.items = pagedResult.member;
      viewer.totalItems = pagedResult.totalItems;
    }
  };

  return (QuerySearchResultViewer);
}
