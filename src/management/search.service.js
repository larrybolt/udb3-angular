'use strict';

/**
 * @ngdoc service
 * @name udb.management.SearchService
 * @description
 * # Search Service
 * This is a placeholder service to feed the search result generator.
 */
angular
  .module('udb.management')
  .service('SearchService', SearchService);

/* @ngInject */
function SearchService($q) {
  var service = this;

  /**
   * @param {string} query
   * @param {int} limit
   * @param {int} start
   *
   * @return {Promise.<PagedCollection>}
   */
  service.find = function(query, limit, start) {
    return $q.resolve({
      '@context': 'http://www.w3.org/ns/hydra/context.jsonld',
      '@type': 'PagedCollection',
      'itemsPerPage': 10,
      'totalItems': 0,
      'member': [],
      'firstPage': 'http://du.de/items?page=1',
      'lastPage': 'http://du.de/items?page=1',
      'nextPage': 'http://du.de/items?page=1'
    });
  };
}
