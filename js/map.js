'use strict';

(function () {

  // Find map, pins and forms
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');

  // Activation of pins and form
  var mouseupPageActivater = function (evt) {
    evt.preventDefault();

    var usersPins = document.querySelectorAll('.map__pins .hidden');
    window.generic.removeClassFromAll(usersPins, 'hidden');

    map.classList.remove('map--faded');

    noticeForm.classList.remove('notice__form--disabled');

    var fieldsets = noticeForm.querySelectorAll('fieldset');
    fieldsets.forEach(function (elem) {
      elem.disabled = false;
    });

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
})();
