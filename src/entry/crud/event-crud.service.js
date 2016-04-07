'use strict';

/**
 * @ngdoc service
 * @name udb.entry.eventCrud
 * @description
 * Service for creating / updating events.
 */
angular
  .module('udb.entry')
  .service('eventCrud', EventCrud);

/* @ngInject */
function EventCrud(
  jobLogger,
  udbApi,
  EventCrudJob,
  DeleteOfferJob,
  $rootScope ,
  $q
) {

  var service = this;

  /**
   * Creates a new event and add the job to the logger.
   *
   * @param {UdbEvent}  event
   * The event to be created
   */
  service.createEvent = function (event) {

    var jobPromise = null;

    if (event.isEvent) {
      jobPromise = udbApi.createEvent(event);
    }
    else {
      jobPromise = udbApi.createPlace(event);
    }

    return jobPromise;
  };

  /**
   * Find all the events that take place here.
   *
   * @param {UdbPlace} place
   *   Place Id to find events for
   */
  service.findEventsAtPlace = function(place) {
    var jobPromise = udbApi.findEventsAtPlace(place);
    return jobPromise;
  };

  /**
   * Creates a new place.
   */
  service.createPlace = function(place) {
    return udbApi.createPlace(place);
  };

  /**
   * Delete an offer.
   *
   * @param {UdbPlace|UdbEvent} offer
   *
   * @return {Promise.<EventCrudJob>}
   */
  service.deleteOffer = function (offer) {
    var deferredJob = $q.defer();

    function logAndResolveJob(jobData) {
      var job = new DeleteOfferJob(jobData.commandId, offer);
      offer.showDeleted = true;
      jobLogger.addJob(job);
      deferredJob.resolve(job);
    }

    udbApi
      .deleteOffer(offer)
      .success(logAndResolveJob)
      .error(deferredJob.reject);

    return deferredJob.promise;
  };

  /**
   * Update the major info of an event / place.
   * @param {EventFormData} eventFormData
   */
  service.updateMajorInfo = function(eventFormData) {

    var jobPromise;
    if (eventFormData.isEvent) {
      jobPromise = udbApi.updateMajorInfo(eventFormData.id, eventFormData.getType(), eventFormData);
    }
    else {
      jobPromise = udbApi.updateMajorInfo(eventFormData.id, eventFormData.getType(), eventFormData);
    }

    jobPromise.success(function (jobData) {
      var job = new EventCrudJob(jobData.commandId, eventFormData, 'updateItem');
      addJobAndInvalidateCache(jobLogger, job);
    });

    return jobPromise;

  };

  /**
   * Creates a new organizer.
   */
  service.createOrganizer = function(organizer) {

    return udbApi.createOrganizer(organizer);

  };

  /**
   * Update the main language description and add it to the job logger.
   *
   * @param {EventFormData} item
   * @returns {EventCrud.updateDescription.jobPromise}
   */
  service.updateDescription = function(item) {

    var jobPromise = udbApi.translateProperty(
      item.id,
      item.getType(),
      'description',
      udbApi.mainLanguage,
      item.description.nl
    );

    jobPromise.success(function (jobData) {
      var job = new EventCrudJob(jobData.commandId, item, 'updateDescription');
      addJobAndInvalidateCache(jobLogger, job);
    });

    return jobPromise;

  };

  /**
   * Update the typical age range and add it to the job logger.
   *
   * @param {EventFormData} item
   * @returns {EventCrud.updateTypicalAgeRange.jobPromise}
   */
  service.updateTypicalAgeRange = function(item) {

    var jobPromise = udbApi.updateProperty(item.id, item.getType(), 'typicalAgeRange', item.typicalAgeRange);

    jobPromise.success(function (jobData) {
      var job = new EventCrudJob(jobData.commandId, item, 'updateTypicalAgeRange');
      addJobAndInvalidateCache(jobLogger, job);
    });

    return jobPromise;

  };

  /**
   * Update the typical age range and add it to the job logger.
   *
   * @param {EventFormData} item
   * @returns {EventCrud.deleteTypicalAgeRange.jobPromise}
   */
  service.deleteTypicalAgeRange = function(item) {

    var jobPromise = udbApi.deleteTypicalAgeRange(item.id, item.getType());

    jobPromise.success(function (jobData) {
      var job = new EventCrudJob(jobData.commandId, item, 'updateTypicalAgeRange');
      addJobAndInvalidateCache(jobLogger, job);
    });

    return jobPromise;

  };

  /**
   * Update the connected organizer and it to the job logger.
   *
   * @param {EventFormData} item
   * @returns {EventCrud.updateOrganizer.jobPromise}
   */
  service.updateOrganizer = function(item) {

    var jobPromise = udbApi.updateProperty(item.id, item.getType(), 'organizer', item.organizer.id);

    jobPromise.success(function (jobData) {
      var job = new EventCrudJob(jobData.commandId, item, 'updateOrganizer');
      addJobAndInvalidateCache(jobLogger, job);
    });

    return jobPromise;

  };

  /**
   * Delete the organizer for the event / place.
   *
   * @param {EventFormData} item
   * @returns {EventCrud.updateOrganizer.jobPromise}
   */
  service.deleteOfferOrganizer = function(item) {

    var jobPromise = udbApi.deleteOfferOrganizer(item.id, item.getType(), item.organizer.id);

    jobPromise.success(function (jobData) {
      var job = new EventCrudJob(jobData.commandId, item, 'deleteOrganizer');
      addJobAndInvalidateCache(jobLogger, job);
    });

    return jobPromise;

  };

  /**
   * Update the contact point and add it to the job logger.
   *
   * @param {EventFormData} item
   * @returns {EventCrud.updateContactPoint.jobPromise}
   */
  service.updateContactPoint = function(item) {

    var jobPromise = udbApi.updateProperty(item.id, item.getType(), 'contactPoint', item.contactPoint);

    jobPromise.success(function (jobData) {
      var job = new EventCrudJob(jobData.commandId, item, 'updateContactInfo');
      addJobAndInvalidateCache(jobLogger, job);
    });

    return jobPromise;

  };

  /**
   * Update the facilities and add it to the job logger.
   *
   * @param {EventFormData} item
   * @returns {EventCrud.updateFacilities.jobPromise}
   */
  service.updateFacilities = function(item) {

    var jobPromise = udbApi.updateProperty(item.id, item.getType(), 'facilities', item.facilities);

    jobPromise.success(function (jobData) {
      var job = new EventCrudJob(jobData.commandId, item, 'updateFacilities');
      addJobAndInvalidateCache(jobLogger, job);
    });

    return jobPromise;
  };

  /**
   * Update the booking info and add it to the job logger.
   *
   * @param {UdbEvent|UdbPlace} item
   * @param {string} type
   *  Type of item
   * @returns {EventCrud.updateBookingInfo.jobPromise}
   */
  service.updateBookingInfo = function(item) {

    var jobPromise = udbApi.updateProperty(item.id, item.getType(), 'bookingInfo', item.bookingInfo);

    jobPromise.success(function (jobData) {
      var job = new EventCrudJob(jobData.commandId, item, 'updateBookingInfo');
      addJobAndInvalidateCache(jobLogger, job);
    });

    return jobPromise;

  };

  /**
   * Add a new image to the item.
   *
   * @param {EventFormData} item
   * @param {MediaObject} image
   * @returns {EventCrud.addImage.jobPromise}
   */
  service.addImage = function(item, image) {
    var imageId = image.id || image['@id'].split('/').pop();

    function logJob(jobData) {
      var job = new EventCrudJob(jobData.commandId, item, 'addImage');
      addJobAndInvalidateCache(jobLogger, job);

      return $q.resolve(job);
    }

    return udbApi
      .addImage(item.id, item.getType(), imageId)
      .then(logJob);
  };

  /**
   * Update an image of the item.
   *
   * @param {EventFormData} item
   * @param {MediaObject} image
   * @param {string} description
   * @param {string} copyrightHolder
   * @returns {EventCrud.updateImage.jobPromise}
   */
  service.updateImage = function(item, image, description, copyrightHolder) {
    var imageId = image['@id'].split('/').pop();

    function logJob(jobData) {
      var job = new EventCrudJob(jobData.commandId, item, 'updateImage');
      addJobAndInvalidateCache(jobLogger, job);

      return $q.resolve(job);
    }

    return udbApi
      .updateImage(item.id, item.getType(), imageId, description, copyrightHolder)
      .then(logJob);
  };

  /**
   * Remove an image from an item.
   *
   * @param {EventFormData} item
   * @param {image} image
   * @returns {Promise.<EventCrudJob>}
   */
  service.removeImage = function(item, image) {
    var imageId = image['@id'].split('/').pop();

    function logJob(jobData) {
      var job = new EventCrudJob(jobData.commandId, item, 'removeImage');
      addJobAndInvalidateCache(jobLogger, job);

      return $q.resolve(job);
    }

    return udbApi
      .removeImage(item.id, item.getType(), imageId)
      .then(logJob);
  };

  service.selectMainImage = function (item, image) {
    var imageId = image['@id'].split('/').pop();

    function logJob(jobData) {
      var job = new EventCrudJob(jobData.commandId, item, 'selectMainImage');
      addJobAndInvalidateCache(jobLogger, job);

      return $q.resolve(job);
    }

    return udbApi
      .selectMainImage(item.id, item.getType(), imageId)
      .then(logJob);
  };

  /**
   * @param {Object} event
   * @param {EventFormData} eventFormData
   */
  function updateMajorInfo(event, eventFormData) {
    service.updateMajorInfo(eventFormData);
  }

  /**
   * @param {JobLogger} jobLogger
   * @param {EventCrudJob} job
     */
  function addJobAndInvalidateCache(jobLogger, job) {
    jobLogger.addJob(job);

    // unvalidate cache on success
    job.task.promise.then(function (itemId) {
      udbApi.removeItemFromCache(itemId);
    }, function() {});
  }

  $rootScope.$on('eventTypeChanged', updateMajorInfo);
  $rootScope.$on('eventThemeChanged', updateMajorInfo);
  $rootScope.$on('eventTimingChanged', updateMajorInfo);
  $rootScope.$on('eventTitleChanged', updateMajorInfo);
}
