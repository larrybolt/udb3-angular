'use strict';

/**
 * @ngdoc service
 * @name udb.entry.placeTranslator
 * @description
 * # placeTranslator
 * Service in the udb.entry.
 */
angular
  .module('udb.entry')
  .service('placeTranslator', PlaceTranslator);

/* @ngInject */
function PlaceTranslator(jobLogger, udbApi, PlaceTranslationJob) {

  /**
   * Translates an place property to a given language and adds the job to the logger
   *
   * @param {UdbPlace}  place        The place that needs translating
   * @param {string}    property     The name of the property to translate
   * @param {string}    language     The abbreviation of the translation language
   * @param {string}    translation  Translation to save
   */
  this.translateProperty = function (place, property, language, translation) {
    var jobPromise = udbApi.translateProperty(place.id, 'place', property, language, translation);

    jobPromise.success(function (jobData) {
      // TODO get rid of this hack;
      if (property === 'title') {
        property = 'name';
      }
      place[property][language] = translation;
      var job = new PlaceTranslationJob(jobData.commandId, place, property, language, translation);
      jobLogger.addJob(job);
    });

    return jobPromise;
  };
}
