'use strict';

(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;

  // Find map pins template
  var mapTemplate = document.querySelector('template').content.querySelector('.map__pin');

  // Find map pins div
  var mapPinsItem = document.querySelector('.map__pins');
  var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

  // Create pin
  var renderPinMap = function (pinMap) {
    var pinMapElement = mapTemplate.cloneNode(true);
    pinMapElement.querySelector('img').src = pinMap.author.avatar;
    pinMapElement.style.left = (pinMap.location.x + PIN_WIDTH / 2) + 'px';
    pinMapElement.style.top = (pinMap.location.y + PIN_HEIGHT) + 'px';

    return pinMapElement;
  };

  window.pin = {
    hidePins: function () {
      mapPins.forEach(function (elem) {
        window.generic.hideElement(elem);
      });
    },

    removePinActive: function (arr) {
      arr.forEach(function (elem) {
        elem.classList.remove('map__pin--active');
      });
    },

    // Generate map pins
    generateMapPins: function () {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < window.data.length; i++) {
        fragment.appendChild(renderPinMap(window.data[i]));
      }
      return mapPinsItem.appendChild(fragment);
    }(),
  };
})();
