'use strict';

/**
 * @ngdoc service
 * @name udb.entry.evenLabeller
 * @description
 * # offerLabeller
 * Service in the udb.entry.
 */
angular
  .module('udb.entry')
  .service('offerLabeller', OfferLabeller);

/* @ngInject */
function OfferLabeller(jobLogger, udbApi, OfferLabelJob, EventLabelBatchJob, QueryLabelJob) {

  var offerLabeller = this;

  // keep a cache of all the recently used labels
  offerLabeller.recentLabels = ['some', 'recent', 'label'];

  function updateRecentLabels() {
    var labelPromise = udbApi.getRecentLabels();

    labelPromise.then(function (labels) {
      offerLabeller.recentLabels = labels;
    });
  }

  // warm up the cache
  updateRecentLabels();

  /**
   * Label an event with a label
   * @param {UdbEvent} event
   * @param {string} label
   */
  this.label = function (event, label) {
    var jobPromise = udbApi.labelEvent(event.id, label);

    jobPromise.success(function (jobData) {
      event.label(label);
      var job = new OfferLabelJob(jobData.commandId, event, label);
      jobLogger.addJob(job);
    });
  };

  /**
   * Unlabel a label from an event
   * @param {UdbEvent} event
   * @param {string} label
   */
  this.unlabel = function (event, label) {
    var jobPromise = udbApi.unlabelEvent(event.id, label);

    jobPromise.success(function (jobData) {
      event.unlabel(label);
      var job = new OfferLabelJob(jobData.commandId, event, label, true);
      jobLogger.addJob(job);
    });
  };

  /**
   * Label a place with a label
   * @param {UdbPlace} place
   * @param {string} label
   */
  this.labelPlace = function (place, label) {
    var jobPromise = udbApi.labelPlace(place.id, label);

    jobPromise.success(function (jobData) {
      place.label(label);
      var job = new OfferLabelJob(jobData.commandId, place, label);
      jobLogger.addJob(job);
    });
  };

  /**
   * Remove a label from a place
   * @param {UdbPlace} place
   * @param {string} label
   */
  this.unlabelPlace = function (place, label) {
    var jobPromise = udbApi.unlabelPlace(place.id, label);

    jobPromise.success(function (jobData) {
      place.unlabel(label);
      var job = new OfferLabelJob(jobData.commandId, place, label, true);
      jobLogger.addJob(job);
    });
  };

  /**
   * @param {string[]} eventIds
   * @param {string} label
   */
  this.labelEventsById = function (eventIds, label) {
    var jobPromise = udbApi.labelEvents(eventIds, label);

    jobPromise.success(function (jobData) {
      var job = new EventLabelBatchJob(jobData.commandId, eventIds, label);
      console.log(job);
      jobLogger.addJob(job);
    });
  };

  /**
   *
   * @param {string} query
   * @param {string} label
   */
  this.labelQuery = function (query, label, eventCount) {
    var jobPromise = udbApi.labelQuery(query, label);
    eventCount = eventCount || 0;

    jobPromise.success(function (jobData) {
      var job = new QueryLabelJob(jobData.commandId, eventCount, label);
      jobLogger.addJob(job);
    });

  };
}
