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
   * @param {string} name
   * @param {boolean} isVisible
   * @param {boolean} isPrivate
   *
   * @return {Promise.<Label>}
   */
  service.create = function (name, isVisible, isPrivate) {
    udbApi
      .createLabel(name, isVisible, isPrivate)
      .then(logLabelJob);
  };

  /**
   *
   * @param {Label} label
   * @return {Promise.<Label>}
   */
  service.copy = function (label) {
    udbApi
      .createLabel(label.name, label.isVisible, label.isPrivate, label.id)
      .then(logLabelJob);
  };

  service.delete = function (label) {
    udbApi
      .deleteLabel(label.id)
      .then(logLabelJob);
  };

  service.makeInvisible = function (label) {
    udbApi
      .updateLabel(label.id, 'MakeInvisible')
      .then(logLabelJob);
  };
  service.makeVisible = function (label) {
    udbApi
      .updateLabel(label.id, 'MakeVisible')
      .then(logLabelJob);
  };
  service.makePrivate = function (label) {
    udbApi.updateLabel(label.id, 'MakePrivate');
  };
  service.makePublic = function (label) {
    udbApi
      .updateLabel(label.id, 'MakePublic')
      .then(logLabelJob);
  };

  function logLabelJob(commandInfo) {
    var job = new BaseJob(commandInfo.commandId);
    jobLogger.addJob(job);
  }
}
