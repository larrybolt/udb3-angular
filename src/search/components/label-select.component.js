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
function LabelSelectComponent(offerLabeller) {
  var select = this;
  /** @type {Label[]} */
  select.availableLabels = [];
  select.suggestLabels = suggestLabels;
  select.createLabel = createLabel;
  /** @type {Label[]} */
  select.labels = _.map(select.offer.labels, function (labelName) {
    return {name:labelName};
  });

  function createLabel(labelName) {
    return {name:labelName};
  }

  function suggestLabels(name) {
    /** @param {string[]} labels */
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

    offerLabeller
      .getSuggestions(name, 6)
      .then(setAvailableLabels);
  }
}
