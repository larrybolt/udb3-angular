'use strict';

/**
 * @ngdoc service
 * @name udb.entry.EventLabelJob
 * @description
 * # Event Label Job
 * This Is the factory that creates an event label job
 */
angular
  .module('udb.entry')
  .factory('EventLabelJob', EventLabelJobFactory);

/* @ngInject */
function EventLabelJobFactory(BaseJob, JobStates) {

  /**
   * @class EventLabelJob
   * @constructor
   * @param {string} commandId
   * @param {UdbEvent|UdbPlace} offer
   * @param {string} label
   * @param {boolean} unlabel set to true when unlabeling
   */
  var EventLabelJob = function (commandId, offer, label, unlabel) {
    BaseJob.call(this, commandId);
    this.offer = offer;
    this.label = label;
    this.unlabel = !!unlabel || false;
  };

  EventLabelJob.prototype = Object.create(BaseJob.prototype);
  EventLabelJob.prototype.constructor = EventLabelJob;

  EventLabelJob.prototype.getDescription = function () {
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

  return (EventLabelJob);
}
