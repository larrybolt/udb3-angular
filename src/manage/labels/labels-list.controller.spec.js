'use strict';

describe('Controller: Labels List', function() {
  var $scope,
    $rootscope,
    $q,
    $controller,
    LabelService;

  var pagedLabels = {
    '@context': 'http://www.w3.org/ns/hydra/context.jsonld',
    '@type': 'PagedCollection',
    'itemsPerPage': 50,
    'totalItems': 19,
    'member': getLabels(),
    'firstPage': 'http://culudb-silex.dev:8080/dashboard/items?page=1',
    'lastPage': 'http://culudb-silex.dev:8080/dashboard/items?page=1',
    'nextPage': 'http://culudb-silex.dev:8080/dashboard/items?page=1'
  };

  function getLabels() {
    return {
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
        },
        {
          'id': '4',
          'name': 'label 4'
        },
        {
          'id': '5',
          'name': 'label 5'
        },
        {
          'id': '6',
          'name': 'label 6'
        },
        {
          'id': '7',
          'name': 'label 7'
        },
        {
          'id': '8',
          'name': 'label 8'
        },
        {
          'id': '9',
          'name': 'label 9'
        },
        {
          'id': '10',
          'name': 'label 10'
        }
      ],
      'itemsPerPage': 10,
      'totalItems': 19
    }
  };

  beforeEach(module('udb.manage'));
  beforeEach(module('udb.manage.labels'));

  beforeEach(inject(function($rootScope, _$q_, _$controller_) {
    $controller = _$controller_;
    $q = _$q_;
    $rootscope = $rootScope;
    $scope = $rootScope.$new();
  }));

  beforeEach(function () {
    LabelService = jasmine.createSpyObj('LabelService', ['find']);
    LabelService.find.and.returnValue($q.resolve(getLabels()));
  });

  function getController() {
    return $controller(
      'LabelsListController', {
        $scope: $scope,
        $rootScope: $rootscope,
        UserService: LabelService
      }
    );
  }

  it('initialise the labels list', function() {
    var controller = getController();
    $scope.$digest();

    expect(controller.labels).toEqual(getLabels().labels);
  });

  it('should catch the emit and find the labels', function() {
    var controller = getController();
    spyOn(controller, 'findLabels');
    $rootscope.$emit('labelSearchSubmitted', {query: 'asdf'});

    expect(controller.findLabels).toHaveBeenCalledWith('asdf');
  });
});
