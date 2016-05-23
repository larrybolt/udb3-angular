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
   * @param {PagedCollection} users
   */
  function setUsersResults(users) {
    ulc.pagedItemViewer.loading = true;
    ulc.pagedItemViewer.setResults(users);
    ulc.users = users;
  }

  function getUsersResult() {
    UserService
      .getUsers(ulc.pagedItemViewer.currentPage)
      .then(setUsersResults);
  }

  function findUsers() {
    UserService
      .find()
      .then(setUsersResults);
  }

  getUsersResult();

  var userSearchSubmittedListener = $rootScope.$on('userSearchSubmitted', function(event, args) {
    findUsers(args.query);
  });

  $scope.$on('$destroy', userSearchSubmittedListener);
}
