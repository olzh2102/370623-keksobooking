'use strict';

(function () {
  // var popup = document.querySelector('.popup');

  // Find card template
  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var cardMapElement = mapCardTemplate.cloneNode(true);

  // Create map offer card
  var generateRoomsGuestsString = function (rooms, guests) {
    var roomStr;
    if (rooms > 4) {
      roomStr = 'комнат';
    } else {
      roomStr = rooms === 1 ? ' комната' : ' комнаты';
    }
    var guestStr = guests === 1 ? ' гостя' : ' гостей';
    return rooms + roomStr + ' для ' + guests + guestStr;
  };
  var generateFeaturesString = function (features) {
    var featuresStr = '';
    features.forEach(function (item) {
      featuresStr += '<li class = "feature feature--' + item + '"></li>';
    });
    return featuresStr;
  };

  var renderCardMap = function (ad) {

    cardMapElement.querySelector('.popup__avatar').src = ad.author.avatar;
    cardMapElement.querySelector('h3').textContent = ad.offer.title;
    cardMapElement.querySelector('h3+p').textContent = ad.offer.address;
    cardMapElement.querySelector('.popup__price').textContent = ad.offer.price + '\u20bd/ночь';
    cardMapElement.querySelector('h4').textContent = ad.offer.type;
    cardMapElement.querySelector('h4+p').textContent = generateRoomsGuestsString(ad.offer.rooms, ad.offer.guests);
    cardMapElement.querySelector('p:nth-child(4)').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    cardMapElement.querySelector('.popup__features').innerHTML = '';
    cardMapElement.querySelector('.popup__features').innerHTML = generateFeaturesString(ad.offer.features);
    cardMapElement.querySelector('p:nth-of-type(5)').textContent = ad.offer.description;

    return cardMapElement;
  };


  window.card = {

    // Output map card offer
    outputMapCard: function (indexArr) {
      var target = document.querySelector('.map');
      var mapCardFragment = document.createDocumentFragment();
      mapCardFragment.appendChild(renderCardMap(window.data[indexArr]));

      return target.insertBefore(mapCardFragment, target.querySelector('.map__filters-container'));
    },

    popupCloser: function () {
      var popup = document.querySelector('.popup');
      var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

      window.generic.hideElement(popup);
      window.pin.removePinActive(mapPins);

      document.removeEventListener('keydown', window.card.popupEscCloser);
    },

    popupEscCloser: function (event) {
      window.generic.escEvent(event, function () {
        window.card.popupCloser();
      });
    }
  };
  // Output map card
  window.card.outputMapCard(0);
})();
