'use strict';

/**
 * @ngdoc function
 * @name udbApp.controller:RoleCreatorController
 * @description
 * # RoleCreatorController
 */
angular
  .module('udb.management.roles')
  .controller('RoleCreatorController', RoleCreatorController);

/** @ngInject */
function RoleCreatorController(RoleManager, PermissionManager, $uibModal) {
  var creator = this;
  creator.creating = false;
  creator.create = create;
  creator.loadedPermissions = false;
  creator.role = {
    name: '',
    isPrivate: false,
    isVisible: true
  };

  function loadPermissions () {
    PermissionManager
      .getAll().then(function(permissions){
        creator.permissions = permissions;
      }, showProblem)
      .finally(function() {
        creator.loadedPermissions = true;
      });
  }
  loadPermissions();

  function create() {
    function goToOverview(jobInfo) {
      creator.$router.navigate(['RolesList']);
    }

    creator.creating = true;
    RoleManager
      .create(creator.role.name, creator.role.editPermission)
      .then(goToOverview, showProblem)
      .finally(function () {
        creator.creating = false;
      });
  }

  /**
   * @param {ApiProblem} problem
   */
  function showProblem(problem) {
    var modalInstance = $uibModal.open(
      {
        templateUrl: 'templates/unexpected-error-modal.html',
        controller: 'UnexpectedErrorModalController',
        size: 'sm',
        resolve: {
          errorMessage: function() {
            return problem.title + ' ' + problem.detail;
          }
        }
      }
    );
  }
}
