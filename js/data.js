'use strict';


(function () {
  var similarPins = [];

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var filtersContainer = map.querySelector('.map__filters-container');

  // --- Load clients' ads from server ---
  var getData = function (data) {
    similarPins = data;
  };

  window.backend.load(getData, window.backend.error);

  var cleanMap = function () {
    var usersPins = document.querySelectorAll('.map__pin--user');
    var usersCards = document.querySelectorAll('.popup');

    for (var i = 0; i < usersPins.length; i++) {
      var pin = usersPins[i];
      var card = usersCards[i];

      mapPins.removeChild(pin);
      map.removeChild(card);
    }
  };

  var updateMap = function () {
    cleanMap();
    var filteredAds = similarPins.filter(window.pin.filterByValues);
    window.data.completeMap(filteredAds);
  };

  // Debouncing
  filtersContainer.addEventListener('change', function () {
    window.debounce(updateMap, 500);
  });

  var setElemenetId = function (elem, number) {
    elem.setAttribute('id', 'user' + number);
  };

  window.data = {
    completeMap: function (array) { // window.data.completeMap() used in map
      var MAX_ADS = 5;

      array = array || similarPins;
      array = array.slice(0, MAX_ADS);

      for (var i = 0; i < array.length; i++) {
        var pin = window.pin.renderPinMap(array[i]);
        var card = window.card.renderCardMap(array[i]);

        setElemenetId(pin, i + 1);
        setElemenetId(card, i + 1);

        window.showCard(pin, card);

        mapPins.appendChild(pin);
        map.insertBefore(card, filtersContainer);
      }
    }
  };
})();
