'use strict';

(function () {
  var PIN_SIZES = {
    width: 62,
    height: 82
  };

  var COORDINATE_LIMITS = {
    bottom: 500,
    top: 100
  };

  var map = document.querySelector('.map');

  var DRAG_PIN_LIMITS = {
    minX: 0,
    minY: COORDINATE_LIMITS.top - PIN_SIZES.height / 2,
    maxX: map.clientWidth,
    maxY: COORDINATE_LIMITS.bottom - PIN_SIZES.height / 2
  };

  // Find map, pins and form
  var pinMain = map.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');

  // --- Activation of pins and form ---
  var mouseupPageActivater = function (evt) {
    evt.preventDefault();

    if (map.classList.contains('map--faded')) {
      // Shows the map
      map.classList.remove('map--faded');
      // Shows the form
      noticeForm.classList.remove('notice__form--disabled');
      // Activates the form
      var fieldsets = noticeForm.querySelectorAll('fieldset');
      fieldsets.forEach(function (elem) {
        elem.disabled = false;
      });
      // Completes the map with pins of 5
      window.data.completeMap();
    }
    pinMain.removeEventListener('mouseup', mouseupPageActivater);
  };

  pinMain.addEventListener('mouseup', mouseupPageActivater);

  // --- Moving of main pin ---
  var address = document.querySelector('#address');
  pinMain.style.zIndex = 100;

  // Identify initial coordinates
  var addressFieldCoord = {
    x: pinMain.offsetLeft,
    y: pinMain.offsetTop
  };

  // Set initial coordinates into address field
  window.setInitalCoord = function () {
    address.value = 'x: ' + addressFieldCoord.x + ', ' + 'y: ' + (addressFieldCoord.y + PIN_SIZES.height / 2);
  };
  window.setInitalCoord();

  // Action on starting dragging main pin
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

      if ((addressFieldCoord.x >= DRAG_PIN_LIMITS.minX && addressFieldCoord.x <= DRAG_PIN_LIMITS.maxX) &&
      (addressFieldCoord.y >= DRAG_PIN_LIMITS.minY && addressFieldCoord.y <= DRAG_PIN_LIMITS.maxY)) {
        pinMain.style.left = addressFieldCoord.x + 'px';
        pinMain.style.top = addressFieldCoord.y + 'px';

        // Set new coordinates into address field
        address.value = 'x: ' + addressFieldCoord.x + ', ' + 'y: ' + (addressFieldCoord.y + PIN_SIZES.height / 2);
      }


    };
    // Action on mouseup
    var mouseUper = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMover);
      document.removeEventListener('moveup', mouseUper);
    };

    document.addEventListener('mousemove', mouseMover);
    document.addEventListener('mouseup', mouseUper);

  });
})();
