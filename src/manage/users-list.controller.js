'use strict';

/**
 * @ngdoc function
 * @name udbApp.controller:UserListController
 * @description
 * # UserListController
 */
angular
  .module('udb.manage')
  .controller('UsersListController', UsersListController);

/* @ngInject */
function UsersListController($scope, $rootScope, UserService, UserSearchResultViewer) {
  var ulc = this;
  ulc.loading = false;
  ulc.pagedItemViewer = new UserSearchResultViewer(10, 1);

  /**
   * @param {PagedCollection} data
   */
  function setUsersResults(data) {
    ulc.pagedItemViewer.loading = true;
    ulc.pagedItemViewer.setResults(data);
    ulc.users = data.users;
  }

  function findUsers(query) {
    UserService
      .find(query, ulc.pagedItemViewer.currentPage)
      .then(setUsersResults);
  }

  findUsers();

  var userSearchSubmittedListener = $rootScope.$on('userSearchSubmitted', function(event, args) {
    findUsers(args.query);
  });

  $scope.$on('$destroy', userSearchSubmittedListener);
}
