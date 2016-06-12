'use strict';

describe('Controller: Labels List', function() {
  var $scope,
    $rootScope,
    $q,
    $controller,
    LabelService;

  var pagedLabels = {
    '@context': 'http://www.w3.org/ns/hydra/context.jsonld',
    '@type': 'PagedCollection',
    'itemsPerPage': 50,
    'totalItems': 19,
    'member': [
      {id: '5B44E8FC-6836-4A18-A442-1FEA4D6B7979', name: 'dirk'},
      {id: '6DC53D5A-B37B-4B7C-9794-07DCAD38B839', name: 'danny'}
    ],
    'firstPage': 'http://culudb-silex.dev:8080/dashboard/items?page=1',
    'lastPage': 'http://culudb-silex.dev:8080/dashboard/items?page=1',
    'nextPage': 'http://culudb-silex.dev:8080/dashboard/items?page=1'
  };


  beforeEach(module('udb.manage'));
  beforeEach(module('udb.manage.labels'));

  beforeEach(inject(function(_$rootScope_, _$q_, _$controller_) {
    $controller = _$controller_;
    $q = _$q_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();

    LabelService = jasmine.createSpyObj('LabelService', ['find']);
    LabelService.find.and.returnValue($q.resolve(pagedLabels));
  }));
  
  function getLabelListController() {
    return $controller(
      'LabelsListController', {
        $scope: $scope,
        $rootScope: $rootScope,
        LabelService: LabelService
      }
    );
  }

  it('should catch the emit and find the labels', function() {
    var controller = getLabelListController();
    spyOn(controller, 'findLabels');
    $rootScope.$emit('labelSearchSubmitted', {query: 'asdf'});

    expect(controller.findLabels).toHaveBeenCalledWith('asdf');
  });
});
