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
  variationRepository
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

  placeLoaded.then(
      function (place) {
        /*var placeHistoryLoaded = udbApi.getEventHistoryById($scope.placeId);

        placeHistoryLoaded.then(function(placeHistory) {
          $scope.placeHistory = placeHistory;
        });*/
        $scope.place = jsonLDLangFilter(place, language);
        $scope.placeIdIsInvalid = false;

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
}
