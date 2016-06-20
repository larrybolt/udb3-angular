'use strict';

describe('Directive: Unique label', function () {
  var $compile, $rootScope, $q, LabelManager;

  beforeEach(module('udb.management.labels', function($provide) {
    LabelManager = jasmine.createSpyObj('LabelManager', ['find']);
    $provide.value('LabelManager', LabelManager);
  }));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$q_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $q = _$q_;
  }));

  function getFormElement(labelName) {
    $rootScope.name = labelName;
    var elementMarkup = '<input name="name" type="text" ng-model="name" udb-unique-label />';
    var formElement = $compile('<form name="form">' + elementMarkup + '</form>')($rootScope);
    $rootScope.$digest();

    return formElement;
  }

  it('should check if a label name is unique', function () {
    LabelManager.find.and.returnValue($q.resolve({
      member: [
        {name: 'other-label'}
      ]
    }));
    var element = getFormElement('unique-label');
  });
});
