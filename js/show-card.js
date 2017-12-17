
'use strict';

(function () {

  // Function show/hide card

  window.showCard = function (pin, card) {
    var clientPins;
    var clientCards;

    var pinId = pin.getAttribute('id');
    var cardId = card.getAttribute('id');

    var popupClose = card.querySelector('.popup__close');

    // --- Action on closing the offer card ---
    var pinCloseClicker = function (cleanMap) {

      // if cleanMap is specifically handled on element OR enter key is pressed
      if (cleanMap.currentTarget === pin || cleanMap.keyCode === window.generic.ENTER_KEYCODE) {
        pin.classList.add('.map__pin--active');

        if (pinId === cardId) {
          card.classList.remove('hidden');
          popupClose.addEventListener('click', popupCloseClicker);
          popupClose.addEventListener('keydown', cardEnterCloser);
          document.addEventListener('keydown', cardEscCloser);
        }
      }

      // creates new array of pins
      clientPins = Array.from(document.querySelectorAll('.map__pin--user'));
      clientPins.forEach(function (it) {

        if (it.classList.contains('map__pin--active') && it !== pin) {
          it.classList.remove('map__pin--active');
        }
      });

      // creates new array of offer cards
      clientCards = Array.from(document.querySelectorAll('.popup'));
      clientCards.forEach(function (it) {
        if (!it.classList.contains('hidden') && it !== card) {
          it.classList.add('hidden');
        }
      });
    };

    var popupCloseClicker = function () {

      if (!window.generic.getClass(card, 'hidden') && window.generic.getClass(pin, 'map__pin--active')) {
        card.classList.add('hidden');
        pin.classList.remove('map__pin--active');

        popupClose.addEventListener('click', popupCloseClicker);
        popupClose.addEventListener('keydown', cardEnterCloser);
        document.removeEventListener('keydown', cardEscCloser);
      }
    };

    var cardEnterCloser = function (event) {

      if (event.keyCode === window.generic.ENTER_KEYCODE) {
        popupCloseClicker();
      }
    };

    var cardEscCloser = function (event) {

      if (event.keyCode === window.generic.ESC_KEYCODE) {
        popupCloseClicker();
      }
    };

    // Adding cleanMap listeners
    pin.addEventListener('click', pinCloseClicker);
  };
})();
