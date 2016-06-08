'use strict';

/**
 * @ngdoc directive
 * @name udb.search.controller:OfferController
 * @description
 * # EventController
 */
angular
  .module('udb.search')
  .controller('OfferController', OfferController);

/* @ngInject */
function OfferController(
  udbApi,
  $scope,
  jsonLDLangFilter,
  EventTranslationState,
  offerTranslator,
  offerLabeller,
  $window
) {
  var controller = this;
  /* @type {UdbEvent|UdbPlace} */
  var cachedOffer;

  var defaultLanguage = 'nl';
  controller.translation = false;
  controller.activeLanguage = defaultLanguage;
  controller.languageSelector = [
    {'lang': 'fr'},
    {'lang': 'en'},
    {'lang': 'de'}
  ];

  controller.initialized = initController();

  function initController() {
    if (!$scope.event.title) {
      controller.fetching = true;

      return udbApi
        .getOffer($scope.event['@id'])
        .then(function (offerObject) {
          cachedOffer = offerObject;
          cachedOffer.updateTranslationState();

          $scope.event = jsonLDLangFilter(cachedOffer, defaultLanguage);
          controller.fetching = false;

          watchLabels();
          return cachedOffer;
        });
    } else {
      controller.fetching = false;
    }

    function watchLabels() {
      $scope.$watch(function () {
        return cachedOffer.labels;
      }, function (labels) {
        $scope.event.labels = angular.copy(labels);
      });
    }
  }

  controller.hasActiveTranslation = function () {
    return cachedOffer && cachedOffer.translationState[controller.activeLanguage] !== EventTranslationState.NONE;
  };

  controller.getLanguageTranslationIcon = function (lang) {
    var icon = EventTranslationState.NONE.icon;

    if (cachedOffer && lang) {
      icon = cachedOffer.translationState[lang].icon;
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
      controller.translation = jsonLDLangFilter(cachedOffer, controller.activeLanguage);
    }
  };

  controller.hasPropertyChanged = function (propertyName) {
    var lang = controller.activeLanguage,
        translation = controller.translation;

    return controller.translation && cachedOffer[propertyName][lang] !== translation[propertyName];
  };

  controller.undoPropertyChanges = function (propertyName) {
    var lang = controller.activeLanguage,
        translation = controller.translation;

    if (translation) {
      translation[propertyName] = cachedOffer[propertyName][lang];
    }
  };

  controller.applyPropertyChanges = function (propertyName) {
    var translation = controller.translation[propertyName],
        apiProperty;

    // TODO: this is hacky, should decide on consistent name for this property
    if (propertyName === 'name') {
      apiProperty = 'title';
    }

    translateEventProperty(propertyName, translation, apiProperty);
  };

  controller.stopTranslating = function () {
    controller.translation = undefined;
    controller.activeLanguage = defaultLanguage;
  };

  function translateEventProperty(property, translation, apiProperty) {
    var language = controller.activeLanguage,
        udbProperty = apiProperty || property;

    if (translation && translation !== cachedOffer[property][language]) {
      var translationPromise = offerTranslator.translateProperty(cachedOffer, udbProperty, language, translation);

      translationPromise.then(function () {
        cachedOffer.updateTranslationState();
      });
    }
  }

  // Labelling
  /**
   * @param {Label} newLabel
   */
  controller.labelAdded = function (newLabel) {
    var similarLabel = _.find(cachedOffer.labels, function (label) {
      return newLabel.name.toUpperCase() === label.toUpperCase();
    });
    if (similarLabel) {
      $scope.$apply(function () {
        $scope.event.labels = angular.copy(cachedOffer.labels);
      });
      $window.alert('Het label "' + newLabel.name + '" is reeds toegevoegd als "' + similarLabel + '".');
    } else {
      offerLabeller.label(cachedOffer, newLabel.name);
    }
  };

  /**
   * @param {Label} label
   */
  controller.labelRemoved = function (label) {
    offerLabeller.unlabel(cachedOffer, label.name);
  };
}
