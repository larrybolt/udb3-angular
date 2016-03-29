'use strict'

describe('Controller: Dashboard', function () {
  var $controller, $scope, $q, udbApi;

  beforeEach(module('udb.core'));

  beforeEach(inject(function ($rootScope, _$controller_, _$q_) {
    $controller = _$controller_;
    $q = _$q_;
    $scope = $rootScope.$new();
    udbApi = jasmine.createSpyObj('udbApi', ['getMe', 'getDashboardItems']);
  }));

  function getController(dashboardItems) {
    udbApi.getDashboardItems.and.returnValue($q.resolve({
      data: dashboardItems
    }));

    return $controller('DashboardController', {
      '$scope': $scope,
      'udbApi': udbApi
    });
  }

  it('should greet the active user when the dashboard loads', function () {
    /** @type {UiTIDUser} */
    var activeUser = {
      id: '0075baee-344b-4bee-87de-baa123a458d5',
      nick: 'dirk',
      mbox: 'dirk@dirk.me',
      givenName: 'Dirk Dirkington'
    }
    udbApi.getMe.and.returnValue($q.resolve(activeUser))

    var controller = getController([]);
    $scope.$digest();

    expect(controller.username).toEqual('dirk');
  });

});
