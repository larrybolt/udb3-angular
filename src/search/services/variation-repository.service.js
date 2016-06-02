'use strict';

/**
 * @ngdoc service
 * @name udb.search.variationRepository
 * @description
 * # variationRepository
 * Service in the udb.search.
 */
angular
  .module('udb.search')
  .service('variationRepository', VariationRepository);

/* @ngInject */
function VariationRepository(udbApi, $cacheFactory, $q, UdbEvent, $rootScope, UdbPlace) {

  var requestChain = $q.when();
  var interruptRequestChain = false;
  var personalVariationCache = $cacheFactory('personalVariationCache');

  this.getPersonalVariation = function (offer) {
    var deferredVariation =  $q.defer(),
        personalVariation = personalVariationCache.get(offer.url);

    if (personalVariation) {
      if (personalVariation === 'no-personal-variation') {
        deferredVariation.reject('there is no personal variation for offer with url: ' + offer.url);
      } else {
        deferredVariation.resolve(personalVariation);
      }
    } else {
      var userPromise = udbApi.getMe();

      userPromise
        .then(function(user) {
          requestChain = requestChain.then(
            requestVariation(user.id, 'personal', offer.apiUrl, deferredVariation)
          );
        });
    }

    return deferredVariation.promise;
  };

  function requestVariation(userId, purpose, offerUrl, deferredVariation) {
    return function () {
      var offerId = offerUrl.toString().split('/').pop();

      if (interruptRequestChain) {
        deferredVariation.reject('navigating away, interrupting request for variation for offer with id: ' + offerId);
        return deferredVariation;
      }

      var personalVariationRequest = udbApi.getOfferVariations(userId, purpose, offerUrl, deferredVariation);

      personalVariationRequest.success(function (variations) {
        var jsonPersonalVariation = _.first(variations.member);
        if (jsonPersonalVariation) {
          var variation;
          if (jsonPersonalVariation['@context'] === '/api/1.0/event.jsonld') {
            variation = new UdbEvent(jsonPersonalVariation);
          } else if (jsonPersonalVariation['@context'] === '/api/1.0/place.jsonld') {
            variation = new UdbPlace(jsonPersonalVariation);
          }
          personalVariationCache.put(offerId, variation);
          deferredVariation.resolve(variation);
        } else {
          personalVariationCache.put(offerId, 'no-personal-variation');
          deferredVariation.reject('there is no personal variation for event with id: ' + offerId);
        }
      });

      personalVariationRequest.error(function () {
        deferredVariation.reject('no variations found for event with id: ' + offerId);
      });

      return personalVariationRequest.then();
    };
  }

  this.save = function (offerId, variation) {
    personalVariationCache.put(offerId, variation);
  };

  this.remove = function (offerId) {
    personalVariationCache.remove(offerId);
  };

  $rootScope.$on('$locationChangeStart', function() {
    interruptRequestChain = true;
    requestChain = requestChain.finally(function () {
      interruptRequestChain = false;
    });
  });
}
