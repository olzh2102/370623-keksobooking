'use strict';


(function () {
  var similarPins = [];

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var filtersContainer = map.querySelector('.map__filters-container');

  // --- Load clients' ads from server ---
  var getData = function (data) {
    similarPins = data;
  };

  window.backend.load(getData, window.backend.error);

  // --- Filtering pins ---
  var houseType = filtersContainer.querySelector('#housing-type');
  var housePrice = filtersContainer.querySelector('#housing-price');
  var roomsNumber = filtersContainer.querySelector('#housing-rooms');
  var guestsNumber = filtersContainer.querySelector('#housing-guests');
  var featuresFilter = filtersContainer.querySelector('#housing-features');

  // filtering by price range
  var priceRange = function (elem) {
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
  };

  // filtering by features
  var features = Array.from(featuresFilter.querySelectorAll('input[name="features"]'));
  var checkFeatureOptions = function (elem) {
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
  };

  var filterByValues = function (elem) {
    return (houseType.value === 'any' || elem.offer.type === houseType.value) && priceRange(elem)
    && (roomsNumber.value === 'any' || elem.offer.rooms === +roomsNumber.value)
    && (guestsNumber.value === 'any' || elem.offer.guests === +guestsNumber.value)
    && checkFeatureOptions(elem.offer.features);
  };

  var cleanMap = function () {
    var usersPins = document.querySelectorAll('.map__pin--user');
    var usersCards = document.querySelectorAll('.popup');

    for (var i = 0; i < usersPins.length; i++) {
      var pin = usersPins[i];
      var card = usersCards[i];

      mapPins.removeChild(pin);
      map.removeChild(card);
    }
  };

  var updateMap = function () {
    cleanMap();
    var filteredAds = similarPins.filter(filterByValues);
    window.data.completeMap(filteredAds);
  };

  // Debouncing
  filtersContainer.addEventListener('change', function () {
    window.debounce(updateMap, 500);
  });

  var setElemenetId = function (elem, number) {
    elem.setAttribute('id', 'user' + number);
  };

  window.data = {
    completeMap: function (array) { // window.data.completeMap() used in map
      var MAX_ADS = 5;

      array = array || similarPins;
      array = array.slice(0, MAX_ADS);

      for (var i = 0; i < array.length; i++) {
        var pin = window.pin.renderPinMap(array[i]);
        var card = window.card.renderCardMap(array[i]);

        setElemenetId(pin, i + 1);
        setElemenetId(card, i + 1);

        window.showCard(pin, card);

        mapPins.appendChild(pin);
        map.insertBefore(card, filtersContainer);
      }
    }
  };
})();
