'use strict';

/**
 * @ngdoc service
 * @name udb.event-form.copyrightNegotiator
 * @description
 * # copyrightNegotiator
 * Service in the udb.event-form.
 */
angular
  .module('udb.event-form')
  .service('copyrightNegotiator', CopyrightNegotiator);

/* @ngInject */
function CopyrightNegotiator($cookies) {
  var service = this;
  var CookieKey = 'copyright-agreement-confirmed';

  service.confirm = function () {
    var expirationDate = moment().add(1, 'year').toDate();
    var agreement = {
      confirmed: true
    };

    $cookies.putObject(
      CookieKey,
      agreement,
      {
        expires: expirationDate
      }
    );
  };

  service.confirmed = function () {
    var agreement = $cookies.getObject(CookieKey);
    return agreement ? agreement.confirmed : false;
  };
}
