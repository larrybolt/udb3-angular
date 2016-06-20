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

        var def = $q.defer();

        function findDuplicate(similarLabels) {
          var duplicate = _.find(similarLabels.member, function (label) {
            return label.name.toUpperCase() === labelName.toUpperCase();
          });
          if (duplicate)  {
            def.reject(duplicate);
          } else {
            def.resolve();
          }
        }

        LabelManager
          .find(labelName, 10, 0)
          .then(findDuplicate, def.resolve);

        return def.promise;
      }

      controller.$asyncValidators.uniqueLabel = isUnique;
    }
  };
}
