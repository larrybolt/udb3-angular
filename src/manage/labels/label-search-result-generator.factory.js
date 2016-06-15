'use strict';

/**
 * @ngdoc service
 * @name udb.manage.LabelSearchResultViewer
 * @description
 * # LabelSearchResultViewer
 * Label search result viewer factory
 */
angular
  .module('udb.manage')
  .factory('LabelSearchResultGenerator', LabelSearchResultGenerator);

/* @ngInject */
function LabelSearchResultGenerator(LabelService, SearchResultGenerator) {
  /**
   * @class LabelSearchResultViewer
   * @constructor
   * @param {Observable} query$
   * @param {Observable} page$
   * @param {Number} itemsPerPage
   */
  var LabelSearchResultGenerator = function (query$, page$, itemsPerPage) {
    SearchResultGenerator.call(this, query$, page$, itemsPerPage);
  };

  LabelSearchResultGenerator.prototype = Object.create(SearchResultGenerator.prototype);
  LabelSearchResultGenerator.prototype.constructor = LabelSearchResultGenerator;

  /**
   * @param {{query: *, offset: *}} searchParameters
   */
  LabelSearchResultGenerator.prototype.find = function (searchParameters) {
    return LabelService.find(searchParameters.query, this.itemsPerPage, searchParameters.offset);
  };

  return (LabelSearchResultGenerator);
}
