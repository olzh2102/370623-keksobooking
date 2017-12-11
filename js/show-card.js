
'use strict';

(function () {

  // Function show/hide card

  window.showCard = function (pins, cards) {

    var pinsClickHandler = function (evt) {
      for (var j = 0; j < pins.length; j++) {
        if (evt.currentTarget === pins[j] || evt.keyCode === window.generic.ENTER_KEYCODE) {
          pins[j].classList.add('map__pin--active');
          cards[j].classList.remove('hidden');
        }

        if (evt.currentTarget !== pins[j] && window.generic.findClass(pins[j], 'map__pin--active')) {
          pins[j].classList.remove('map__pin--active');
          cards[j].classList.add('hidden');
        }
      }
    };

    var cardCloseClickHandler = function () {
      for (var j = 0; j < cards.length; j++) {
        if (!window.generic.findClass(cards[j], 'hidden') && window.generic.findClass(pins[j], 'map__pin--active')) {
          cards[j].classList.add('hidden');
          pins[j].classList.remove('map__pin--active');
        }
      }
    };

    var cardEnterCloseHandler = function (evt) {
      if (evt.keyCode === window.generic.ENTER_KEYCODE) {
        cardCloseClickHandler();
      }
    };

    var cardEscCloseHandler = function (evt) {
      if (evt.keyCode === window.generic.ESC_KEY) {
        cardCloseClickHandler();
      }
    };

    // Adding event listeners

    (function () {
      var cardClose = null;

      for (var i = 0; i < pins.length; i++) {
        pins[i].addEventListener('click', pinsClickHandler);

        cardClose = cards[i].querySelector('.popup__close');
        cardClose.addEventListener('click', cardCloseClickHandler);
        cardClose.addEventListener('keydown', cardEnterCloseHandler);
      }
    })();

    document.addEventListener('keydown', cardEscCloseHandler);
  };
})();
