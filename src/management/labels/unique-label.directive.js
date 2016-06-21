'use strict';

angular
  .module('udb.management.labels')
  .directive('udbUniqueLabel', UniqueLabelDirective);

/** @ngInject */
function UniqueLabelDirective(LabelManager, $q) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, controller) {
      function isUnique(labelName) {
        if (controller.$isEmpty(labelName)) {
          return $q.when();
        }

        var deferredUniqueCheck = $q.defer();

        LabelManager
          .get(labelName)
          .then(deferredUniqueCheck.reject, deferredUniqueCheck.resolve);

        return deferredUniqueCheck.promise;
      }

      controller.$asyncValidators.uniqueLabel = isUnique;
    }
  };
}
