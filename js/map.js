'use strict';

(function () {
  // var PIN_SIZES = {width: 62, height: 82};

  // var COORDINATE_LIMITS = {bottom: 500, top: 100};

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

})();
