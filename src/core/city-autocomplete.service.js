'use strict';

/**
 * @ngdoc service
 * @name udb.core.CityAutocomplete
 * @description
 * Service for city autocompletes.
 */
angular
  .module('udb.core')
  .service('cityAutocomplete', CityAutocomplete);

/* @ngInject */
function CityAutocomplete($q, $http, appConfig, UdbPlace, jsonLDLangFilter) {
  /**
   *
   * Get the places for a city
   *
   * @param {string} zipcode
   * @returns {Promise}
   */
  this.getPlacesByZipcode = function(zipcode) {

    var deferredPlaces = $q.defer();

    var config = {
      params: {
        'zipcode': zipcode
      }
    };

    var parsePagedCollection = function (response) {
      var locations = _.map(response.data.member, function (placeJson) {
        var place = new UdbPlace(placeJson);
        return jsonLDLangFilter(place, 'nl');
      });

      deferredPlaces.resolve(locations);
    };

    var failed = function () {
      deferredPlaces.reject('something went wrong while getting places for city with zipcode: ' + zipcode);
    };

    $http.get(appConfig.baseUrl + 'places', config).then(parsePagedCollection, failed);

    return deferredPlaces.promise;
  };

}
