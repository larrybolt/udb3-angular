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
function EventCrud(jobLogger, udbApi, EventCrudJob, $rootScope , $q) {

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
   * Remove an event.
   */
  service.removeEvent = function (item) {
    var jobPromise = udbApi.removeEvent(item.id);
    jobPromise.success(function (jobData) {
      var job = new EventCrudJob(jobData.commandId, item, 'removeEvent');
      jobLogger.addJob(job);
    });
    return jobPromise;
  };

  /**
   * Finds events for given location/place id.
   *
   * @param {int} id
   *   Place Id to find events for
   */
  service.findEventsForLocation = function(id) {
    var jobPromise = udbApi.findEventsForLocation(id);
    return jobPromise;
  };

  /**
   * Creates a new place.
   */
  service.createPlace = function(place) {
    return udbApi.createPlace(place);
  };

  /**
   * Remove a place.
   */
  this.removePlace = function (item) {
    var jobPromise = udbApi.removePlace(item.id);
    jobPromise.success(function (jobData) {
      var job = new EventCrudJob(jobData.commandId, item, 'removePlace');
      jobLogger.addJob(job);
    });
    return jobPromise;
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
      jobLogger.addJob(job);
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
      jobLogger.addJob(job);
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
      jobLogger.addJob(job);
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
      jobLogger.addJob(job);
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
      jobLogger.addJob(job);
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
      jobLogger.addJob(job);
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
      jobLogger.addJob(job);
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
      jobLogger.addJob(job);
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
      jobLogger.addJob(job);
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
      jobLogger.addJob(job);
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
      jobLogger.addJob(job);
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
      jobLogger.addJob(job);
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
      jobLogger.addJob(job);
      return $q.resolve(job);
    }

    return udbApi
      .removeImage(item.id, item.getType(), imageId)
      .then(logJob);
  };

  /**
   * @param {Object} event
   * @param {EventFormData} eventFormData
   */
  function updateMajorInfo(event, eventFormData) {
    service.updateMajorInfo(eventFormData);
  }

  $rootScope.$on('eventTypeChanged', updateMajorInfo);
  $rootScope.$on('eventThemeChanged', updateMajorInfo);
  $rootScope.$on('eventTimingChanged', updateMajorInfo);
  $rootScope.$on('eventTitleChanged', updateMajorInfo);
}
