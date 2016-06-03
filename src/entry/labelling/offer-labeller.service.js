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
function OfferLabeller(jobLogger, udbApi, OfferLabelJob, OfferLabelBatchJob, QueryLabelJob, $q, LabelManager) {

  var offerLabeller = this;

  // keep a cache of all the recently used labels
  offerLabeller.recentLabels = ['some', 'recent', 'label'];

  function updateRecentLabels() {
    udbApi
      .getRecentLabels()
      .then(function (labels) {
        offerLabeller.recentLabels = labels;
      });
  }

  // warm up the cache
  updateRecentLabels();

  /**
   * A helper function to create and log jobs
   *
   * This partial function takes a constructor for a specific job type and passes on the arguments.
   *
   * @param {BaseJob} jobType
   *  A job type that's based on BaseJob.
   */
  function jobCreatorFactory(jobType) {
    var args =  Array.prototype.slice.call(arguments);
    var info = args.shift(); // contains a function with argument info etc.

    function jobCreator(response) {
      args.unshift(response.data.commandId);
      args.unshift(info); // needs to be the first element
      var job = new (Function.prototype.bind.apply(jobType, args))();

      jobLogger.addJob(job);

      return $q.resolve(job);
    }

    return jobCreator;
  }

  /**
   * Label an event with a label
   * @param {UdbEvent|UdbPlace} offer
   * @param {string} labelName
   */
  this.label = function (offer, labelName) {
    offer.label(labelName);

    function addLabel() {
      return udbApi
        .labelOffer(offer.apiUrl, labelName)
        .then(jobCreatorFactory(OfferLabelJob, offer, labelName));
    }

    return touchLabel(labelName).then(addLabel);
  };

  /**
   * Unlabel a label from an event
   * @param {UdbEvent|UdbPlace} offer
   * @param {string} labelName
   */
  this.unlabel = function (offer, labelName) {
    offer.unlabel(labelName);

    return udbApi
      .unlabelOffer(offer.apiUrl, labelName)
      .then(jobCreatorFactory(OfferLabelJob, offer, labelName, true));
  };

  /**
   * @param {OfferIdentifier[]} offers
   * @param {string} labelName
   */
  this.labelOffersById = function (offers, labelName) {

    function addLabel() {
      return udbApi
        .labelOffers(offers, labelName)
        .then(jobCreatorFactory(OfferLabelBatchJob, offers, labelName));
    }

    return touchLabel(labelName).then(addLabel);
  };

  /**
   *
   * @param {string} query
   * @param {string} labelName
   * @param {Number} eventCount
   */
  this.labelQuery = function (query, labelName, eventCount) {
    eventCount = eventCount || 0;

    function addLabel () {
      return udbApi
        .labelQuery(query, labelName)
        .then(jobCreatorFactory(QueryLabelJob, eventCount, labelName));
    }

    return touchLabel(labelName).then(addLabel);
  };

  /**
   * Make sure a label is created for management.
   *
   * @param {string} labelName
   * @return {Promise}
   */
  function touchLabel(labelName) {
    var touched = $q.defer();

    LabelManager
      .create(labelName, true, false)
      .finally(function () {
        touched.resolve('touché');
      });

    return touched.promise;
  }
}
