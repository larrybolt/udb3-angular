'use strict';

/**
 * @ngdoc directive
 * @name udb.entry.directive:udbJob
 * @description
 * # udb search directive
 */
angular
  .module('udb.entry')
  .directive('udbJob', jobDirective);

/* @ngInject */
function jobDirective() {
  var job = {
    template: '<div ng-include="jobTemplateUrl"></div>',
    restrict: 'E',
    link: function(scope, element, attrs) {
      scope.jobTemplateUrl = 'templates/' + scope.job.getTemplateName() + '.template.html';

      // batch job info
      scope.taskCount = 0;
      scope.completedTaskCount = 0;

    }
  };

  return job;
}
