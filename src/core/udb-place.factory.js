'use strict';

/**
 * @ngdoc service
 * @name udb.core.UdbTimestamps
 * @description
 * # UdbTimestamps
 * Contains timestamps info for the calendar
 */
angular
  .module('udb.core')
  .factory('UdbPlace', UdbPlaceFactory);

/* @ngInject */
function UdbPlaceFactory() {

  function getCategoryByType(jsonPlace, domain) {
    var category = _.find(jsonPlace.terms, function (category) {
      return category.domain === domain;
    });

    if (category) {
      return category;
    }

    return;
  }

  /**
   * Return all categories for a given type.
   */
  function getCategoriesByType(jsonPlace, domain) {

    var categories = [];
    for (var i = 0; i < jsonPlace.terms.length; i++) {
      if (jsonPlace.terms[i].domain === domain) {
        categories.push(jsonPlace.terms[i]);
      }
    }

    return categories;
  }

  /**
   * Get the images that exist for this event.
   */
  function getImages(jsonPlace) {

    var images = [];
    if (jsonPlace.mediaObject) {
      for (var i = 0; i < jsonPlace.mediaObject.length; i++) {
        if (jsonPlace.mediaObject[i]['@type'] === 'ImageObject') {
          images.push(jsonPlace.mediaObject[i]);
        }
      }
    }

    return images;
  }

  /**
   * @class UdbPlace
   * @constructor
   */
  var UdbPlace = function (placeJson) {
    this.id = '';
    this.name = {};
    this.type = {};
    this.theme = {};
    this.calendarType = '';
    this.openinghours = [];
    this.address = {
      'addressCountry' : 'BE',
      'addressLocality' : '',
      'postalCode' : '',
      'streetAddress' : '',
    };

    if (placeJson) {
      this.parseJson(placeJson);
    }
  };

  UdbPlace.prototype = {
    parseJson: function (jsonPlace) {

      this.id = jsonPlace['@id'].split('/').pop();
      this.name = jsonPlace.name || '';
      this.address = jsonPlace.address || this.address;
      this.type = getCategoryByType(jsonPlace, 'eventtype') || {};
      this.theme = getCategoryByType(jsonPlace, 'theme') || {};
      this.description = jsonPlace.description || {};
      this.calendarType = jsonPlace.calendarType || '';
      this.startDate = jsonPlace.startDate;
      this.endDate = jsonPlace.endDate;
      this.openingHours = jsonPlace.openingHours || [];
      this.typicalAgeRange = jsonPlace.typicalAgeRange || '';
      this.bookingInfo = jsonPlace.bookingInfo || {};
      this.contactPoint = jsonPlace.contactPoint || {};
      this.organizer = jsonPlace.organizer || {};
      this.image = getImages(jsonPlace);
      this.mediaObject = jsonPlace.mediaObject || [];
      this.facilities = getCategoriesByType(jsonPlace, 'facility') || [];
      this.additionalData = jsonPlace.additionalData || {};

    },

    /**
     * Get the name of the event for a given langcode.
     */
    getName: function(langcode) {
      return this.name[langcode];
    },

    /**
     * Set the event type for this event.
     */
    setEventType: function(id, label) {
      this.type = {
        'id' : id,
        'label' : label,
        'domain' : 'eventtype',
      };
    },

    /**
     * Get the event type for this event.
     */
    getType: function() {
      return this.type;
    },

    /**
     * Get the label for the event type.
     */
    getEventTypeLabel: function() {
      return (this.type && this.type.label) ? this.type.label : '';
    },

    /**
     * Set the event type for this event.
     */
    setTheme: function(id, label) {
      this.theme = {
        'id' : id,
        'label' : label,
        'domain' : 'thema',
      };
    },

    /**
     * Get the event type for this event.
     */
    getTheme: function() {
      return this.theme;
    },

    /**
     * Get the label for the theme.
     */
    getThemeLabel: function() {
      return this.theme.label ? this.theme.label : '';
    },

    /**
     * Reset the opening hours.
     */
    resetOpeningHours: function() {
      this.openinghours = [];
    },

    /**
     * Get the opening hours for this event.
     */
    getOpeningHours: function() {
      return this.openinghours;
    },

    /**
     * Set the country of this place.
     * Follows this schema: https://schema.org/addressCountry and expects a two-letter ISO 3166-1 alpha-2 country code.
     *
     * @param {string} country
     */
    setCountry: function(country) {
      if (_.isString(country) && country.length === 2) {
        this.address.addressCountry = country;
      } else {
        throw country + ' is not a valid ISO 3166-1 alpha-2 country code';
      }
    },

    setLocality: function(locality) {
      this.address.addressLocality = locality;
    },

    setPostalCode: function(postalCode) {
      this.address.postalCode = postalCode;
    },

    setStreet: function(street) {
      this.address.streetAddress = street;
    },

    getCountry: function() {
      return this.address.addressCountry;
    },

    getLocality: function() {
      return this.address.addressLocality;
    },

    getPostalCode: function() {
      return this.address.postalCode;
    },

    getStreet: function(street) {
      return this.address.streetAddress;
    }

  };

  return (UdbPlace);
}
