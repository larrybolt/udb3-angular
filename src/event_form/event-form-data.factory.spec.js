'use strict';

describe('Factory: Event form data', function () {

  beforeEach(module('udb.event-form'));

  it('should indicate when the timing is not a valid periodic range', inject(function (EventFormData) {
    var timingData = [
      {
        type: 'periodic',
        start: new Date('2012-12-12'),
        end: null,
        valid: false
      },
      {
        type: 'periodic',
        start: null,
        end: new Date('2012-12-12'),
        valid: false
      },
      {
        type: 'permanent',
        start: new Date('2012-12-12'),
        end: null,
        valid: false
      },
      {
        type: 'periodic',
        start: new Date('2012-12-13'),
        end: new Date('2012-12-12'),
        valid: false
      },
      {
        type: 'periodic',
        start: new Date('2012-12-11'),
        end: new Date('2012-12-12'),
        valid: true
      }
    ];

    timingData.forEach(function (timing) {
      EventFormData.calendarType = timing.type;
      EventFormData.startDate = timing.start;
      EventFormData.endDate = timing.end;

      expect(EventFormData.hasValidPeriodicRange()).toEqual(timing.valid);
    });

  }));

  it('should update the list of media objects when adding an image', inject(function (EventFormData) {
    var image = {
      '@id': 'http://culudb-silex.dev:8080/media/d2efceac-46ec-49b1-903f-d73b4c69fe70',
      '@type': 'schema:ImageObject',
      'contentUrl': 'http://culudb-silex.dev:8080/media/d2efceac-46ec-49b1-903f-d73b4c69fe70.png',
      'thumbnailUrl': 'http://culudb-silex.dev:8080/media/d2efceac-46ec-49b1-903f-d73b4c69fe70.png',
      'description': 'desc',
      'copyrightHolder': 'copy'
    };

    EventFormData.addImage(image);
    expect(EventFormData.mediaObjects).toEqual([image]);
  }));

  it('should remove update the list of media objects when removing a media object', inject(function (EventFormData) {
    var imageToRemove = {
      '@id': 'http://culudb-silex.dev:8080/media/d2efceac-46ec-49b1-903f-d73b4c69fe70',
      '@type': 'schema:ImageObject',
      'contentUrl': 'http://culudb-silex.dev:8080/media/d2efceac-46ec-49b1-903f-d73b4c69fe70.png',
      'thumbnailUrl': 'http://culudb-silex.dev:8080/media/d2efceac-46ec-49b1-903f-d73b4c69fe70.png',
      'description': 'desc',
      'copyrightHolder': 'copy'
    };

    var otherMediaObject = {
      '@id': 'http://culudb-silex.dev:8080/media/d2efceac-6666-49b1-1234-d73b4c69fe70',
      '@type': 'schema:ImageObject',
      'contentUrl': 'http://culudb-silex.dev:8080/media/d2efceac-6666-49b1-1234-d73b4c69fe70.png',
      'thumbnailUrl': 'http://culudb-silex.dev:8080/media/d2efceac-6666-49b1-1234-d73b4c69fe70.png',
      'description': 'desc',
      'copyrightHolder': 'copy'
    };

    EventFormData.mediaObjects = [
      imageToRemove,
      otherMediaObject
    ];

    EventFormData.removeMediaObject(imageToRemove);
    expect(EventFormData.mediaObjects).toEqual([otherMediaObject]);
  }));
});