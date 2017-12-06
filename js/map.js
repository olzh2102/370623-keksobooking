'use strict';

(function () {
  var PIN_SIZES = {width: 62, height: 82};

  var COORDINATE_LIMITS = {bottom: 500, top: 100};

  // Find map
  var map = document.querySelector('.map');

  // Main map pin
  var pinMain = document.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');
  var popup = document.querySelector('.popup');
  var closePopup = document.querySelector('.popup__close');

  // Find all pins excluding pin-main
  var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  mapPins.forEach(function (elem) {
    window.generic.hideElement(elem);
  });

  // Hidden by default
  window.generic.hideElement(popup);

  // Activation of pins and form
  var mouseupPageActivater = function () {
    // show the map
    map.classList.remove('map--faded');

    // active motice form
    noticeForm.classList.remove('notice__form--disabled');

    // activate form
    var fieldsets = noticeForm.querySelectorAll('fieldset');
    fieldsets.forEach(function (elem) {
      elem.disabled = false;
    });

    mapPins.forEach(window.showCard/* function (elem, i) {
      window.generic.showElement(elem);

      elem.addEventListener('click', function () {
        window.pin.removePinActive(mapPins);
        window.generic.showElement(popup);
        elem.classList.add('map__pin--active');
        window.card.outputMapCard(i);
        document.addEventListener('keydown', window.card.popupEscCloser);
      });
    } */);
  };

  // Activate forms and pins on mouseup action
  pinMain.addEventListener('mouseup', mouseupPageActivater);

  // Close popup
  closePopup.addEventListener('click', window.card.popupCloser);

  // Draggable pin
  var address = document.querySelector('#address');
  pinMain.style.zIndex = 2;

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
})();
