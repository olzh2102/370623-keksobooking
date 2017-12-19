'use strict';

(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;

  var map = document.querySelector('.map');
  var filtersContainer = map.querySelector('.map__filters-container');
  var houseType = filtersContainer.querySelector('#housing-type');
  var housePrice = filtersContainer.querySelector('#housing-price');
  var roomsNumber = filtersContainer.querySelector('#housing-rooms');
  var guestsNumber = filtersContainer.querySelector('#housing-guests');
  var featuresFilter = filtersContainer.querySelector('#housing-features');

  var features = Array.from(featuresFilter.querySelectorAll('input[name="features"]'));

  // Find map pins template
  var mapTemplate = document.querySelector('template').content.querySelector('.map__pin');
  // --- Pin generation ---
  window.pin = {
    renderPinMap: function (pinMap) {
      var pinMapElement = mapTemplate.cloneNode(true);
      pinMapElement.querySelector('img').src = pinMap.author.avatar;
      pinMapElement.style.left = (pinMap.location.x + PIN_WIDTH / 2) + 'px';
      pinMapElement.style.top = (pinMap.location.y + PIN_HEIGHT) + 'px';
      pinMapElement.classList.add('map__pin--user');

      return pinMapElement;
    },

    // filtering by price range
    priceRange: function (elem) {
      switch (housePrice.value) {
        case 'low':
          return elem.offer.price < 10000;
        case 'middle':
          return elem.offer.price >= 10000 && elem.offer.price <= 50000;
        case 'high':
          return elem.offer.price > 50000;
        case 'any':
          return elem;
      }
      return false;
    },

    // filtering by features

    checkFeatureOptions: function (elem) {
      var checkedFeatures = features.filter(function (input) {
        return input.checked;
      });
      var checkedFeaturesValues = checkedFeatures.map(function (inputChecked) {
        return inputChecked.value;
      });
      var isContain = function (it) {
        return elem.indexOf(it) !== -1;
      };
      return checkedFeatures === 'undefined' || checkedFeaturesValues.every(isContain);
    },

    filterByValues: function (elem) {
      return (houseType.value === 'any' || elem.offer.type === houseType.value) && window.pin.priceRange(elem)
      && (roomsNumber.value === 'any' || elem.offer.rooms === +roomsNumber.value)
      && (guestsNumber.value === 'any' || elem.offer.guests === +guestsNumber.value)
      && window.pin.checkFeatureOptions(elem.offer.features);
    }
  };
})();
