'use strict';

/**
 * @ngdoc directive
 * @name udb.search.directive:udbSearchBar
 * @description
 * # udbSearchBar
 */
angular
  .module('udb.manage')
  .directive('udbUserSearchBar', udbUserSearchBar);

/* @ngInject */
function udbUserSearchBar($rootScope, $uibModal) {
  return {
    templateUrl: 'templates/user-search-bar.directive.html',
    restrict: 'E',
    link: function postLink(scope, element, attrs) {

      var searchBar = {
        queryString: '',
        hasErrors: false,
        errors: '',
        isEditing: false
      };

      var editorModal;

      searchBar.editQuery = function () {
        $rootScope.$emit('startEditingQuery');
        searchBar.isEditing = true;

        editorModal = $uibModal.open({
          templateUrl: 'templates/query-editor-modal.html',
          controller: 'QueryEditorController',
          controllerAs: 'qe',
          size: 'lg'
        });
      };

      /**
       * Search with a given query string and update the search bar or use the one currently displayed in the search bar
       *
       * @param {String} [queryString]
       */
      searchBar.find = function (queryString) {
        var query = typeof queryString !== 'undefined' ? queryString : searchBar.queryString;

        searchBar.queryString = query;
        searchHelper.setQueryString(query);
        $rootScope.$emit('searchSubmitted');
      };

      /**
       * When the user manually changes the query field the current query tree should be cleared
       */
      searchBar.queryChanged = function() {
        searchHelper.clearQueryTree();
      };

      scope.sb = searchBar;

      /**
       * Update the search bar with the info from a query object.
       *
       * @param {Object} event
       * @param {Object} query
       */
      searchBar.updateQuery = function(event, query) {
        searchBar.queryString = query.queryString;

        if (query.errors && query.errors.length) {
          scope.sb.hasErrors = true;
          scope.sb.errors = formatErrors(query.errors);
        } else {
          scope.sb.hasErrors = false;
          scope.sb.errors = '';
        }
      };

      function formatErrors(errors) {
        var formattedErrors = '';

        _.forEach(errors, function (error) {
          formattedErrors += (error + '\n');
        });

        return formattedErrors;
      }

      var stopEditingQueryListener = $rootScope.$on('stopEditingQuery', function () {
        scope.sb.isEditing = false;
        if (editorModal) {
          editorModal.dismiss();
        }
      });

      var searchQueryChangedListener = $rootScope.$on('searchQueryChanged', searchBar.updateQuery);

      scope.$on('$destroy', stopEditingQueryListener);
      scope.$on('$destroy', searchQueryChangedListener);
    }
  };
}
