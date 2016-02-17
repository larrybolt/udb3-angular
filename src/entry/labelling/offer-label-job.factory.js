'use strict';

/**
 * @ngdoc service
 * @name udb.entry.OfferLabelJob
 * @description
 * # Event Label Job
 * This Is the factory that creates an event label job
 */
angular
  .module('udb.entry')
  .factory('OfferLabelJob', OfferLabelJobFactory);

/* @ngInject */
function OfferLabelJobFactory(BaseJob, JobStates) {

  /**
   * @class OfferLabelJob
   * @constructor
   * @param {string} commandId
   * @param {UdbEvent|UdbPlace} offer
   * @param {string} label
   * @param {boolean} unlabel set to true when unlabeling
   */
  var OfferLabelJob = function (commandId, offer, label, unlabel) {
    BaseJob.call(this, commandId);
    this.offer = offer;
    this.label = label;
    this.unlabel = !!unlabel || false;
  };

  OfferLabelJob.prototype = Object.create(BaseJob.prototype);
  OfferLabelJob.prototype.constructor = OfferLabelJob;

  OfferLabelJob.prototype.getDescription = function () {
    var job = this,
        description;

    if (job.state === JobStates.FAILED) {
      description = 'Labelen van evenement mislukt';
    } else {
      if (job.unlabel) {
        description = 'Verwijder label "' + job.label + '" van "' + job.offer.name.nl + '"';
      } else {
        description = 'Label "' + job.offer.name.nl + '" met "' + job.label + '"';
      }
    }

    return description;
  };

  return (OfferLabelJob);
}
