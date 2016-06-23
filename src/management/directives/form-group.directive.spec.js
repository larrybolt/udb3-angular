'use strict';

describe('Directive: Form group', function () {
  var $compile, $rootScope;

  beforeEach(module('udb.management'));

  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  function getFormElement(requiredValue) {
    $rootScope.requiredValue = requiredValue;
    var inputMarkup = '<input name="requiredValue" ng-minlength="3" type="text" ng-model="requiredValue" />';
    var labelMarkup = '<label class="control-label" for="requiredValue"></label>';
    var formElement = $compile('<form name="form"><div class="form-group" udb-form-group>' + labelMarkup + inputMarkup + '</div></form>')($rootScope);

    formElement
      .find('input')
      .triggerHandler('blur');

    $rootScope.$digest();

    return formElement;
  }

  it('should add an error class when the form field is invalid', function () {
    var formElement = getFormElement('NO');
    var formGroupElement = formElement.find('.form-group');
    expect(formGroupElement.hasClass('has-error')).toEqual(true);
  });

  it('should replace the error class with success when changing to a valid value', function () {
    var formElement = getFormElement('NO');
    var formGroupElement = formElement.find('.form-group');
    expect(formGroupElement.hasClass('has-error')).toEqual(true);

    $rootScope.form.requiredValue.$setViewValue('YES!');
    formElement
      .find('input')
      .triggerHandler('blur');

    expect(formGroupElement.hasClass('has-error')).toEqual(false);
    expect(formGroupElement.hasClass('has-success')).toEqual(true);
  });
});
