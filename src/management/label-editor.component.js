'use strict';

angular
  .module('udb.management')
  .component('udbLabelEditor', {
    templateUrl: 'templates/label-editor.html',
    controller: LabelEditor,
    controllerAs: 'editor'
  });

/** @ngInject */
function LabelEditor() {
  var editor = this;

  editor.$routerOnActivate = function(next) {
    var id = next.params.id;

    editor.label = {
      name: 'Dope',
      id: id,
      isPrivate: false,
      isVisible: true
    };
  };
}
