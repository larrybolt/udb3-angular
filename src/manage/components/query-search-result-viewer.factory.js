'use strict';

/**
 * @ngdoc service
 * @name udb.manage.UserSearchResultViewer
 * @description
 * # QuerySearchResultViewer
 * User search result viewer factory
 */
angular
  .module('udb.manage')
  .factory('QuerySearchResultViewer', QuerySearchResultViewerFactory);

function QuerySearchResultViewerFactory() {

  /**
   * @class SearchResultViewer
   * @constructor
   * @param    {Number}     itemsPerPage        The number of items shown per page
   *
   * @property {Object[]}   events          A list of json-LD event objects
   * @property {Number}     itemsPerPage    The current page size
   * @property {Number}     totalItems      The total items found
   * @property {Number}     currentPage     The index of the current page without zeroing
   * @property {boolean}    loading         A flag to indicate the period between changing of the query and
   *                                        receiving of the results.
   */
  var QuerySearchResultViewer = function (itemsPerPage, activePage) {
    this.itemsPerPage = itemsPerPage || 30;
    this.items = [];
    this.totalItems = 0;
    this.currentPage = activePage || 1;
    this.loading = true;
  };

  QuerySearchResultViewer.prototype = {
    /**
     * @param {PagedCollection} pagedResults
     */
    setResults: function (pagedResults) {
      var viewer = this;

      viewer.itemsPerPage = pagedResults.itemsPerPage;
      viewer.items = pagedResults.member;
      viewer.totalItems = pagedResults.totalItems;

      viewer.loading = false;
    }
  };

  return (QuerySearchResultViewer);
}
