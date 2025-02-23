'use strict';

/**
 * @ngdoc factory
 * @name udb.management.SearchResultGenerator
 * @description
 * # Search Result Generator
 * Provides a stream of paged search results.
 */
angular
  .module('udb.management')
  .factory('SearchResultGenerator', SearchResultGenerator);

/* @ngInject */
function SearchResultGenerator(rx) {
  /**
   * @class SearchResultGenerator
   * @constructor
   * @param {Object} searchService
   * @param {Observable} query$
   * @param {Observable} page$
   * @param {Number} itemsPerPage
   */
  var SearchResultGenerator = function (searchService, query$, page$, itemsPerPage) {
    this.searchService = searchService;
    this.itemsPerPage = itemsPerPage;
    this.query$ = query$.debounce(300);
    this.offset$ = page$.map(pageToOffset(itemsPerPage)).startWith(0);

    this.searchParameters$ = rx.Observable.combineLatest(
      this.query$,
      this.offset$,
      combineQueryParameters
    );
  };

  SearchResultGenerator.prototype.constructor = SearchResultGenerator;

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
   * @return {Promise.<PagedCollection>}
   */
  SearchResultGenerator.prototype.find = function (searchParameters) {
    var generator = this;

    return generator.searchService
      .find(searchParameters.query, generator.itemsPerPage, searchParameters.offset);
  };

  SearchResultGenerator.prototype.getSearchResult$ = function () {
    var generator = this;

    return generator.searchParameters$
      .selectMany(generator.find.bind(generator));
  };

  return (SearchResultGenerator);
}
