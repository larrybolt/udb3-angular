'use strict';

/**
 * @ngdoc function
 * @name udb.place-detail.controller:PlaceDetailController
 * @description
 * # PlaceDetailController
 * Place Detail controller
 */
angular
    .module('udb.place-detail')
    .controller('PlaceDetailController', PlaceDetail);

/* @ngInject */
function PlaceDetail(
  $scope,
  placeId,
  udbApi,
  $location,
  jsonLDLangFilter,
  variationRepository,
  eventEditor
) {
  var activeTabId = 'data';

  $scope.placeId = placeId;
  $scope.placeIdIsInvalid = false;
  $scope.hasEditPermissions = false;
  $scope.placeHistory = [];
  $scope.tabs = [
    {
      id: 'data',
      header: 'Gegevens'
    },
    /*{
      id: 'history',
      header: 'Historiek'
    },*/
    {
      id: 'publication',
      header: 'Publicatie'
    },
  ];

  // Check if user has permissions.
  udbApi.hasPlacePermission(placeId).then(function(result) {
    $scope.hasEditPermissions = result.data.hasPermission;
  });

  var placeLoaded = udbApi.getPlaceById($scope.placeId);
  var language = 'nl';
  var cachedPlace;

  placeLoaded.then(
      function (place) {
        cachedPlace = place;

        /*var placeHistoryLoaded = udbApi.getEventHistoryById($scope.placeId);

        placeHistoryLoaded.then(function(placeHistory) {
          $scope.placeHistory = placeHistory;
        });*/

        var personalVariationLoaded = variationRepository.getPersonalVariation(place);

        $scope.place = jsonLDLangFilter(place, language);
        $scope.placeIdIsInvalid = false;

        personalVariationLoaded
          .then(function (variation) {
            $scope.place.description = variation.description[language];
          })
          .finally(function () {
            $scope.placeIsEditable = true;
          });
      },
      function (reason) {
        $scope.placeIdIsInvalid = true;
      }
  );

  $scope.placeLocation = function (place) {

    if (place.address.addressLocality) {
      return place.address.addressLocality;
    }

    return '';
  };

  $scope.placeIds = function (place) {
    return _.union([place.id], place.sameAs);
  };

  $scope.isUrl = function (potentialUrl) {
    return /^(https?)/.test(potentialUrl);
  };

  $scope.isTabActive = function (tabId) {
    return tabId === activeTabId;
  };

  $scope.makeTabActive = function (tabId) {
    activeTabId = tabId;
  };

  $scope.openEditPage = function() {
    $location.path('/place/' + placeId + '/edit');
  };

  $scope.updateDescription = function(description) {
    if ($scope.place.description !== description) {
      var updatePromise = eventEditor.editDescription(cachedPlace, description);

      updatePromise.finally(function () {
        if (!description) {
          $scope.place.description = cachedPlace.description[language];
        }
      });

      return updatePromise;
    }
  };
}
