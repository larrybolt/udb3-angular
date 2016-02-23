'use strict';

/**
 * @ngdoc service
 * @name udb.search.SearchResultViewer
 * @description
 * # SearchResultViewer
 * Search result viewer factory
 */
angular
  .module('udb.search')
  .factory('SearchResultViewer', SearchResultViewerFactory);

function SearchResultViewerFactory() {
  var SelectionState = {
    ALL: {'name': 'all', 'icon': 'fa-check-square'},
    NONE: {'name': 'none', 'icon': 'fa-square-o'},
    SOME: {'name': 'some', 'icon': 'fa-minus-square'}
  };

  var identifyItem = function (event) {
    return event['@id'].split('/').pop();
  };

  /**
   * @class SearchResultViewer
   * @constructor
   * @param    {number}     pageSize        The number of items shown per page
   *
   * @property {object[]}   events          A list of json-LD event objects
   * @property {number}     pageSize        The current page size
   * @property {number}     totalItems      The total items found
   * @property {number}     currentPage     The index of the current page without zeroing
   * @property {boolean}    loading         A flag to indicate the period between changing of the query and
   *                                        receiving of the results.
   * @property {object}     eventProperties A list of event properties that can be shown complementary
   * @property {array}      eventSpecifics  A list of specific event info that can be shown exclusively
   * @property {SelectionState} selectionState Enum that keeps the state of selected results
   */
  var SearchResultViewer = function (pageSize, activePage) {
    this.pageSize = pageSize || 30;
    this.events = [];
    this.totalItems = 0;
    this.currentPage = activePage || 1;
    this.loading = true;
    this.lastQuery = null;
    this.eventProperties = {
      description: {name: 'Beschrijving', visible: false},
      labels: {name: 'Labels', visible: false},
      image: {name: 'Afbeelding', visible: false}
    };
    this.eventSpecifics = [
      {id: 'input', name: 'Invoer-informatie'},
      {id: 'price', name: 'Prijs-informatie'},
      {id: 'translation', name: 'Vertaalstatus'}
    ];
    this.activeSpecific = this.eventSpecifics[0];
    this.selectedIds = [];
    this.selectionState = SelectionState.NONE;
    this.querySelected = false;
  };

  SearchResultViewer.prototype = {
    toggleSelection: function () {
      var state = this.selectionState;

      if (state === SelectionState.SOME || state === SelectionState.ALL) {
        this.deselectPageItems();
        if (this.querySelected) {
          this.deselectAll();
          this.querySelected = false;
        }
      } else {
        this.selectPageItems();
      }
    },
    selectQuery: function () {
      this.querySelected = true;
      this.selectPageItems();
    },
    updateSelectionState: function () {
      var selectedIds = this.selectedIds,
        selectedPageItems = _.filter(this.events, function (event) {
          return _.contains(selectedIds, identifyItem(event));
        });

      if (selectedPageItems.length === this.pageSize) {
        this.selectionState = SelectionState.ALL;
      } else if (selectedPageItems.length > 0) {
        this.selectionState = SelectionState.SOME;
      } else {
        this.selectionState = SelectionState.NONE;
      }
    },
    toggleSelectId: function (id) {

      // Prevent toggling individual items when the whole query is selected
      if (this.querySelected) {
        return;
      }

      var selectedIds = this.selectedIds,
        isSelected = _.contains(selectedIds, id);

      if (isSelected) {
        _.remove(selectedIds, function (iid) {
          return id === iid;
        });
      } else {
        selectedIds.push(id);
      }

      this.updateSelectionState();
    },
    deselectAll: function () {
      this.selectedIds = [];
      this.selectionState = SelectionState.NONE;
    },
    deselectPageItems: function () {
      var selectedIds = this.selectedIds;
      _.forEach(this.events, function (event) {
        var eventId = identifyItem(event);
        _.remove(selectedIds, function (id) {
          return id === eventId;
        });
      });

      this.selectionState = SelectionState.NONE;
    },
    selectPageItems: function () {
      var events = this.events,
        selectedIds = this.selectedIds;

      _.each(events, function (event) {
        selectedIds.push(identifyItem(event));
      });

      this.selectedIds = _.uniq(selectedIds);
      this.selectionState = SelectionState.ALL;
    },
    isIdSelected: function (id) {
      return _.contains(this.selectedIds, id);
    },
    setResults: function (pagedResults) {
      var viewer = this;

      viewer.pageSize = pagedResults.itemsPerPage || 30;
      viewer.events = pagedResults.member || [];
      viewer.totalItems = pagedResults.totalItems || 0;

      viewer.loading = false;
      if (this.querySelected) {
        this.selectPageItems();
      }
      this.updateSelectionState();
    },
    queryChanged: function (query) {
      this.loading = true;
      this.selectedIds = [];
      this.querySelected = false;

      // prevent the initial search from resetting the active page
      if (this.lastQuery && this.lastQuery !== query) {
        this.currentPage = 1;
      }

      this.lastQuery = query;
    },
    activateSpecific: function (specific) {
      this.activeSpecific = specific;
    },
    /**
     * Checks if at least one of the event properties is visible
     * @return {boolean}
     */
    isShowingProperties: function () {
      var property = _.find(this.eventProperties, function (property) {
        return property.visible;
      });

      return !!property;
    }
  };

  return (SearchResultViewer);
}

