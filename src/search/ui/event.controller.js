'use strict';

/**
 * @ngdoc directive
 * @name udb.search.controller:EventController
 * @description
 * # EventController
 */
angular
  .module('udb.search')
  .controller('EventController', EventController);

/* @ngInject */
function EventController(
  offerEditor,
  variationRepository,
  $controller,
  $scope,
  $q,
  jsonLDLangFilter
) {
  angular.extend(this, $controller('OfferController', {$scope: $scope}));
  var offerController = this;
  var defaultLanguage = 'nl';
  /* @type {UdbEvent} */
  var cachedEvent;

  $q.when(offerController.initialized)
    .then(cacheEvent)
    .then(translateLocation)
    .then(fetchPersonalVariation)
    .finally(function () {
      offerController.editable = true;
    });

  function cacheEvent(event) {
    cachedEvent = event;
    $q.resolve(event);
  }

  function fetchPersonalVariation(event) {
    return variationRepository
      .getPersonalVariation(event)
      .then(function (personalVariation) {
        $scope.event.description = personalVariation.description[defaultLanguage];
        return personalVariation;
      });
  }

  function translateLocation(event) {
    if ($scope.event.location) {
      $scope.event.location = jsonLDLangFilter($scope.event.location, defaultLanguage);
    }
    return $q.resolve(event);
  }

  // Editing
  offerController.updateDescription = function (description) {
    if ($scope.event.description !== description) {
      var updatePromise = offerEditor.editDescription(cachedEvent, description);

      updatePromise.finally(function () {
        if (!description) {
          $scope.event.description = cachedEvent.description[defaultLanguage];
        }
      });

      return updatePromise;
    }
  };
}
