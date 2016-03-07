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
function OfferLabeller(jobLogger, udbApi, OfferLabelJob, OfferLabelBatchJob, QueryLabelJob) {

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
   * @param {UdbEvent|UdbPlace} offer
   * @param {string} label
   */
  this.label = function (offer, label) {
    var jobPromise = udbApi.labelOffer(offer, label);

    jobPromise.success(function (jobData) {
      offer.label(label);
      var job = new OfferLabelJob(jobData.commandId, offer, label);
      jobLogger.addJob(job);
    });
  };

  /**
   * Unlabel a label from an event
   * @param {UdbEvent|UdbPlace} offer
   * @param {string} label
   */
  this.unlabel = function (offer, label) {
    var jobPromise = udbApi.unlabelOffer(offer, label);

    jobPromise.success(function (jobData) {
      offer.unlabel(label);
      var job = new OfferLabelJob(jobData.commandId, offer, label, true);
      jobLogger.addJob(job);
    });
  };

  /**
   * @param {string[]} offers
   * @param {string} label
   */
  this.labelOffersById = function (offers, label) {
    var jobPromise = udbApi.labelOffers(offers, label);

    jobPromise.success(function (jobData) {
      var job = new OfferLabelBatchJob(jobData.commandId, offers, label);
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
