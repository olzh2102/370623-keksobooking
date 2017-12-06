'use strict';

(function () {
  var popup = document.querySelector('.popup');
  var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

  window.showCard = function (elem, i) {
    window.generic.showElement(elem);

    elem.addEventListener('click', function () {
      window.pin.removePinActive(mapPins);
      window.generic.showElement(popup);
      elem.classList.add('map__pin--active');
      window.card.outputMapCard(i);
      document.addEventListener('keydown', window.card.popupEscCloser);
    });
  };
})();
