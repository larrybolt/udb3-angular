'use strict';

/**
 * @typedef {Object} MediaObject
 * @property {string}   @id
 * @property {string}   @type
 * @property {string}   contentUrl
 * @property {string}   thumbnailUrl
 * @property {string}   description
 * @property {string}   copyrightHolder
 */

/**
 * @ngdoc function
 * @name udb.media.service:MediaManager
 * @description
 * # MediaManager
 * Service to manage media.
 */
angular
  .module('udb.media')
  .service('MediaManager', MediaManager);

/**
 * @ngInject
 */
function MediaManager(jobLogger, appConfig, Upload, CreateImageJob, $q, $http) {
  var service = this;
  var baseUrl = appConfig.baseUrl;

  /**
   * @param {File} imageFile
   * @param {string} description
   * @param {string} copyrightHolder
   *
   * @return {Promise.<MediaObject>}
   */
  service.createImage = function(imageFile, description, copyrightHolder) {
    var deferredMediaObject = $q.defer();
    var uploadOptions = {
      withCredentials: true,
      url: baseUrl + 'images',
      fields: {
        description: description,
        copyrightHolder: copyrightHolder
      },
      file: imageFile
    };

    function logCreateImageJob(uploadResponse) {
      var jobData = uploadResponse.data;
      var job = new CreateImageJob(jobData  .commandId);
      jobLogger.addJob(job);

      job.task.promise
        .then(fetchAndReturnMedia);
    }

    function fetchAndReturnMedia(jobInfo) {
      var imageId = _.get(jobInfo, 'file_id');
      service
        .getImage(imageId)
        .then(deferredMediaObject.resolve, deferredMediaObject.reject);
    }

    Upload
      .upload(uploadOptions)
      .then(logCreateImageJob, deferredMediaObject.reject);

    return deferredMediaObject.promise;
  };

  /**
   * @param {string} imageId
   *
   * @return {Promise.<MediaObject>}
   */
  service.getImage = function (imageId) {
    var requestConfig = {
      headers: {
        'Accept': 'application/ld+json'
      }
    };

    function returnMediaObject(response) {
      var mediaObject = response.data;
      mediaObject.id = imageId;

      return $q.resolve(mediaObject);
    }

    return $http
      .get(
        baseUrl + 'media/' + imageId,
        requestConfig
      )
      .then(returnMediaObject);
  };
}
