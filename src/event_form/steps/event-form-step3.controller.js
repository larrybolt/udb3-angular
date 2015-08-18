'use strict';

/**
 * @ngdoc function
 * @name udbApp.controller:EventFormStep3Controller
 * @description
 * # EventFormStep3Controller
 * Step 3 of the event form
 */
angular
  .module('udb.event-form')
  .controller('EventFormStep3Controller', EventFormStep3Controller);

/* @ngInject */
function EventFormStep3Controller(
    $scope,
    EventFormData,
    cityAutocomplete,
    placeCategories,
    $modal,
    cities,
    Levenshtein
) {

  var controller = this;

  // Scope vars.
  // main storage for event form.
  $scope.eventFormData = EventFormData;

  $scope.categories = placeCategories;

  // Autocomplete model field for the City/Postal code.
  $scope.cityAutocompleteTextField = '';

  // Autocomplete model field for the Location.
  $scope.locationAutocompleteTextField = '';

  // Autocomplete helper vars.
  $scope.searchingCities = false;
  $scope.cityAutoCompleteError = false;
  $scope.loadingPlaces = false;
  $scope.locationAutoCompleteError = false;
  $scope.locationsSearched = false;

  $scope.selectedCity = '';
  $scope.selectedLocation = undefined;
  $scope.placeStreetAddress = '';
  $scope.openPlaceModal = openPlaceModal;

  // Validation.
  $scope.showValidation = false;

  // Convenient scope variables for current controller (in multistep).
  $scope.locationsForCity = [];

  // Scope functions.
  $scope.cities = cities;
  $scope.changeCitySelection = changeCitySelection;
  $scope.changeLocationSelection = changeLocationSelection;
  $scope.validatePlace = validatePlace;
  $scope.changeStreetAddress = changeStreetAddress;
  $scope.setMajorInfoChanged = setMajorInfoChanged;
  $scope.filterCities = function(value) {
    return function (city) {
      var words = value.match(/\w+/g);
      var zipMatches = words.filter(function (word) {
        return city.zip.indexOf(word) !== -1;
      });
      var nameMatches = words.filter(function (word) {
        return city.name.toLowerCase().indexOf(word.toLowerCase()) !== -1;
      });

      return zipMatches.length + nameMatches.length >= words.length;
    };
  };
  $scope.orderByLevenshteinDistance = function(value) {
    return function (city) {
      return new Levenshtein(value, city.zip + '' + city.name);
    };
  };

  // Default values
  if (EventFormData.location && EventFormData.location.address && EventFormData.location.address.postalCode) {

    $scope.selectedCity = EventFormData.location.address.postalCode +
      ' ' + EventFormData.location.address.addressLocality;

    // Location has a name => an event.
    if (EventFormData.location.name) {
      $scope.selectedLocation = EventFormData.location;
    }
    else {
      $scope.placeStreetAddress = EventFormData.location.address.streetAddress;
      $scope.selectedLocation = EventFormData.location;
    }

  }

  /**
   * Select City.
   */
  controller.selectCity = function ($item, $label) {

    var zipcode = $item.zip,
        name = $item.name;

    EventFormData.resetLocation();
    var location = $scope.eventFormData.getLocation();
    location.address.postalCode = zipcode;
    location.address.addressLocality = name;
    EventFormData.setLocation(location);

    $scope.cityAutocompleteTextField = '';
    $scope.selectedCity = $label;
    $scope.selectedLocation = undefined;

    controller.getLocations(zipcode);
  };
  $scope.selectCity = controller.selectCity;

  /**
   * Change a city selection.
   */
  function changeCitySelection() {

    EventFormData.resetLocation();
    $scope.selectedCity = '';
    $scope.selectedLocation = undefined;
    $scope.cityAutocompleteTextField = '';
    $scope.locationsSearched = false;
    $scope.locationAutocompleteTextField = '';
    EventFormData.showStep4 = false;

  }

  /**
   * Select location.
   * @returns {undefined}
   */
  controller.selectLocation = function ($item, $model, $label) {

    var selectedLocation = _.find($scope.locationsForCity, function (location) {
      return location.id === $model;
    });

    // Assign selection, hide the location field and show the selection.
    $scope.selectedLocation = selectedLocation;
    $scope.locationAutocompleteTextField = '';

    var location = EventFormData.getLocation();
    location.id = $model;
    location.name = $label;
    EventFormData.setLocation(location);

    EventFormData.showStep4 = true;
    setMajorInfoChanged();

  };
  $scope.selectLocation = controller.selectLocation;

  /**
   * Change selected location.
   * @returns {undefined}
   */
  function changeLocationSelection() {

    // Reset only the location data of the location.
    var location = EventFormData.getLocation();
    location.id = '';
    location.name = '';
    EventFormData.setLocation(location);

    //$scope.selectedCity = '';
    $scope.selectedLocation = false;
    $scope.locationAutocompleteTextField = '';
    $scope.locationsSearched = false;

    EventFormData.showStep4 = false;

  }

  /**
   * Get locations for Event.
   * @returns {undefined}
   * @param {string} zipcode
   */
  controller.getLocations = function (zipcode) {

    $scope.loadingPlaces = true;
    $scope.locationAutoCompleteError = false;

    var promise = cityAutocomplete.getPlacesByZipcode(zipcode);
    return promise.then(function (locations) {
      $scope.locationsForCity = locations;
      $scope.locationsSearched = false;
      $scope.loadingPlaces = false;
      return $scope.locationsForCity;
    }, function() {
      $scope.locationsSearched = false;
      $scope.loadingPlaces = false;
      $scope.locationAutoCompleteError = true;
      return [];
    });

  };

  controller.filterCityLocations = function (filterValue) {
    return function (location) {
      // assume a search has been launched once a location goes through the filter
      // getLocations() is called when the city changes and toggles this off again
      $scope.locationsSearched = true;

      var words = filterValue.match(/\w+/g).filter(function (word) {
        return word.length > 2;
      });
      var addressMatches = words.filter(function (word) {
        return location.address.streetAddress.toLowerCase().indexOf(word.toLowerCase()) !== -1;
      });
      var nameMatches = words.filter(function (word) {
        return location.name.toLowerCase().indexOf(word.toLowerCase()) !== -1;
      });

      return addressMatches.length + nameMatches.length >= words.length;
    };
  };
  $scope.filterCityLocations = controller.filterCityLocations;

  controller.orderCityLocations = function (filterValue) {
    return function (location) {
      return new Levenshtein(location, location.name + '' + location.address.streetAddress);
    };
  };
  $scope.orderCityLocations = controller.orderCityLocations;

  /**
   * Open the organizer modal.
   */
  function openPlaceModal() {

    var modalInstance = $modal.open({
      templateUrl: 'templates/event-form-place-modal.html',
      controller: 'EventFormPlaceModalController',
      controllerAs: 'modalCtrl',
      resolve: {
        location: function () {
          return $scope.eventFormData.location;
        },
        categories: function () {
          return $scope.categories;
        }
      }
    });

    modalInstance.result.then(function (place) {

      // Assign the just saved place to the event form data.
      EventFormData.place = place;

      // Assign selection, hide the location field and show the selection.
      $scope.selectedCity = place.address.postalCode + ' ' + place.address.addressLocality;
      $scope.selectedLocation = place.name.nl;

      var location = {
        'id' : place.id,
        'name': place.name.nl,
        'address': {
          'addressCountry': 'BE',
          'addressLocality': place.address.addressLocality,
          'postalCode': place.address.postalCode,
          'streetAddress': place.address.streetAddress
        }
      };
      EventFormData.setLocation(location);

      EventFormData.showStep4 = true;

    });

  }

  /**
   * Validate Place
   * @returns {undefined}
   */
  function validatePlace() {

    // Forms are automatically known in scope.
    $scope.showValidation = true;
    if (!$scope.step3Form.$valid) {
      return;
    }

    var location = EventFormData.getLocation();
    location.address.addressCountry = 'BE';
    location.address.streetAddress = $scope.placeStreetAddress;
    EventFormData.setLocation(location);

    $scope.selectedLocation = location;

    EventFormData.showStep4 = true;

  }

  /**
   * Change StreetAddress
   */
  function changeStreetAddress() {

    // Reset only the street/number data of the location.
    var location = EventFormData.getLocation();
    location.address.addressCountry = '';
    location.address.streetAddress = '';
    EventFormData.setLocation(location);

    $scope.selectedLocation = undefined;

    EventFormData.showStep4 = false;

  }

  /**
   * Mark the major info as changed.
   */
  function setMajorInfoChanged() {
    if (EventFormData.id) {
      EventFormData.majorInfoChanged = true;
    }
  }

}
