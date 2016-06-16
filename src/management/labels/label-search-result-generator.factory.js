'use strict';

/**
 * @ngdoc service
 * @name udb.management.LabelSearchResultViewer
 * @description
 * # Label Search Result Generator
 * Create search result generator that takes a query and page input and provides a stream of paged search results.
 */
angular
  .module('udb.management.labels')
  .factory('LabelSearchResultGenerator', LabelSearchResultGenerator);

/* @ngInject */
function LabelSearchResultGenerator(LabelManager, SearchResultGenerator) {
  /**
   * @class LabelSearchResultViewer
   * @constructor
   * @param {Observable} query$
   * @param {Observable} page$
   * @param {Number} itemsPerPage
   */
  var LabelSearchResultGenerator = function (query$, page$, itemsPerPage) {
    SearchResultGenerator.call(this, query$, page$, itemsPerPage);

    this.searchService = LabelManager;
  };

  LabelSearchResultGenerator.prototype = Object.create(SearchResultGenerator.prototype);
  LabelSearchResultGenerator.prototype.constructor = LabelSearchResultGenerator;

  return (LabelSearchResultGenerator);
}
