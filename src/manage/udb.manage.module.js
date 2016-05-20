'use strict';

/**
 * @ngdoc module
 * @name udb.manage
 * @description
 * The udb manage module
 */
angular
  .module('udb.manage', [
    'ngSanitize',
    'ui.bootstrap',
    'udb.core',
    'udb.config'
  ])

  .config(function ($routeProvider) {
    $routeProvider
      .when('/manage/users/list', {
        templateUrl: 'templates/users-list.html',
        controller: 'UsersListController',
        controllerAs: 'ulc'
      });

  });
