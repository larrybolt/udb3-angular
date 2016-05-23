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
  .service('UserService', UserService);

/* @ngInject */
function UserService($q, uitidAuth) {
  var service = this;

  var defaultApiConfig = {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + uitidAuth.getToken()
    },
    params: {}
  };

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
      'id': '4',
      'email': 'info@mail.com',
      'nick': 'nickname',
      'roles': [
        'admin'
      ]
    },
    '5': {
      'id': '5',
      'email': 'info@mail.com',
      'nick': 'nickname',
      'roles': []
    },
    '6': {
      'id': '6',
      'email': 'info@mail.com',
      'nick': 'nickname',
      'roles': [
        'moderator'
      ]
    },
    '7': {
      'id': '7',
      'email': 'info@mail.com',
      'nick': 'nickname',
      'roles': []
    },
    '8': {
      'id': '8',
      'email': 'info@mail.com',
      'nick': 'nickname',
      'roles': []
    },
    '9': {
      'id': '9',
      'email': 'info@mail.com',
      'nick': 'nickname',
      'roles': []
    },
    '10': {
      'id': '10',
      'email': 'info@mail.com',
      'nick': 'nickname',
      'roles': []
    },
    '11': {
      'id': '11',
      'email': 'info@mail.com',
      'nick': 'nickname',
      'roles': []
    },
    '12': {
      'id': '12',
      'email': 'info@mail.com',
      'nick': 'nickname',
      'roles': []
    },
    '13': {
      'id': '13',
      'email': 'info@mail.com',
      'nick': 'nickname',
      'roles': []
    },
    '14': {
      'id': '14',
      'email': 'info@mail.com',
      'nick': 'nickname',
      'roles': []
    },
    '15': {
      'id': '15',
      'email': 'info@mail.com',
      'nick': 'nickname',
      'roles': []
    },
    '16': {
      'id': '16',
      'email': 'info@mail.com',
      'nick': 'nickname',
      'roles': []
    },
    '17': {
      'id': '17',
      'email': 'info@mail.com',
      'nick': 'nickname',
      'roles': []
    },
    '18': {
      'id': '18',
      'email': 'info@mail.com',
      'nick': 'nickname',
      'roles': []
    },
    '19': {
      'id': '19',
      'email': 'info@mail.com',
      'nick': 'nickname',
      'roles': []
    }
  };

  service.getUsers = function (page) {

    var deferredUsers = $q.defer();

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

  service.find = function(query) {
    var deferredUsers = $q.defer();

    var requestConfig = _.cloneDeep(defaultApiConfig);
    var shuffled_array = _.shuffle(jsonUsers)

    deferredUsers.resolve(_.shuffle(jsonUsers), requestConfig);
    return deferredUsers.promise;
  };
}
