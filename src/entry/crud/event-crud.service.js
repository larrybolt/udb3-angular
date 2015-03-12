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
function EventCrud(jobLogger, udbApi, EventCrudJob) {

  /**
   * Creates a new event and add the job to the logger.
   *
   * @param {UdbEvent}  event
   * The event to be created
   */
  this.createEvent = function (event) {

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
   * Creates a new place.
   */
  this.createPlace = function(place) {

    return udbApi.createPlace(place);

  };

  /**
   * Creates a new organizer.
   */
  this.createOrganizer = function(organizer) {

    return udbApi.createOrganizer(organizer);

  };

  /**
   * Update the main language description and add it to the job logger.
   *
   * @param {EventFormData} item
   * @returns {EventCrud.updateTypicalAgeRange.jobPromise}
   */
  this.updateDescription = function(item) {

    var jobPromise = udbApi.translateProperty(item.id, item.getType(), 'description', udbApi.mainLanguage, item.description.nl);

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
  this.updateTypicalAgeRange = function(item) {

    var jobPromise = udbApi.updateProperty(item.id, item.getType(), 'typicalAgeRange', item.typicalAgeRange);

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
  this.updateOrganizer = function(item) {

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
  this.deleteOfferOrganizer = function(item) {

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
  this.updateContactPoint = function(item) {

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
  this.updateFacilities = function(item) {

    var jobPromise = udbApi.updateProperty(item.id, item.getType(), 'facilities', item.facilities);

    jobPromise.success(function (jobData) {
      var job = new EventCrudJob(jobData.commandId, item, 'updateFacilities');
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
  this.updateBookingInfo = function(item) {

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
   * @param File image
   * @param string description
   * @param string copyrightHolder
   * @returns {EventCrud.addImage.jobPromise}
   */
  this.addImage = function(item, image, description, copyrightHolder) {

    var jobPromise = udbApi.addImage(item.id, item.getType(), image, description, copyrightHolder);

    jobPromise.success(function (jobData) {
      var job = new EventCrudJob(jobData.commandId, item, 'addImage');
      jobLogger.addJob(job);
    });

    return jobPromise;

  };

  /**
   * Update an image of the item.
   *
   * @param {EventFormData} item
   * @param int indexToUpdate
   * @param File|null image
   * @param string description
   * @param string copyrightHolder
   * @returns {EventCrud.updateImage.jobPromise}
   */
  this.updateImage = function(item, indexToUpdate, image, description, copyrightHolder) {

    var jobPromise = udbApi.updateImage(item.id, item.getType(), indexToUpdate, image, description, copyrightHolder);

    jobPromise.success(function (jobData) {
      var job = new EventCrudJob(jobData.commandId, item, 'updateImage');
      jobLogger.addJob(job);
    });

    return jobPromise;

  };

  /**
   * Delete an image of the item.
   *
   * @param {EventFormData} item
   * @param int indexToDelete
   * @returns {EventCrud.deleteImage.jobPromise}
   */
  this.deleteImage = function(item, indexToDelete) {

    var jobPromise = udbApi.deleteImage(item.id, item.getType(), indexToDelete);

    jobPromise.success(function (jobData) {
      var job = new EventCrudJob(jobData.commandId, item, 'deleteImage');
      jobLogger.addJob(job);
    });

    return jobPromise;

  };

}
