'use strict';

(function () {

  // Find map, pins and forms
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');

  var MAX_PINS = 5;

  // Activation of pins and form
  var mouseupPageActivater = function (evt) {
    evt.preventDefault();

    if (map.classList.contains('map--faded')) {
      var userPins = document.querySelectorAll('.map__pin--user');
      var userCards = document.querySelectorAll('.popup');

      map.classList.remove('map--faded');
      noticeForm.classList.remove('notice__form--disabled');

      var fieldsets = noticeForm.querySelectorAll('fieldset');
      fieldsets.forEach(function (elem) {
        elem.disabled = false;
      });

      window.generic.removeClassFromRandom(userPins, 'hidden', MAX_PINS);
      window.showCard(userPins, userCards);
    }
    pinMain.removeEventListener('mouseup', mouseupPageActivater);
  };

  pinMain.addEventListener('mouseup', mouseupPageActivater);

  // Draggable pin
  var PIN_SIZES = {width: 62, height: 82};
  var COORDINATE_LIMITS = {bottom: 500, top: 100};

  var address = document.querySelector('#address');
  pinMain.style.zIndex = 100;

  var dragPinLimits = {
    minX: 0,
    minY: COORDINATE_LIMITS.top - PIN_SIZES.height / 2,
    maxX: map.clientWidth,
    maxY: COORDINATE_LIMITS.bottom - PIN_SIZES.height / 2
  };

  // Identify initial coordinates
  var addressFieldCoord = {
    x: pinMain.offsetLeft,
    y: pinMain.offsetTop
  };

  // Set initial coordinates into address field
  address.value = 'x: ' + addressFieldCoord.x + ', ' + 'y: ' + (addressFieldCoord.y + PIN_SIZES.height / 2);

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startingCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMover = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startingCoords.x - moveEvt.clientX,
        y: startingCoords.y - moveEvt.clientY
      };

      startingCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      // Identify new coordinates
      addressFieldCoord = {
        x: pinMain.offsetLeft - shift.x,
        y: pinMain.offsetTop - shift.y
      };

      if ((addressFieldCoord.x >= dragPinLimits.minX && addressFieldCoord.x <= dragPinLimits.maxX) &&
      (addressFieldCoord.y >= dragPinLimits.minY && addressFieldCoord.y <= dragPinLimits.maxY)) {
        pinMain.style.left = addressFieldCoord.x + 'px';
        pinMain.style.top = addressFieldCoord.y + 'px';

        // Set new coordinates into address field
        address.value = 'x: ' + addressFieldCoord.x + ', ' + 'y: ' + (addressFieldCoord.y + PIN_SIZES.height / 2);
      }


    };

    var mouseUper = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMover);
      document.removeEventListener('moveup', mouseUper);
    };

    document.addEventListener('mousemove', mouseMover);
    document.addEventListener('mouseup', mouseUper);

  });

  // Filter
  var filtersContainer = document.querySelector('.map__filters-container');
  var mapFilters = Array.from(filtersContainer.querySelectorAll('.map-filter'));
  var houseType = filtersContainer.querySelector('#housing-type');
  var housePrice = filtersContainer.querySelector('#housing-price');
  var roomsNumber = filtersContainer.querySelector('#housing-rooms');
  var guestsNumber = filtersContainer.querySelector('#housing-guests');
  var featuresFilter = filtersContainer.querySelector('#housing-features');

  houseType.addEventListener('change', function () {
    var usersPinsArray = Array.from(document.querySelectorAll('.map__pin--user'));
    var usersCardsArray = Array.from(document.querySelectorAll('.popup'));

    switch (houseType.value) {
      case 'flat':
        var flatUsersById = window.generic.filterArrayByValue(usersCardsArray, 'h4', 'Квартира');
        window.generic.compareArraysById(usersPinsArray, flatUsersById);
        break;

      case 'house':
        var houseUsersById = window.generic.filterArrayByValue(usersCardsArray, 'h4', 'Дом');
        window.generic.compareArraysById(usersPinsArray, houseUsersById);
        break;

      case 'bungalo':
        var bungaloUsersById = window.generic.filterArrayByValue(usersCardsArray, 'h4', 'Лачуга');
        window.generic.compareArraysById(usersPinsArray, bungaloUsersById);
        break;

      case 'any':
        var visiblePins = window.generic.findVisibleElements(usersPinsArray);
        window.generic.removeClassFromRandom(usersPinsArray, 'hidden', (MAX_PINS - visiblePins.length));
        break;
    }
  });

  housePrice.addEventListener('change', function () {
    var usersPinsArray = Array.from(document.querySelectorAll('.map__pin--user'));
    var usersCardsArray = Array.from(document.querySelectorAll('.popup'));

    switch (housePrice.value) {
      case 'middle':
        var middlePriceId = window.generic.filtersArrayByRange(usersCardsArray, '.popup__price', 10000, 50000);
        window.generic.compareArraysById(usersPinsArray, middlePriceId);
        break;

      case 'low':
        var lowPriceId = window.generic.filtersArrayByRange(usersCardsArray, '.popup__price', 0, 10000);
        window.generic.compareArraysById(usersPinsArray, lowPriceId);
        break;

      case 'high':
        var highPriceId = window.generic.filtersArrayByRange(usersCardsArray, '.popup__price', 50000, 100000);
        window.generic.compareArraysById(usersPinsArray, highPriceId);
        break;

      case 'any':
        var visiblePins = window.generic.findVisibleElements(usersPinsArray);
        window.generic.removeClassFromRandom(usersPinsArray, 'hidden', (MAX_PINS - visiblePins.length));
        break;
    }
  });
})();
