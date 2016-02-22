'use strict';

/**
 * @ngdoc service
 * @name udb.entry.VariationCreationJob
 * @description
 * # Variation Creation Job
 * This Is the factory that creates a variation creation job
 */
angular
  .module('udb.entry')
  .factory('VariationCreationJob', VariationCreationJobFactory);

/* @ngInject */
function VariationCreationJobFactory(BaseJob, JobStates, $q) {

  /**
   * @class VariationCreationJob
   * @constructor
   * @param {string} commandId
   * @param {string} offerId
   */
  var VariationCreationJob = function (commandId, offerId) {
    BaseJob.call(this, commandId);
    this.task = $q.defer();
    this.offerId = offerId;
  };

  VariationCreationJob.prototype = Object.create(BaseJob.prototype);
  VariationCreationJob.prototype.constructor = VariationCreationJob;

  VariationCreationJob.prototype.finish = function () {
    if (this.state !== JobStates.FAILED) {
      this.state = JobStates.FINISHED;
      this.finished = new Date();
    }
    this.progress = 100;
  };

  VariationCreationJob.prototype.info = function (jobInfo) {
    this.task.resolve(jobInfo);
  };

  VariationCreationJob.prototype.fail = function () {
    this.finished = new Date();
    this.state = JobStates.FAILED;
    this.progress = 100;
    this.task.reject('Failed to create a variation for offer with id: ' + this.offerId);
  };

  return (VariationCreationJob);
}
