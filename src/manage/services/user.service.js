'use strict';

/**
 * @ngdoc service
 * @name udb.manage.user
 * @description
 * # user
 * Service in the udb.manage.
 */
angular
  .module('udb.manage')
  .service('userService', userService);

/* @ngInject */
function userService($q, uitidAuth) {
  var service = this;

  var defaultApiConfig = {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + uitidAuth.getToken()
    },
    params: {}
  };

  service.getUsers = function (page) {

    var deferredUsers = $q.defer();
    var jsonUsers = {
      '1': {
        'id': '1',
        'email': 'info@mail.com',
        'nick': 'nickname',
        'roles': [
          'admin',
          'moderator'
        ]
      },
      '2': {
        'id': '2',
        'email': 'info@mail.com',
        'nick': 'nickname',
        'roles': [
          'moderator'
        ]
      },
      '3': {
        'id': '3',
        'email': 'info@mail.com',
        'nick': 'nickname',
        'roles': [
          'admin'
        ]
      },
      '4': {
        'id': '1',
        'email': 'info@mail.com',
        'nick': 'nickname',
        'roles': [
          'admin'
        ]
      },
      '5': {
        'id': '2',
        'email': 'info@mail.com',
        'nick': 'nickname',
        'roles': []
      },
      '6': {
        'id': '3',
        'email': 'info@mail.com',
        'nick': 'nickname',
        'roles': [
          'moderator'
        ]
      },
      '7': {
        'id': '1',
        'email': 'info@mail.com',
        'nick': 'nickname',
        'roles': []
      },
      '8': {
        'id': '2',
        'email': 'info@mail.com',
        'nick': 'nickname',
        'roles': []
      },
      '9': {
        'id': '3',
        'email': 'info@mail.com',
        'nick': 'nickname',
        'roles': []
      },
      '10': {
        'id': '1',
        'email': 'info@mail.com',
        'nick': 'nickname',
        'roles': []
      },
      '11': {
        'id': '1',
        'email': 'info@mail.com',
        'nick': 'nickname',
        'roles': []
      },
      '12': {
        'id': '2',
        'email': 'info@mail.com',
        'nick': 'nickname',
        'roles': []
      },
      '13': {
        'id': '3',
        'email': 'info@mail.com',
        'nick': 'nickname',
        'roles': []
      },
      '14': {
        'id': '1',
        'email': 'info@mail.com',
        'nick': 'nickname',
        'roles': []
      },
      '15': {
        'id': '2',
        'email': 'info@mail.com',
        'nick': 'nickname',
        'roles': []
      },
      '16': {
        'id': '3',
        'email': 'info@mail.com',
        'nick': 'nickname',
        'roles': []
      },
      '17': {
        'id': '1',
        'email': 'info@mail.com',
        'nick': 'nickname',
        'roles': []
      },
      '18': {
        'id': '2',
        'email': 'info@mail.com',
        'nick': 'nickname',
        'roles': []
      },
      '19': {
        'id': '3',
        'email': 'info@mail.com',
        'nick': 'nickname',
        'roles': []
      }
    };

    var requestConfig = _.cloneDeep(defaultApiConfig);
    if (page > 1) {
      requestConfig.params.page = page;
    }

    /*return $http
      .get(appConfig.baseUrl + 'dashboard/items', requestConfig)
      .then(returnUnwrappedData);*/

    deferredUsers.resolve(jsonUsers, requestConfig);

    return deferredUsers.promise;
  };
}