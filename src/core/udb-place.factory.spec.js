'use strict';

describe('Factory: UdbPlace', function () {
  // load the service's module
  beforeEach(module('udb.core'));

  // instantiate the UDB place factory as class constructor
  var UdbPlace;
  var place;
  beforeEach(inject(function (_UdbPlace_) {
    UdbPlace = _UdbPlace_;
    place = new UdbPlace({
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
          domain: "placetype",
          id: "0.14.0.0.0"
        },
        {
          label: "9600 Ronse",
          domain: "flandersregion",
          id: "reg.1417"
        }
      ],
      "labels": ["remove me"]
    });
  }));

  it('Can be unlabelled',function () {
    place.unlabel('remove me');

    expect(place.labels).not.toContain('remove me');
  });

  it('Can be labelled',function () {
    place.label('new label');

    expect(place.labels).toContain('new label');
  });

  it('Does add any similar labels that only have a different letter casing', function (){
    place.label('Foo Bar');
    place.label('foo bar');

    expect(place.labels).toContain('Foo Bar');
    expect(place.labels).not.toContain('foo bar');
  });

  it('Parses the place type and theme from their matching json-ld terms', function () {
    var expectedType = { label: 'Monument', domain: 'placetype', id: '0.14.0.0.0'};

    expect(place.type).toEqual(expectedType);
  });
});
