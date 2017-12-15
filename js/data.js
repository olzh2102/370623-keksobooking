'use strict';


(function () {

  // Load users ads

  var getData = function (data) {

    var ads = data;

    // Creating and appending ads to fragments

    var fragmentPins = document.createDocumentFragment();
    var fragmentCards = document.createDocumentFragment();
    var card;
    var pin;

    for (var i = 0; i < ads.length; i++) {
      card = window.pin.renderPinMap(ads[i]);
      pin = window.card.renderCardMap(ads[i]);

      card.setAttribute('id', 'user' + (i + 1));
      pin.setAttribute('id', 'user' + (i + 1));

      fragmentCards.appendChild(card);
      fragmentPins.appendChild(pin);
    }

    // Hiding elements

    var usersPins = fragmentPins.querySelectorAll('.map__pin--users');
    var usersCards = fragmentCards.querySelectorAll('.popup');

    // Adding class hidden to all pins and cards
    var addClass = function (array, classname) {
      for (var j = 0; j < array.length; j++) {
        array[j].classList.add(classname);
      }
    };
    addClass(usersCards, 'hidden');
    addClass(usersPins, 'hidden');

    // Add functions show/hide card

    window.showCard(usersPins, usersCards);

    // Add fragments into DOM

    var map = document.querySelector('.map');
    var mapPins = document.querySelector('.map__pins');
    var filtersContainer = map.querySelector('.map__filters-container');

    mapPins.appendChild(fragmentPins);
    map.insertBefore(fragmentCards, filtersContainer);

  };

  window.backend.load(getData, window.backend.error);

})();
