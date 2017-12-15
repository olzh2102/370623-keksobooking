'use strict';

(function () {
  var filtersContainer = document.querySelector('.map__filters-container');
  var housingType = filtersContainer.querySelector('#housing-type');
  var housingPrice = filtersContainer.querySelector('#housing-price');
  var housingRooms = filtersContainer.querySelector('#housing-rooms');
  var housingGuests = filtersContainer.querySelector('#housing-guests');
  var data = [];

  var checkAny = function (filter) {
    return filter.value === 'any';
  };

  var checkPrice = function (adv, priceValue) {
    var checkedAdv;

    switch (priceValue) {
      case 'low': checkedAdv = adv < 10000;
        break;
      case 'middle': checkedAdv = adv >= 10000 && adv < 50000;
        break;
      case 'high': checkedAdv = adv >= 50000;
        break;
      default: checkedAdv = adv;
    }
    return checkedAdv;
  };

  var filterChain = function (initialData) {
    return initialData.filter(function (adv) {
      return checkAny(housingType) || adv.offer.housingType === housingType.value;
    }).filter(function (adv) {
      return checkPrice(adv.offer.housingPrice, housingPrice.value);
    }).filter(function (adv) {
      return checkAny(housingRooms) || adv.offer.housingRooms === Number(housingRooms.value);
    }).filter(function (adv) {
      return checkAny(housingGuests) || adv.offer.housingGuests === Number(housingGuests.value);
    });
  };

  var updatePins = function () {
    window.backend.data = filterChain(data);
    window.showCard();
    window.pin.renderPinMap(window.backend.data);
  };

  var onLoad = function (adverts) {
    data = adverts;
    updatePins();
  };

  window.backend.load(onLoad, window.backend.error);
  filtersContainer.addEventListener('change', updatePins);
})();
