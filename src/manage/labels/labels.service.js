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
function LabelService($q) {
  var service = this;

  var jsonLabels = [
    {
      'id': '1',
      'name': 'label 1'
    },
    {
      'id': '2',
      'name': 'label 2'
    },
    {
      'id': '3',
      'name': 'label 3'
    },
    {
      'id': '4',
      'name': 'label 4'
    },
    {
      'id': '5',
      'name': 'label 5'
    },
    {
      'id': '6',
      'name': 'label 6'
    },
    {
      'id': '7',
      'name': 'label 7'
    },
    {
      'id': '8',
      'name': 'label 8'
    },
    {
      'id': '9',
      'name': 'label 9'
    },
    {
      'id': '10',
      'name': 'label 10'
    },
    {
      'id': '11',
      'name': 'label 11'
    },
    {
      'id': '12',
      'name': 'label 12'
    },
    {
      'id': '13',
      'name': 'label 13'
    },
    {
      'id': '14',
      'name': 'label 14'
    },
    {
      'id': '15',
      'name': 'label 15'
    },
    {
      'id': '16',
      'name': 'label 16'
    },
    {
      'id': '17',
      'name': 'label 17'
    },
    {
      'id': '18',
      'name': 'label 18'
    },
    {
      'id': '19',
      'name': 'label 19'
    },
    {
      'id': '20',
      'name': 'label 20'
    },
    {
      'id': '21',
      'name': 'label 21'
    }
  ];

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

  service.find = function(query, page) {
    var deferredLabels = $q.defer();

    var labelsArray;
    if (query) {
      labelsArray = _.shuffle(jsonLabels);
    }
    else {
      labelsArray = jsonLabels;
    }
    labelsArray = pageArray(labelsArray, 10);

    deferredLabels.resolve(labelsArray[page - 1]);
    return deferredLabels.promise;
  };
}
