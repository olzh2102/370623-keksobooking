'use strict';

(function () {
  window.showCard = function (button, card) {
    var clientPins;
    var clientCards;

    var buttonId = button.getAttribute('id');
    var cardId = card.getAttribute('id');

    var popupClose = card.querySelector('.popup__close');

    // Handlers

    var buttonClickHandler = function (evt) {

      if (evt.currentTarget === button || evt.keyCode === window.generic.ENTER_KEYCODE) {
        button.classList.add('map__pin--active');

        if (buttonId === cardId) {
          card.classList.remove('hidden');
          popupClose.addEventListener('click', cardCloseClickHandler);
          popupClose.addEventListener('keydown', cardEnterCloseHandler);
          document.addEventListener('keydown', cardEscCloseHandler);
        }
      }

      clientPins = Array.from(document.querySelectorAll('.map__pin--user'));
      clientPins.forEach(function (it) {
        if (it.classList.contains('map__pin--active') && it !== button) {
          it.classList.remove('map__pin--active');
        }
      });

      clientCards = Array.from(document.querySelectorAll('.popup'));
      clientCards.forEach(function (it) {

        if (!it.classList.contains('hidden') && it !== card) {
          it.classList.add('hidden');
        }
      });
    };

    var cardCloseClickHandler = function () {

      if (!card.classList.contains('hidden') && button.classList.contains('map__pin--active')) {
        card.classList.add('hidden');
        button.classList.remove('map__pin--active');
        popupClose.removeEventListener('click', cardCloseClickHandler);
        popupClose.removeEventListener('keydown', cardEnterCloseHandler);
        document.removeEventListener('keydown', cardEscCloseHandler);
      }
    };

    var cardEnterCloseHandler = function (evt) {

      if (evt.keyCode === window.generic.ENTER_KEYCODE) {
        cardCloseClickHandler();
      }
    };

    var cardEscCloseHandler = function (evt) {

      if (evt.keyCode === window.generic.ESC_KEYCODE) {
        cardCloseClickHandler();
      }
    };

    button.addEventListener('click', buttonClickHandler);
  };

})();
