'use strict';

angular
  .module('udb.event-form')
  .directive('udbHttpPrefix', HttpPrefixDirective);

function HttpPrefixDirective() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, controller) {
      function ensureHttpPrefix(value) {
        // Need to add prefix if we don't have http:// prefix already AND we don't have part of it
        if (value && !/^(https?):\/\//i.test(value) && !isPrefixed(value)) {
          controller.$setViewValue('http://' + value);
          controller.$render();
          return 'http://' + value;
        }
        else {
          return value;
        }
      }

      function isPrefixed(value) {
        return 'http://'.indexOf(value) === 0 || 'https://'.indexOf(value) === 0;
      }

      controller.$formatters.push(ensureHttpPrefix);
      controller.$parsers.splice(0, 0, ensureHttpPrefix);
    }
  };
}
