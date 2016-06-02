'use strict';

describe('Service: uitidAuth', function () {

  var $window, $location, $cookieStore, uitidAuth;
  var appConfig = { authUrl: 'http://google.be', baseUrl: 'http://culudb-app.dev:8080/' };
  var token = 'blubblub';

  beforeEach(module('udb.core', function ($provide) {
    $provide.constant('appConfig', appConfig);

    $window = {location: {href: jasmine.createSpy()}};
    $provide.value('$window', $window);

    $location = {absUrl: jasmine.createSpy(), search: jasmine.createSpy(), path: jasmine.createSpy()};
    $provide.value('$location', $location);

    $cookieStore = jasmine.createSpyObj('$cookieStore', ['get', 'put']);
    $provide.provider('$cookieStore', {
      $get: function () {
        return $cookieStore;
      }
    });
  }));

  beforeEach(inject(function ($injector) {
    uitidAuth = $injector.get('uitidAuth');
  }));

  it('should set a token', function () {
    uitidAuth.setToken(token);
    expect($cookieStore.put).toHaveBeenCalledWith('token', token);
  });

  it('should get a token', function () {
    uitidAuth.getToken();
    expect($cookieStore.get).toHaveBeenCalledWith('token');
  });
});