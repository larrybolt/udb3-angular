'use strict';

describe('Controller: Place Detail', function() {
  var $scope,
      placeController,
      placeId,
      udbApi,
      $location,
      jsonLDLangFilter,
      variationRepository,
      offerEditor,
      UdbPlace,
      $q,
      examplePlaceEventJson = {
        '@id': "http://culudb-silex.dev:8080/place/03458606-eb3f-462d-97f3-548710286702",
        '@context': "/api/1.0/place.jsonld",
        name: "Villa 99, een art deco pareltje",
        creator: "christophe.vanthuyne@ronse.be",
        created: "2015-06-14T15:22:33+02:00",
        modified: "2015-12-15T14:08:06+01:00",
        publisher: "Invoerders Algemeen ",
        available: "2015-08-03T00:00:00+02:00",
        sameAs: [ ],
        address: {
          addressCountry: "BE",
          addressLocality: "Ronse",
          postalCode: "9600",
          streetAddress: "Engelsenlaan 99"
        },
        bookingInfo: {
          description: "",
          name: "standard price",
          price: 0,
          priceCurrency: "EUR"
        },
        terms: [
          {
            label: "Vlaamse Ardennen",
            domain: "flanderstouristregion",
            id: "reg.365"
          },
          {
            label: "Monument",
            domain: "eventtype",
            id: "0.14.0.0.0"
          },
          {
            label: "9600 Ronse",
            domain: "flandersregion",
            id: "reg.1417"
          }
        ],
        "labels": ['some label']
      };

  var deferredEvent, deferredVariation, deferredPermission, deferredUpdate;

  beforeEach(module('udb.search'));
  beforeEach(module('udb.templates'));

  beforeEach(inject(function($injector, $rootScope, $controller, _$q_) {
    $scope = $rootScope.$new();
    placeId = '03458606-eb3f-462d-97f3-548710286702';
    udbApi = $injector.get('udbApi');
    $location = $injector.get('$location');
    jsonLDLangFilter = $injector.get('jsonLDLangFilter');
    variationRepository = $injector.get('variationRepository');
    offerEditor = $injector.get('offerEditor');
    UdbPlace = $injector.get('UdbPlace');
    $q = _$q_;

    deferredEvent = $q.defer(); deferredVariation = $q.defer();
    deferredPermission = $q.defer();

    spyOn(udbApi, 'hasPlacePermission').and.returnValue(deferredPermission.promise);
    deferredPermission.resolve({ 'data': { 'hasPermission': true } });

    spyOn(udbApi, 'getPlaceById').and.returnValue(deferredEvent.promise);
    deferredEvent.resolve(new UdbPlace(examplePlaceEventJson));

    spyOn(variationRepository, 'getPersonalVariation').and.returnValue(deferredVariation.promise);

    deferredUpdate = $q.defer();
    spyOn(offerEditor, 'editDescription').and.returnValue(deferredUpdate.promise);

    placeController = $controller(
      'PlaceDetailController', {
        $scope: $scope,
        placeId: placeId,
        udbApi: udbApi,
        $location: $location,
        jsonLDLangFilter: jsonLDLangFilter,
        variationRepository: variationRepository,
        offerEditor: offerEditor
      }
    );
  }));

  it('should fetch the place information', function () {
    deferredVariation.reject('there is no personal variation for offer');
    $scope.$digest();

    expect($scope.placeId).toEqual(placeId);
    expect(udbApi.hasPlacePermission).toHaveBeenCalledWith(
        '03458606-eb3f-462d-97f3-548710286702'
    );
    expect(udbApi.getPlaceById).toHaveBeenCalledWith(
        '03458606-eb3f-462d-97f3-548710286702'
    );
    expect($scope.placeIsEditable).toEqual(true);
  });

  it('should update the description', function () {
    deferredVariation.reject('there is no personal variation for offer');

    $scope.$digest();

    $scope.updateDescription('updated description');
    deferredUpdate.resolve();

    expect(offerEditor.editDescription).toHaveBeenCalledWith(
      new UdbPlace(examplePlaceEventJson),
      'updated description'
    );
  });
});
