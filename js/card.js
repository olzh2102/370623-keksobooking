'use strict';

(function () {
  var OFFER_PHOTO_WIDTH = 52;

  // Find card template
  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');


  // Room number's ending changes
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
  // --- Offer card generation (with photos) ---
  window.card = {
    renderCardMap: function (ad) {
      var cardMapElement = mapCardTemplate.cloneNode(true);
      cardMapElement.querySelector('.popup__avatar').src = ad.author.avatar;
      cardMapElement.querySelector('h3').textContent = ad.offer.title;
      cardMapElement.querySelector('small').textContent = ad.offer.address;
      cardMapElement.querySelector('.popup__price').textContent = ad.offer.price + '\u20bd/ночь';
      cardMapElement.querySelector('h4').textContent = ad.offer.type;
      cardMapElement.querySelector('h4+p').textContent = generateRoomsGuestsString(ad.offer.rooms, ad.offer.guests);
      cardMapElement.querySelector('p:nth-child(4)').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
      cardMapElement.querySelector('.popup__features').innerHTML = '';
      cardMapElement.querySelector('.popup__features').innerHTML = generateFeaturesString(ad.offer.features);
      cardMapElement.querySelector('p:nth-of-type(5)').textContent = ad.offer.description;
      cardMapElement.classList.add('hidden');
      ad.offer.photos.forEach(function (photoUrl) {
        var photo = document.createElement('img');
        photo.style.width = OFFER_PHOTO_WIDTH + 'px';
        photo.src = photoUrl;
        cardMapElement.querySelector('.popup__pictures').appendChild(photo);
      });

      return cardMapElement;
    }
  };
})();
