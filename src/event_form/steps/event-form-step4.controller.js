'use strict';

/**
 * @ngdoc function
 * @name udbApp.controller:EventFormStep4Controller
 * @description
 * # EventFormStep4Controller
 * Step 4 of the event form
 */
angular
  .module('udb.event-form')
  .controller('EventFormStep4Controller', EventFormStep4Controller);

/* @ngInject */
function EventFormStep4Controller($scope, EventFormData, udbApi, appConfig, SearchResultViewer, eventCrud, $rootScope) {

  var controller = this;

  // Scope vars.
  // main storage for event form.
  $scope.eventFormData = EventFormData;

  $scope.titleInputOptions = {
    updateOn: 'change blur'
  };

  $scope.infoMissing = false;
  $scope.duplicatesSearched = false;
  $scope.saving = false;
  $scope.error = false;
  $scope.udb3DashboardUrl = appConfig.udb3BaseUrl;
  $scope.currentDuplicateId = '';
  $scope.currentDuplicateDelta = 0;

  $scope.validateEvent = validateEvent;
  $scope.saveEvent = saveEvent;
  $scope.setActiveDuplicate = setActiveDuplicate;
  $scope.previousDuplicate = previousDuplicate;
  $scope.nextDuplicate = nextDuplicate;
  $scope.resultViewer = new SearchResultViewer();
  $scope.eventTitleChanged = eventTitleChanged;

  // Check if we need to show the leave warning
  window.onbeforeunload = function (event) {
    if (EventFormData.majorInfoChanged) {
      return 'Bent u zeker dat je de pagina wil verlaten? Gegevens die u hebt ingevoerd worden niet opgeslagen.';
    }
  };

  /**
   * Validate date after step 4 to enter step 5.
   */
  function validateEvent(checkDuplicates) {

    // First check if all data is correct.
    $scope.infoMissing = false;
    var missingInfo = [];
    if (EventFormData.calendarType === 'single' && EventFormData.timestamps[0].date === '') {
      missingInfo.push('timestamp missing');
    }
    else if (EventFormData.calendarType === 'periodic' &&
      (EventFormData.startDate === '' || EventFormData.endDate === '')
    ) {
      missingInfo.push('start or end date missing');
    }

    if (!EventFormData.type.id) {
      missingInfo.push('event type missing');
    }

    if (EventFormData.isEvent && !EventFormData.location.id) {
      missingInfo.push('place missing for event');
    }
    else if (EventFormData.isPlace && !EventFormData.location.address.streetAddress) {
      missingInfo.push('location missing for place');
    }

    if (missingInfo.length > 0) {
      $scope.infoMissing = true;
      console.log(missingInfo);
      return;
    }

    if (checkDuplicates) {
      $scope.saving = true;
      $scope.error = false;

      var promise = findDuplicates(EventFormData);

      $scope.resultViewer.loading = true;
      $scope.duplicatesSearched = true;

      promise.then(function (data) {

        // Set the results for the duplicates modal,
        if (data.totalItems > 0) {
          $scope.saving = false;
          $scope.resultViewer.setResults(data);
        }
        // or save the event immediataly if no duplicates were found.
        else {
          saveEvent();
        }

      }, function() {
        // Error while saving.
        $scope.error = true;
        $scope.saving = false;
      });
    }
    else {
      saveEvent();
    }

  }

  function findDuplicates(data) {
    var conditions = duplicateSearchConditions(data);

    var expressions = [];
    angular.forEach(conditions, function (value, key) {
      expressions.push(key + ':"' + value + '"');
    });

    var queryString = expressions.join(' AND ');

    return udbApi.findEvents(queryString);
  }

  /**
   * Duplicates are searched for by identical properties:
   * - title is the same
   * - on the same location
   */
  function duplicateSearchConditions(data) {

    var location = data.getLocation();

    if (EventFormData.isEvent) {
      /*jshint camelcase: false*/
      /*jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
      return {
        text: EventFormData.name.nl,
        location_label : location.name
      };
    }
    else {
      /*jshint camelcase: false */
      return {
        text: EventFormData.name.nl,
        zipcode: location.address.postalCode,
        keywords: 'UDB3 place'
      };
    }
  }

  /**
   * Save Event for the first time.
   */
  function saveEvent() {

    $scope.error = false;
    $scope.saving = true;

    var eventCrudPromise;
    if (EventFormData.id) {
      eventCrudPromise = eventCrud.updateMajorInfo(EventFormData);
    }
    else {
      eventCrudPromise = eventCrud.createEvent(EventFormData);
    }

    eventCrudPromise.then(function(jsonResponse) {

      EventFormData.majorInfoChanged = false;

      if (EventFormData.isEvent && jsonResponse.data.eventId) {
        EventFormData.id = jsonResponse.data.eventId;
      }
      else if (jsonResponse.data.placeId) {
        EventFormData.id = jsonResponse.data.placeId;
      }

      controller.eventFormSaved();
      $scope.saving = false;
      $scope.resultViewer = new SearchResultViewer();
      EventFormData.showStep(5);

    }, function() {
      // Error while saving.
      $scope.error = true;
      $scope.saving = false;
    });

  }

  controller.eventFormSaved = function () {
    $rootScope.$emit('eventFormSaved', EventFormData);
  };

  /**
   * Set a focus to a duplicate
   * @param {type} id
   */
  function setActiveDuplicate(id) {

    for (var duplicateId in $scope.resultViewer.events) {
      var eventId = $scope.resultViewer.events[duplicateId]['@id'].split('/').pop();
      if (eventId === id) {
        $scope.currentDuplicateId = id;
        $scope.currentDuplicateDelta = parseInt(duplicateId) + 1;
      }
    }

  }

  /**
   * Set the previous duplicate active or close modal.
   */
  function previousDuplicate() {

    var previousDelta = parseInt($scope.currentDuplicateDelta) - 2;
    if ($scope.resultViewer.events[previousDelta] !== undefined) {
      var eventId = $scope.resultViewer.events[previousDelta]['@id'].split('/').pop();
      $scope.currentDuplicateId = eventId;
      $scope.currentDuplicateDelta = parseInt(previousDelta) + 1;
    }

  }

  /**
   * Set the next duplicate active or close modal.
   */
  function nextDuplicate() {

    var nextDelta = parseInt($scope.currentDuplicateDelta);
    if ($scope.resultViewer.events[nextDelta] !== undefined) {
      var eventId = $scope.resultViewer.events[nextDelta]['@id'].split('/').pop();
      $scope.currentDuplicateId = eventId;
      $scope.currentDuplicateDelta = parseInt(nextDelta) + 1;
    }

  }

  /**
   * Notify that the title of an event has changed.
   */
  function eventTitleChanged() {
    if (EventFormData.id) {
      $rootScope.$emit('eventTitleChanged', EventFormData);
    }
  }

}
