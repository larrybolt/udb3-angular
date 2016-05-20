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
function UsersListController($scope, userService, UserSearchResultViewer) {
  var ulc = this;
  ulc.loading = false;
  ulc.pagedItemViewer = new UserSearchResultViewer(10, 1);

  /**
   * @param {PagedCollection} results
   */
  function setUsersResults(users) {
    ulc.users = users;
  }

  function getUsersResult() {
    userService
      .getUsers(ulc.pagedItemViewer.currentPage)
      .then(setUsersResults);
  }
  getUsersResult();
}