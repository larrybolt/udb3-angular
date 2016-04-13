'use strict';

angular
  .module('udb.core')
  .directive('udbCalendarSummary', udbCalendarSummary);

function udbCalendarSummary() {
  return {
    restrict: 'E',
    scope: {
      offer: '=',
      showOpeningHours: '='
    },
    templateUrl: 'templates/calendar-summary.directive.html',
    controller: 'CalendarSummaryController'
  };
}
