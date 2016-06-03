'use strict';

angular
  .module('udb.management')
  .component('udbLabelEditor', {
    templateUrl: 'templates/label-editor.html',
    controller: LabelEditor,
    controllerAs: 'editor'
  });

/** @ngInject */
function LabelEditor(LabelManager) {
  var editor = this;
  editor.updateVisibility = updateVisibility;
  editor.updatePrivacy = updatePrivacy;
  editor.$routerOnActivate = loadLabelFromParams;
  editor.renaming = false;
  editor.rename = rename;

  function rename() {
    editor.renaming = true;
    LabelManager
      .copy(editor.label)
      .finally(function () {
        editor.renaming = false;
      });
  }

  function loadLabelFromParams(next) {
    var id = next.params.id;

    editor.label = {
      name: 'Dope',
      id: id,
      isPrivate: false,
      isVisible: true
    };
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
