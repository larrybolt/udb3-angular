'use strict';

angular
  .module('udb.management')
  .directive('udbFormGroup', FormGroupDirective);

function FormGroupDirective() {
  return {
    restrict: 'A',
    require: '^form',
    link: function (scope, element, attributes, formController) {
      var inputElement = element[0].querySelector('[name]');
      var field = angular.element(inputElement);
      var fieldName = field.attr('name');

      field.bind('blur', function () {
        var isInvalid = formController[fieldName].$invalid;
        element
          .toggleClass('has-error', isInvalid)
          .toggleClass('has-success', !isInvalid);
      });
    }
  };
}
