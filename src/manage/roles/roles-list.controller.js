'use strict';

/**
 * @ngdoc function
 * @name udbApp.controller:RolesListController
 * @description
 * # RolesListController
 */
angular
  .module('udb.manage')
  .controller('RolesListController', RolesListController);

/* @ngInject */
function RolesListController($scope, $rootScope, RolesService, QuerySearchResultViewer) {
  var rlc = this;
  rlc.loading = false;
  rlc.pagedItemViewer = new QuerySearchResultViewer(10, 1);

  /**
   * @param {PagedCollection} data
   */
  function setRolesResults(data) {
    rlc.pagedItemViewer.loading = true;
    rlc.pagedItemViewer.setResults(data);
    rlc.roles = data.roles;
  }

  rlc.findRoles = function(query) {
    // Reset the pager when search query is changed.
    if (query !== rlc.query) {
      rlc.pagedItemViewer.currentPage = 1;
    }
    rlc.query = query;
    RolesService
      .find(rlc.query, rlc.pagedItemViewer.currentPage)
      .then(setRolesResults);
  };

  rlc.findRoles();

  var rolesSearchSubmittedListener = $rootScope.$on('userSearchSubmitted', function(event, args) {
    rlc.findRoles(args.query);
  });

  rlc.pageChanged = function() {
    rlc.findRoles(rlc.query);
  };

  $scope.$on('$destroy', rolesSearchSubmittedListener);
}
