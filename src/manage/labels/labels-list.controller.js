'use strict';

/**
 * @ngdoc function
 * @name udbApp.controller:LabelsListController
 * @description
 * # LabelsListController
 */
angular
  .module('udb.manage.labels')
  .controller('LabelsListController', LabelsListController);

/* @ngInject */
function LabelsListController($scope, $rootScope, LabelService, QuerySearchResultViewer) {
  var llc = this;
  llc.loading = false;
  llc.pagedItemViewer = new QuerySearchResultViewer(10, 1);

  /**
   * @param {PagedCollection} data
   */
  function setRolesResults(data) {
    llc.pagedItemViewer.loading = true;
    llc.pagedItemViewer.setResults(data);
    llc.roles = data.roles;
  }

  llc.findRoles = function(query) {
    // Reset the pager when search query is changed.
    if (query !== llc.query) {
      llc.pagedItemViewer.currentPage = 1;
    }
    llc.query = query;
    LabelService
      .find(llc.query, llc.pagedItemViewer.currentPage)
      .then(setRolesResults);
  };

  llc.findRoles();

  var rolesSearchSubmittedListener = $rootScope.$on('roleSearchSubmitted', function(event, args) {
    llc.findRoles(args.query);
  });

  llc.pageChanged = function() {
    llc.findRoles(llc.query);
  };

  $scope.$on('$destroy', rolesSearchSubmittedListener);
}
