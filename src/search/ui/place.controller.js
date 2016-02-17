'use strict';

/**
 * @ngdoc directive
 * @name udb.search.controller:PlaceController
 * @description
 * # EventController
 */
angular
  .module('udb.search')
  .controller('PlaceController', PlaceController);

/* @ngInject */
function PlaceController(
  udbApi,
  $scope,
  jsonLDLangFilter,
  EventTranslationState,
  placeTranslator
) {
  var controller = this;
  /* @type {UdbPlace} */
  var cachedPlace;

  var defaultLanguage = 'nl';
  controller.placeTranslation = false;
  controller.activeLanguage = defaultLanguage;
  controller.languageSelector = [
    {'lang': 'fr'},
    {'lang': 'en'},
    {'lang': 'de'}
  ];

  initController();

  function initController() {
    if (!$scope.event.title) {
      controller.fetching = true;
      var placePromise = udbApi.getPlaceByLDId($scope.event['@id']);

      placePromise.then(function (placeObject) {
        cachedPlace = placeObject;
        cachedPlace.updateTranslationState();

        $scope.event = jsonLDLangFilter(cachedPlace, defaultLanguage);
        controller.fetching = false;
      });
    } else {
      controller.fetching = false;
    }
  }

  controller.hasActiveTranslation = function () {
    return cachedPlace && cachedPlace.translationState[controller.activeLanguage] !== EventTranslationState.NONE;
  };

  controller.getLanguageTranslationIcon = function (lang) {
    var icon = EventTranslationState.NONE.icon;

    if (cachedPlace && lang) {
      icon = cachedPlace.translationState[lang].icon;
    }

    return icon;
  };

  controller.translate = function () {
    controller.applyPropertyChanges('name');
    controller.applyPropertyChanges('description');
  };

  /**
   * Sets the provided language as active or toggles it off when already active
   *
   * @param {String} lang
   */
  controller.toggleLanguage = function (lang) {
    if (lang === controller.activeLanguage) {
      controller.stopTranslating();
    } else {
      controller.activeLanguage = lang;
      controller.placeTranslation = jsonLDLangFilter(cachedPlace, controller.activeLanguage);
    }
  };

  controller.hasPropertyChanged = function (propertyName) {
    var lang = controller.activeLanguage,
        translation = controller.placeTranslation;

    return controller.placeTranslation && cachedPlace[propertyName][lang] !== translation[propertyName];
  };

  controller.undoPropertyChanges = function (propertyName) {
    var lang = controller.activeLanguage,
        translation = controller.placeTranslation;

    if (translation) {
      translation[propertyName] = cachedPlace[propertyName][lang];
    }
  };

  controller.applyPropertyChanges = function (propertyName) {
    var translation = controller.placeTranslation[propertyName],
        apiProperty;

    // TODO: this is hacky, should decide on consistent name for this property
    if (propertyName === 'name') {
      apiProperty = 'title';
    }

    translateEventProperty(propertyName, translation, apiProperty);
  };

  controller.stopTranslating = function () {
    controller.placeTranslation = undefined;
    controller.activeLanguage = defaultLanguage;
  };

  function translateEventProperty(property, translation, apiProperty) {
    var language = controller.activeLanguage,
        udbProperty = apiProperty || property;

    if (translation && translation !== cachedPlace[property][language]) {
      var translationPromise = placeTranslator.translateProperty(cachedPlace, udbProperty, language, translation);

      translationPromise.then(function () {
        cachedPlace.updateTranslationState();
      });
    }
  }
}
