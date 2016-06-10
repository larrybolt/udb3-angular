'use strict';

/**
 * @ngdoc service
 * @name udb.manage.labels
 * @description
 * # user
 * Service in the udb.manage.labels.
 */
angular
  .module('udb.manage.labels')
  .service('LabelService', LabelService);

/* @ngInject */
function LabelService(udbApi, jobLogger, BaseJob, $q) {
  var service = this;

  /**
   * @param {string} query
   * @param {int} limit
   * @param {int} start
   *
   * @return {Promise.<PagedCollection>}
   */
  service.find = function(query, limit, start) {
    return udbApi.findLabels(query, limit, start);
  };

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
      .then(createNewLabelJob);
  };

  /**
   * @param {Label} label
   * @return {Promise.<BaseJob>}
   */
  service.copy = function (label) {
    return udbApi
      .createLabel(label.name, label.isVisible, label.isPrivate, label.id)
      .then(createNewLabelJob);
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
   * @return {Promise.<BaseJob>}
   */
  function logLabelJob(commandInfo) {
    var job = new BaseJob(commandInfo.commandId);
    jobLogger.addJob(job);

    return $q.resolve(job);
  }

  /**
   * @param {Object} commandInfo
   * @return {Promise.<BaseJob>}
   */
  function createNewLabelJob(commandInfo) {
    var job = new BaseJob(commandInfo.commandId);
    job.labelId = commandInfo.labelId;
    jobLogger.addJob(job);

    return $q.resolve(job);
  }
}
