'use strict';

/**
 * @ngdoc component
 * @name udb.entry.component:udbJobLog
 * @description
 * # udbJobLog
 */
angular
  .module('udb.entry')
  .component('udbJobLog', {
    controller: JobLogController,
    controllerAs: 'logger',
    templateUrl: 'templates/job-log.component.html'
  });

/* @ngInject */
function JobLogController(jobLogger, $scope) {
  var controller = this;

  controller.getQueuedJobs = jobLogger.getQueuedJobs;
  controller.getFinishedExportJobs = jobLogger.getFinishedExportJobs;
  controller.getFailedJobs = jobLogger.getFailedJobs;
  controller.hideJobLog = jobLogger.toggleJobLog;
  controller.isVisible = jobLogger.isVisible;

  $scope.hideJob = jobLogger.hideJob;
}
