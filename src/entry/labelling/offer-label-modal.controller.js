'use strict';

/**
 * @ngdoc function
 * @name udb.entry.controller:OfferLabelModalCtrl
 * @description
 * # OfferLabelModalCtrl
 * Controller of the udb.entry
 */
angular
  .module('udb.entry')
  .controller('OfferLabelModalCtrl', OfferLabelModalCtrl);

/* @ngInject */
function OfferLabelModalCtrl($scope, $modalInstance, udbApi) {
  var labelPromise = udbApi.getRecentLabels();

  var ok = function () {
    // Get the labels selected by checkbox
    var checkedLabels = $scope.labelSelection.filter(function (label) {
      return label.selected;
    }).map(function (label) {
      return label.name;
    });

    //add the labels
    var inputLabels = parseLabelInput($scope.labelNames);

    // join arrays and remove doubles
    var labels = _.union(checkedLabels, inputLabels);

    $modalInstance.close(labels);
  };

  var close = function () {
    $modalInstance.dismiss('cancel');
  };

  function parseLabelInput(stringWithLabels) {
    //split sting into array of labels
    var labels = stringWithLabels.split(';');

    // trim whitespaces
    labels = _.each(labels, function (label, index) {
      labels[index] = label.trim();
    });

    // remove empty strings
    labels = _.without(labels, '');

    return labels;
  }

  labelPromise.then(function (labels) {
    $scope.availableLabels = labels;
    $scope.labelSelection = _.map(labels, function (label) {
      return {'name': label, 'selected': false};
    });
  });
  // ui-select can't get to this scope variable unless you reference it from the $parent scope.
  // seems to be 1.3 specific issue, see: https://github.com/angular-ui/ui-select/issues/243
  $scope.labels = [];
  $scope.close = close;
  $scope.ok = ok;
  $scope.labelNames = '';
}
