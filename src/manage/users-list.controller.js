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
function UsersListController($scope, UserService, UserSearchResultViewer) {
  var ulc = this;
  ulc.loading = false;
  ulc.pagedItemViewer = new UserSearchResultViewer(10, 1);

  /**
   * @param {PagedCollection} users
   */
  function setUsersResults(users) {
    ulc.users = users;
  }

  function getUsersResult() {
    UserService
      .getUsers(ulc.pagedItemViewer.currentPage)
      .then(setUsersResults);
  }
  getUsersResult();
}
