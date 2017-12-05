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

    mapPins.forEach(function (elem, i) {
      window.generic.showElement(elem);

      elem.addEventListener('click', function () {
        window.pin.removePinActive(mapPins);
        window.generic.showElement(popup);
        elem.classList.add('map__pin--active');
        window.card.outputMapCard(i);
        document.addEventListener('keydown', window.card.popupEscCloser);
      });
    });
  };

  // Activate forms and pins on mouseup action
  pinMain.addEventListener('mouseup', mouseupPageActivater);

  // Close popup
  closePopup.addEventListener('click', window.card.popupCloser);

  // Draggable pin
  var address = document.querySelector('#address');

  pinMain.style.zIndex = 2;

  var draggingLimit = {
    xMin: 0,
    xMax: map.clientWidth,
    yMin: COORDINATE_LIMITS.top - PIN_SIZES.height / 2,
    yMax: COORDINATE_LIMITS.bottom - PIN_SIZES.height / 2,
  };

  // Identify initial coordinates
  var addressFieldCoord = {
    x: pinMain.offsetLeft,
    y: pinMain.offsetTop
  };

  // Display initial coordinates of main pin of address fieldset
  address.value = 'x: ' + addressFieldCoord.x + ' , ' + 'y: ' + (addressFieldCoord.y + PIN_SIZES.height / 2);

  pinMain.addEventListener('mousedown', function (event) {
    event.preventDefault();

    var startingCoords = {
      x: event.clientX,
      y: event.clientY
    };

    var mouseMover = function (moveEvent) {
      moveEvent.preventDefault();

      var shift = {
        x: startingCoords.x - moveEvent.clientX,
        y: startingCoords.y - moveEvent.clientY
      };

      startingCoords = {
        x: moveEvent.clientX,
        y: moveEvent.clientY
      };

      // Identify new coordinates for address field
      addressFieldCoord = {
        x: pinMain.offsetLeft - shift.x,
        y: pinMain.offsetTop - shift.y
      };

      if ((addressFieldCoord.x >= draggingLimit.xMin && addressFieldCoord.x <= draggingLimit.xMax) && (addressFieldCoord.y >= draggingLimit.yMin && addressFieldCoord.y <= draggingLimit.yMax)) {
        pinMain.style.left = addressFieldCoord.x + 'px';
        pinMain.style.top = addressFieldCoord.y + 'px';

        // Write identified coordinates to address field
        address.value = 'x: ' + addressFieldCoord.x + ' , ' + 'y: ' + (addressFieldCoord.y + PIN_SIZES.height / 2);
      }
    };

    var mouseUper = function (upEvent) {
      upEvent.preventDefault();

      document.removeEventListener('mousemove', mouseMover);
      document.removeEventListener('moveup', mouseUper);
    };

    document.addEventListener('mouseup', mouseMover);
    document.addEventListener('moveup', mouseUper);
  });
})();
