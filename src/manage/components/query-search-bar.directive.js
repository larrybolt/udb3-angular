'use strict';

/**
 * @ngdoc component
 * @name udb.search.directive:udbSearchBar
 * @description
 * # udbQuerySearchBar
 */
angular
  .module('udb.manage')
  .directive('udbQuerySearchBar', udbQuerySearchBar);

/* @ngInject */
function udbQuerySearchBar($rootScope) {
  return {
    templateUrl: 'templates/query-search-bar.directive.html',
    restrict: 'E',
    link: function postLink(scope, element, attributes) {

      var searchBar = {
        queryString: '',
        label: attributes.qsbLabel
      };

      /**
       * Search with a given query string and update the search bar or use the one currently displayed in the search bar
       *
       * @param {String} [queryString]
       */
      searchBar.find = function (queryString) {
        var query = typeof queryString !== 'undefined' ? queryString : searchBar.queryString;

        searchBar.queryString = query;
        $rootScope.$emit(attributes.qsbEmit, {query: query});
      };

      scope.qsb = searchBar;

    }
  };
}
