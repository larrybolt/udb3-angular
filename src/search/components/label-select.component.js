'use strict';

angular
  .module('udb.search')
  .component('udbLabelSelect', {
    templateUrl: 'templates/label-select.html',
    controller: LabelSelectComponent,
    controllerAs: 'select',
    bindings: {
      offer: '<',
      labelAdded: '&',
      labelRemoved: '&'
    }
  });

/** @ngInject */
function LabelSelectComponent(LabelManager) {
  var select = this;
  select.availableLabels = [];
  select.suggestLabels = suggestLabels;
  select.labels = _.map(select.offer.labels, function (labelName) {
    return {name:labelName};
  });
  select.createLabel = function(labelName) {
    return {name:labelName};
  };

  function suggestLabels(name) {
    function setAvailableLabels(labels) {
      var newLabel = {name: name};
      select.availableLabels = _.chain(labels)
        .union([newLabel])
        .reject(function(label) {
          return _.find(select.labels, {'name': label.name});
        })
        .uniq('name')
        .value();
    }

    LabelManager
      .getSuggestions(name)
      .then(setAvailableLabels);
  }
}
