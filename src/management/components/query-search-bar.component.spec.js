'use strict';

describe('Component: Query Search Bar', function () {

  var searchBar, $rootScope, $scope, $componentController, searchController;

  beforeEach(module('udb.management'));
  beforeEach(module('udb.templates'));

  beforeEach(inject(function (_$rootScope_, $compile, _$componentController_){
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $componentController = _$componentController_;
    searchController = jasmine.createSpyObj('searchController', ['updateQuery']);

    $scope.queryString = 'info';

    searchBar = $componentController(
      'udbQuerySearchBar',
      $scope,
      {
        searchEvent: 'userSearchSubmitted',
        searchLabel: 'zoeken',
        onChange: searchController.updateQuery
      });
  }));
  it('should fire an emit when finding results for a given query string', function () {
    spyOn($rootScope, '$emit');

    searchBar.find('foo:bar');

    expect(searchBar.queryString).toEqual('foo:bar');
    expect(searchController.updateQuery).toHaveBeenCalledWith({query: 'foo:bar'});
  });
});