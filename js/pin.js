'use strict';

(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;

  // Find map pins template
  var mapTemplate = document.querySelector('template').content.querySelector('.map__pin');

  window.pin = {
    // Create pin
    renderPinMap: function (pinMap) {
      var pinMapElement = mapTemplate.cloneNode(true);
      pinMapElement.querySelector('img').src = pinMap.author.avatar;
      pinMapElement.style.left = (pinMap.location.x + PIN_WIDTH / 2) + 'px';
      pinMapElement.style.top = (pinMap.location.y + PIN_HEIGHT) + 'px';
      pinMapElement.classList.add('map__pin--users');

      return pinMapElement;
    }
  };
})();
