'use strict';

/**
 * @ngdoc service
 * @name udb.manage.labels
 * @description
 * # user
 * Service in the udb.manage.labels.
 */
angular
  .module('udb.manage.label')
  .service('LabelService', LabelService);

/* @ngInject */
function LabelService($q) {
  var service = this;

  var jsonLabels = [
    {
      'id': '1',
      'name': 'admin',
      'permissions': [
        {
          'id': '1',
          'name': 'abc'
        },
        {
          'id': '2',
          'name': 'def'
        },
        {
          'id': '3',
          'name': 'ghi'
        }
      ],
      'users':[
      {
        'id': '1',
        'email': 'info@mail.com',
        'nick': 'nickname'
      },
      {
        'id': '2',
        'email': 'info@mail.com',
        'nick': 'nickname'
      },
      {
        'id': '3',
        'email': 'info@mail.com',
        'nick': 'nickname'
      },
      {
        'id': '4',
        'email': 'info@mail.com',
        'nick': 'nickname'
      },
      {
        'id': '5',
        'email': 'info@mail.com',
        'nick': 'nickname'
      }],
      'labels': [
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
        }
      ]
    },
    {
      'id': '2',
      'name': 'moderator',
      'permissions': [
        {
          'id': '1',
          'name': 'abc'
        },
        {
          'id': '2',
          'name': 'def'
        },
        {
          'id': '3',
          'name': 'ghi'
        }
      ],
      'users':[
        {
          'id': '1',
          'email': 'info@mail.com',
          'nick': 'nickname'
        },
        {
          'id': '2',
          'email': 'info@mail.com',
          'nick': 'nickname'
        },
        {
          'id': '3',
          'email': 'info@mail.com',
          'nick': 'nickname'
        },
        {
          'id': '4',
          'email': 'info@mail.com',
          'nick': 'nickname'
        },
        {
          'id': '5',
          'email': 'info@mail.com',
          'nick': 'nickname'
        }],
      'labels': [
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
        }
      ]
    },
    {
      'id': '3',
      'name': 'wannabe admin',
      'permissions': [
        {
          'id': '1',
          'name': 'abc'
        },
        {
          'id': '2',
          'name': 'def'
        },
        {
          'id': '3',
          'name': 'ghi'
        }
      ],
      'users':[
        {
          'id': '1',
          'email': 'info@mail.com',
          'nick': 'nickname'
        },
        {
          'id': '2',
          'email': 'info@mail.com',
          'nick': 'nickname'
        },
        {
          'id': '3',
          'email': 'info@mail.com',
          'nick': 'nickname'
        },
        {
          'id': '4',
          'email': 'info@mail.com',
          'nick': 'nickname'
        },
        {
          'id': '5',
          'email': 'info@mail.com',
          'nick': 'nickname'
        }],
      'labels': [
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
        }
      ]
    }
  ];

  function pageArray(items, itemsPerPage) {
    var result = [];
    angular.forEach(items, function(item, index) {
      var rowIndex = Math.floor(index / itemsPerPage),
          colIndex = index % itemsPerPage;
      if (!result[rowIndex]) {
        result[rowIndex] = [];
        result[rowIndex].roles = [];
        result[rowIndex].itemsPerPage = itemsPerPage;
        result[rowIndex].totalItems = items.length;
      }

      result[rowIndex].roles[colIndex] = item;
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
