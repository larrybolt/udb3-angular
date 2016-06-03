'use strict';

/**
 * @typedef {Object} Label
 * @property {string}   id
 * @property {string}   name
 * @property {boolean}  isVisible
 * @property {boolean}  isPrivate
 */

/**
 * @ngdoc function
 * @name udb.management.service:LabelManager
 * @description
 * # LabelManager
 * Service to manage labels.
 */
angular
  .module('udb.management')
  .service('LabelManager', LabelManager);

/** @ngInject */
function LabelManager(udbApi, jobLogger, BaseJob) {
  var service = this;

  /**
   * @param {uuid} labelId
   * @return {Promise.<Label>}
   */
  service.get = function(labelId) {
    return udbApi.getLabelById(labelId);
  };

  /**
   * @param {string} name
   * @param {boolean} isVisible
   * @param {boolean} isPrivate
   *
   * @return {Promise.<BaseJob>}
   */
  service.create = function (name, isVisible, isPrivate) {
    return udbApi
      .createLabel(name, isVisible, isPrivate)
      .then(logLabelJob);
  };

  /**
   * @param {Label} label
   * @return {Promise.<BaseJob>}
   */
  service.copy = function (label) {
    function logCopyLabelJob(commandInfo) {
      var job = new BaseJob(commandInfo.commandId);
      job.labelId = commandInfo.labelId;
      jobLogger.addJob(job);

      return job;
    }

    return udbApi
      .createLabel(label.name, label.isVisible, label.isPrivate, label.id)
      .then(logCopyLabelJob);
  };

  /**
   * @param {Label} label
   * @return {Promise.<BaseJob>}
   */
  service.delete = function (label) {
    return udbApi
      .deleteLabel(label.id)
      .then(logLabelJob);
  };

  /**
   * @param {Label} label
   * @return {Promise.<BaseJob>}
   */
  service.makeInvisible = function (label) {
    return udbApi
      .updateLabel(label.id, 'MakeInvisible')
      .then(logLabelJob);
  };

  /**
   * @param {Label} label
   * @return {Promise.<BaseJob>}
   */
  service.makeVisible = function (label) {
    return udbApi
      .updateLabel(label.id, 'MakeVisible')
      .then(logLabelJob);
  };

  /**
   *
   * @param {Label} label
   * @return {Promise.<BaseJob>}
   */
  service.makePrivate = function (label) {
    return udbApi
      .updateLabel(label.id, 'MakePrivate')
      .then(logLabelJob);
  };

  /**
   * @param {Label} label
   * @return {Promise.<BaseJob>}
   */
  service.makePublic = function (label) {
    return udbApi
      .updateLabel(label.id, 'MakePublic')
      .then(logLabelJob);
  };

  /**
   * @param {Object} commandInfo
   * @return {BaseJob}
   */
  function logLabelJob(commandInfo) {
    var job = new BaseJob(commandInfo.commandId);
    jobLogger.addJob(job);

    return job;
  }
}
