'use strict';

describe('Directive: Http prefix', function () {
  var $compile,
    $rootScope;

  beforeEach(module('udb.event-form'));

  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  function getElement(urlValue) {
    $rootScope.url = urlValue;
    var element = $compile('<input type="text" ng-model="url" udb-http-prefix />')($rootScope);
    $rootScope.$digest();

    return element;
  }

  it('should prefix any value that does not have a protocol with http://', function () {
    var element = getElement('du.de');
    expect(element.val()).toEqual('http://du.de');
  });

  it('should ignore values that already have a http:// prefix', function () {
    var element = getElement('http://du.de');
    expect(element.val()).toEqual('http://du.de');
  });

  it('should ignore values that already have a https:// prefix', function () {
    var element = getElement('https://du.de');
    expect(element.val()).toEqual('https://du.de');
  });

  it('should not force a prefix when there is no value', function () {
    var element = getElement('');
    expect(element.val()).toEqual('');
  });
});
