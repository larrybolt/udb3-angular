'use strict';

/**
 * @ngdoc service
 * @name udb.entry.OfferLabelBatchJob
 * @description
 * # BaseJob
 * This Is the factory that creates an event export job
 */
angular
  .module('udb.entry')
  .factory('OfferLabelBatchJob', OfferLabelBatchJobFactory);

/* @ngInject */
function OfferLabelBatchJobFactory(BaseJob, JobStates) {

  /**
   * @class OfferLabelBatchJob
   * @constructor
   * @param {string} commandId
   * @param {string[]} offers
   * @param {string} label
   */
  var OfferLabelBatchJob = function (commandId, offers, label) {
    BaseJob.call(this, commandId);
    this.events = offers;
    this.addEventsAsTask(offers);
    this.label = label;
  };

  OfferLabelBatchJob.prototype = Object.create(BaseJob.prototype);
  OfferLabelBatchJob.prototype.constructor = OfferLabelBatchJob;

  OfferLabelBatchJob.prototype.addEventsAsTask = function (offers) {
    var job = this;
    _.forEach(offers, function (offer) {
      job.addTask({id: offer});
    });
  };

  OfferLabelBatchJob.prototype.getDescription = function () {
    var job = this,
        description;

    if (this.state === JobStates.FAILED) {
      description = 'Labelen van evenementen mislukt';
    } else {
      description = 'Label ' + job.events.length + ' items met "' + job.label + '"';
    }

    return description;
  };

  return (OfferLabelBatchJob);
}
