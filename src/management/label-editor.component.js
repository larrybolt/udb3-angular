'use strict';

angular
  .module('udb.management')
  .component('udbLabelEditor', {
    templateUrl: 'templates/label-editor.html',
    controller: LabelEditorComponent,
    controllerAs: 'editor'
  });

/** @ngInject */
function LabelEditorComponent(LabelManager, $uibModal) {
  var editor = this;
  editor.updateVisibility = updateVisibility;
  editor.updatePrivacy = updatePrivacy;
  editor.$routerOnActivate = loadLabelFromParams;
  editor.renaming = false;
  editor.rename = rename;

  function rename() {
    function showRenamedLabel(jobInfo) {
      loadLabel(jobInfo.labelId);
    }

    editor.renaming = true;
    LabelManager
      .copy(editor.label)
      .then(showRenamedLabel, showErrorMessage)
      .finally(function () {
        editor.renaming = false;
      });
  }

  function showErrorMessage(message) {
    loadLabel(editor.label.id);
    var modalInstance = $uibModal.open(
      {
        templateUrl: 'templates/unexpected-error-modal.html',
        controller: 'UnexpectedErrorModalController',
        size: 'sm',
        resolve: {
          errorMessage: function() {
            return typeof message === 'string' ? message : 'Aanpassen mislukt, probeer het later opnieuw!';
          }
        }
      }
    );
  }

  function loadLabelFromParams(next) {
    var id = next.params.id;
    loadLabel(id);
  }

  /**
   *
   * @param {Label} label
   */
  function showLabel(label) {
    editor.label = label;
  }

  function loadLabel(id) {
    editor.loadingError = false;
    editor.label = false;
    LabelManager
      .get(id)
      .then(showLabel, showLoadingError);
  }

  function showLoadingError () {
    editor.loadingError = 'Label niet gevonden!';
  }

  function updateVisibility () {
    var isVisible = editor.label.isVisible;
    var jobPromise = isVisible ? LabelManager.makeVisible(editor.label) : LabelManager.makeInvisible(editor.label);
    jobPromise.catch(showErrorMessage);
  }

  function updatePrivacy () {
    var isPrivate = editor.label.isPrivate;
    var jobPromise = isPrivate ? LabelManager.makePrivate(editor.label) : LabelManager.makePublic(editor.label);
    jobPromise.catch(showErrorMessage);
  }
}
