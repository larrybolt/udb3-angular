'use strict';

/**
 * @ngdoc service
 * @name udb.entry.PlaceTranslationJob
 * @description
 * # Place Translation Job
 * This Is the factory that creates an place translation job
 */
angular
  .module('udb.entry')
  .factory('PlaceTranslationJob', PlaceTranslationJobFactory);

/* @ngInject */
function PlaceTranslationJobFactory(BaseJob, JobStates) {

  /**
   * @class PlaceTranslationJob
   * @constructor
   * @param {string} commandId
   * @param {UdbPlace} place
   * @param {string} property
   * @param {string} language
   * @param {string} translation
   */
  var PlaceTranslationJob = function (commandId, place, property, language, translation) {
    BaseJob.call(this, commandId);
    this.place = place;
    this.property = property;
    this.language = language;
    this.translation = translation;
  };

  PlaceTranslationJob.prototype = Object.create(BaseJob.prototype);
  PlaceTranslationJob.prototype.constructor = PlaceTranslationJob;

  PlaceTranslationJob.prototype.getDescription = function () {
    var job = this,
        description;

    if (this.state === JobStates.FAILED) {
      description = 'Vertalen van evenement mislukt';
    } else {
      var propertyName;

      switch (job.property) {
        case 'name':
          propertyName = 'titel';
          break;
        case 'description':
          propertyName = 'omschrijving';
          break;
        default:
          propertyName = job.property;
      }

      description = 'Vertaal ' + propertyName + ' van "' + job.place.name.nl + '"';
    }

    return description;
  };

  return (PlaceTranslationJob);
}
