'use strict';

describe('Factory: Search Result Generator', function() {
  var $q,
      SearchService,
      SearchResultGenerator,
      scheduler,
      itemsPerPage;

  var pagedSearchResult = {
    '@context': 'http://www.w3.org/ns/hydra/context.jsonld',
    '@type': 'PagedCollection',
    'itemsPerPage': 10,
    'totalItems': 2,
    'member': [
      {id: '5B44E8FC-6836-4A18-A442-1FEA4D6B7979', name: 'dirk'},
      {id: '6DC53D5A-B37B-4B7C-9794-07DCAD38B839', name: 'danny'}
    ],
    'firstPage': 'http://du.de/items?page=1',
    'lastPage': 'http://du.de/items?page=1',
    'nextPage': 'http://du.de/items?page=1'
  };

  beforeEach(module('udb.management', function($provide) {
    SearchService = jasmine.createSpyObj('SearchService', ['find']);

    $provide.provider('SearchService', {
      $get: function () {
        return SearchService;
      }
    });
  }));

  beforeEach(inject(function(_$q_, _SearchResultGenerator_) {
    $q = _$q_;
    itemsPerPage = 10;
    SearchResultGenerator = _SearchResultGenerator_;

    scheduler = new Rx.TestScheduler();
    var originalDebounce = Rx.Observable.prototype.debounce;
    spyOn(Rx.Observable.prototype, 'debounce').and.callFake(function(originalDelay) {
      return originalDebounce.call(this, originalDelay, scheduler);
    });

    SearchService.find.and.returnValue($q.resolve(pagedSearchResult));
  }));

  it('should look for the first page of items when the search query changes', function(done) {
    var query$ = Rx.Observable.return('reactive extension');
    var page$ = Rx.Observable.return(1);
    var generator = new SearchResultGenerator(query$, page$, itemsPerPage);

    scheduler.scheduleAbsolute(null, 300, function() {
      expect(SearchService.find).toHaveBeenCalledWith('reactive extension', 10, 0);
      scheduler.stop();
      sub.dispose();

      done();
    });

    var sub = generator.getSearchResult$().subscribe();
    scheduler.start();
  });

  it('should look for the items at the right offset when the page for the active query changes', function(done) {
    var query$ = Rx.Observable.return('beep');
    var page$ = Rx.Observable.return(2).startWith(1);
    var generator = new SearchResultGenerator(query$, page$, itemsPerPage);

    scheduler.scheduleAbsolute(null, 300, function() {
      expect(SearchService.find).toHaveBeenCalledWith('beep', 10, 10);
      scheduler.stop();
      sub.dispose();
      done();
    });

    var sub = generator.getSearchResult$().subscribe();
    scheduler.start();
  });

  xit('should set the right loading states when looking for items', function(done) {
    SearchService = jasmine.createSpyObj('SearchService', ['find']);
    var labelRequest = $q.defer();
    SearchService.find.and.returnValue(labelRequest.promise);

    var controller = getLabelListController();
    // The controller should not look for items when it loads
    expect(controller.loading).toEqual(false);

    // When the query changes the controller start looking for items
    controller.queryChanged('dirk');
    scheduler.scheduleAbsolute(null, 300, function() {
      expect(controller.loading).toEqual(true);

      // The items should load after the search result arrives
      labelRequest.resolve(pagedSearchResult);
      $scope.$digest();
      expect(controller.loading).toEqual(false);

      scheduler.stop();
      done();
    });

    scheduler.start();
  });
});
