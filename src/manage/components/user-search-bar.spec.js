'use strict';

describe('Directive: User Search Bar', function () {

  var searchBar, $rootScope, $scope;

  beforeEach(module('udb.manage'));

  beforeEach(inject(function (_$rootScope_){
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();

    $rootScope.queryString = 'info';
    $compile('<udb-user-search-bar></udb-user-search-bar>')($scope);
    $scope.$digest();

    searchBar = $scope.usb;
  }));

  it('should fire an emit when finding results for a given query string', function () {
    searchBar.find('foo:bar');

    expect(searchBar.queryString).toEqual('foo:bar');
    expect($rootScope.$emit).toHaveBeenCalledWith('userSearchSubmitted', {query: 'foo:bar'});
  });
});