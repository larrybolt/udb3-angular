'use strict';

/**
 * @ngdoc service
 * @name udb.entry.DeleteOfferJob
 * @description
 * This is the factory that creates jobs to delete events and places.
 */
angular
  .module('udb.entry')
  .factory('DeleteOfferJob', DeleteOfferJobFactory);

/* @ngInject */
function DeleteOfferJobFactory(BaseJob, $q, JobStates) {

  /**
   * @class DeleteOfferJob
   * @constructor
   * @param {string} commandId
   * @param {UdbEvent|UdbPlace} item
   */
  var DeleteOfferJob = function (commandId, item) {
    BaseJob.call(this, commandId);

    this.item = item;
    this.task = $q.defer();
  };

  DeleteOfferJob.prototype = Object.create(BaseJob.prototype);
  DeleteOfferJob.prototype.constructor = DeleteOfferJob;

  DeleteOfferJob.prototype.finish = function () {
    BaseJob.prototype.finish.call(this);

    if (this.state !== JobStates.FAILED) {
      this.task.resolve();
    }
  };

  DeleteOfferJob.prototype.fail = function () {
    BaseJob.prototype.fail.call(this);

    this.task.reject();
  };

  DeleteOfferJob.prototype.getDescription = function() {
    return 'Item verwijderen: "' +  this.item.name + '".';
  };

  return (DeleteOfferJob);
}
