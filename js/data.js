'use strict';


(function () {

  var similarAds = [];
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var filtersContainer = map.querySelector('.map__filters-container');

  // Load users ads

  var getData = function (data) {

    similarAds = data;

    // Creating and appending ads to fragments

    var fragmentPins = document.createDocumentFragment();
    var fragmentCards = document.createDocumentFragment();
    var MAX_ADS = 5;
    var card;
    var pin;

    for (var i = 0; i < MAX_ADS.length; i++) {
      card = window.pin.renderPinMap(similarAds[i]);
      pin = window.card.renderCardMap(similarAds[i]);

      card.setAttribute('id', 'user' + (i + 1));
      pin.setAttribute('id', 'user' + (i + 1));

      fragmentCards.appendChild(card);
      fragmentPins.appendChild(pin);
    }

    // Hiding elements

    var usersPins = fragmentPins.querySelectorAll('.map__pin--users');
    var usersCards = fragmentCards.querySelectorAll('.popup');

    // Adding class hidden to all pins and cards
    var addClass = function (array, classname) {
      for (var j = 0; j < array.length; j++) {
        array[j].classList.add(classname);
      }
    };
    addClass(usersCards, 'hidden');
    addClass(usersPins, 'hidden');

    // Add functions show/hide card

    window.showCard(usersPins, usersCards);

    // Add fragments into DOM

    var map = document.querySelector('.map');
    window.mapPins = document.querySelector('.map__pins');
    var filtersContainer = map.querySelector('.map__filters-container');

    window.mapPins.appendChild(fragmentPins);
    map.insertBefore(fragmentCards, filtersContainer);

  };

  window.backend.load(getData, window.backend.error);

  var filtersContainer = document.querySelector('.map__filters-container');
  var mapFilters = Array.from(filtersContainer.querySelectorAll('.map-filter'));
  var houseType = filtersContainer.querySelector('#housing-type');
  var housePrice = filtersContainer.querySelector('#housing-price');
  var roomsNumber = filtersContainer.querySelector('#housing-rooms');
  var guestsNumber = filtersContainer.querySelector('#housing-guests');
  var featuresFilter = filtersContainer.querySelector('#housing-features');

  var priceRange = function (elem) {
    switch (housePrice.value) {
      case 'low':
        return elem.offer.price < 1000;
      case 'middle':
        return elem.offer.price >= 1000 && elem.offer.price <= 10000;
      case 'high':
        return elem.offer.price > 10000;
    }
    return false;
  };

  var filterByValues = function (elem) {
    return (houseType.value === 'any' || elem.offer.type === houseType.value) && priceRange(elem)
    && (roomsNumber.value === 'any' || elem.offer.rooms === roomsNumber.value)
    && (guestsNumber.value === 'any' || elem.offer.guests === guestsNumber.value);
  };

  var clearMap = function () {
    var usersPins = document.querySelectorAll('.map__pin--user');

    usersPins.forEach(function (it) {
      window.mapPins.removeChild(it);
    });
  };

  filtersContainer.addEventListener('change', function () {
    clearMap();
    similarAds.filter(filterByValues).forEach(window.pin.renderPinMap);
  });
})();
