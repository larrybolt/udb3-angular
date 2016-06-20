'use strict';

angular
  .module('udb.management.labels')
  .component('udbLabelCreator', {
    templateUrl: 'templates/label-creator.html',
    controller: LabelCreatorComponent,
    controllerAs: 'creator',
    bindings: {
      $router: '<'
    }
  });

/** @ngInject */
function LabelCreatorComponent(LabelManager, $uibModal) {
  var creator = this;
  creator.creating = false;
  creator.create = create;
  creator.label = {
    name: '',
    isPrivate: false,
    isVisible: true
  };

  function create() {
    function goToOverview(jobInfo) {
      creator.$router.navigate(['LabelsList']);
    }

    creator.creating = true;
    LabelManager
      .create(creator.label.name, creator.label.isVisible, creator.label.isPrivate)
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
