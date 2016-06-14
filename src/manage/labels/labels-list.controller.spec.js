'use strict';

describe('Controller: Labels List', function() {
  var $scope,
    $rootScope,
    $q,
    $controller,
    LabelService,
    scheduler;

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

    scheduler = new Rx.TestScheduler();
    var originalDebounce = Rx.Observable.prototype.debounce;
    spyOn(Rx.Observable.prototype, 'debounce').and.callFake(function(originalDelay) {
      return originalDebounce.call(this, originalDelay, scheduler);
    });
  }));
  
  function getLabelListController() {
    return $controller(
      'LabelsListController', {
        LabelService: LabelService
      }
    );
  }

  it('should look for the first page of items when the search query changes', function(done) {
    var controller = getLabelListController();
    controller.queryChanged('reactive extension');

    scheduler.scheduleAbsolute(null, 300, function() {
      expect(LabelService.find).toHaveBeenCalledWith('reactive extension', 10, 0);
      scheduler.stop();
      done();
    });

    scheduler.start();
  });

  it('should look for the items at the right offset when the page for the active query changes', function(done) {
    var controller = getLabelListController();
    controller.queryChanged('beep');
    controller.pageChanged(2);

    scheduler.scheduleAbsolute(null, 300, function() {
      expect(LabelService.find).toHaveBeenCalledWith('beep', 10, 10);
      scheduler.stop();
      done();
    });

    scheduler.start();
  });

  it('should set the right loading states when looking for items', function(done) {
    LabelService = jasmine.createSpyObj('LabelService', ['find']);
    var labelRequest = $q.defer();
    LabelService.find.and.returnValue(labelRequest.promise);

    var controller = getLabelListController();
    // The controller should not look for items when it loads
    expect(controller.loading).toEqual(false);

    // When the query changes the controller start looking for items
    controller.queryChanged('dirk');
    scheduler.scheduleAbsolute(null, 300, function() {
      expect(controller.loading).toEqual(true);

      // The items should load after the search result arrives
      labelRequest.resolve(pagedLabels);
      $scope.$digest();
      expect(controller.loading).toEqual(false);

      scheduler.stop();
      done();
    });

    scheduler.start();
  });
});
