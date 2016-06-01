'use strict';

/**
 * @ngdoc service
 * @name udb.manage.roles
 * @description
 * # user
 * Service in the udb.manage.roles.
 */
angular
  .module('udb.manage')
  .service('RoleService', RoleService);

/* @ngInject */
function RoleService($q) {
  var service = this;

  var jsonRoles = [
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
    var deferredRoles = $q.defer();

    var rolesArray;
    if (query) {
      rolesArray = _.shuffle(jsonRoles);
    }
    else {
      rolesArray = jsonRoles;
    }
    rolesArray = pageArray(rolesArray, 10);

    deferredRoles.resolve(rolesArray[page - 1]);
    return deferredRoles.promise;
  };
}
