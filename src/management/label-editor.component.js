'use strict';

angular
  .module('udb.management')
  .component('udbLabelEditor', {
    templateUrl: 'templates/label-editor.html',
    controller: LabelEditorComponent,
    controllerAs: 'editor'
  });

/** @ngInject */
function LabelEditorComponent(LabelManager, $q) {
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
      .then(showRenamedLabel)
      .finally(function () {
        editor.renaming = false;
      });
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
  }

  function updatePrivacy () {
    var isPrivate = editor.label.isPrivate;
    var jobPromise = isPrivate ? LabelManager.makePrivate(editor.label) : LabelManager.makePublic(editor.label);
  }
}
