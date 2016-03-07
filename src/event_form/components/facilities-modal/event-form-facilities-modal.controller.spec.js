'use strict';

describe('Controller: Facilities Modal Controller', function () {

  var EventFormData, facilities, $controller, $rootScope, scope, $uibModalInstance;

  beforeEach(module('udb.event-form'));

  beforeEach(inject(function ($injector) {
    $controller = $injector.get('$controller');
    EventFormData = $injector.get('EventFormData');
    $rootScope = $injector.get('$rootScope');
    scope = $rootScope;
    $uibModalInstance = jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);
  }));

  function getController() {
    return $controller('EventFormFacilitiesModalController', {
      $scope: scope,
      EventFormData: EventFormData,
      $uibModalInstance: $uibModalInstance
    });
  }

  it('should populate the checklist with the existing facilities when opening the model', function () {
    EventFormData.facilities = [
      {
        'label': 'Rolstoel ter beschikking',
        'id': '3.23.3.0.0'
      },
      {
        'label': 'Audiodescriptie',
        'id': '3.13.2.0.0'
      },
      {
        'label': 'Voelstoelen',
        'id': '3.17.2.0.0'
      }
    ];

    var expectedFacilities = {
      'motor': [
        {
          'label': 'Voorzieningen voor rolstoelgebruikers',
          'id': '3.23.1.0.0'
        },
        {
          'label': 'Assistentie',
          'id': '3.23.2.0.0'
        },
        {
          'label': 'Rolstoel ter beschikking',
          'id': '3.23.3.0.0',
          'selected': true
        }
      ],
      'visual': [
        {
          'label': 'Voorzieningen voor hulp- en/of geleidehonden',
          'id': '3.13.1.0.0'
        },
        {
          'label': 'Audiodescriptie',
          'id': '3.13.2.0.0',
          'selected': true
        },
        {
          'label': 'Brochure beschikbaar in braille',
          'id': '3.13.3.0.0'
        },
        {
          'label': 'Brochure beschikbaar in grootletterschrift',
          'id': '3.13.4.0.0'
        },
        {
          'label': 'Brochure beschikbaar in gesproken vorm',
          'id': '3.13.5.0.0'
        }
      ],
      'hearing': [
        {
          'label': 'Ringleiding',
          'id': '3.17.1.0.0'
        },
        {
          'label': 'Voelstoelen',
          'id': '3.17.2.0.0',
          'selected': true
        },
        {
          'label': 'Ondertiteling',
          'id': '3.17.3.0.0'
        }
      ]
    };

    var formController = getController();
    expect(scope.facilities).toEqual(expectedFacilities);
  });
});

