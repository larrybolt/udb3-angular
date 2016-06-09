'use strict';

/**
 * @ngdoc service
 * @name udb.manage.labels
 * @description
 * # user
 * Service in the udb.manage.labels.
 */
angular
  .module('udb.manage.labels')
  .service('LabelService', LabelService);

/* @ngInject */
function LabelService(
  $q,
  $http,
  appConfig,
  uitidAuth
) {
  var service = this;
  var apiUrl = appConfig.baseApiUrl;
  var defaultApiConfig = {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + uitidAuth.getToken()
    },
    params: {}
  };

  function pageArray(items, itemsPerPage) {
    var result = [];
    angular.forEach(items, function(item, index) {
      var rowIndex = Math.floor(index / itemsPerPage),
          colIndex = index % itemsPerPage;
      if (!result[rowIndex]) {
        result[rowIndex] = [];
        result[rowIndex].labels = [];
        result[rowIndex].itemsPerPage = itemsPerPage;
        result[rowIndex].totalItems = items.length;
      }

      result[rowIndex].labels[colIndex] = item;
    });

    return result;
  }

  function returnUnwrappedData(response) {
    return $q.resolve(response.data);
  }

  service.find = function(queryString, page) {
    var offset = page || 0,
      searchParams = {
        start: offset
      };
    var requestOptions = _.cloneDeep(defaultApiConfig);
    requestOptions.params = searchParams;

    if (queryString) {
      searchParams.query = queryString;
    }
    else {
      searchParams.query = '';
    }

    return $http
      .get(apiUrl + 'labels', requestOptions)
      .then(returnUnwrappedData);
  };
}
