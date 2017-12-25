'use strict';

(function () {
  /*
  var OFFER_PHOTO_WIDTH = 52;
  var OFFER_PHOTO_HEIGHT = 52;

  var houseTypes = {
    'flat': 'Квартира',
    'bungalo': 'Лачуга',
    'house': 'Дом',
    'palace': 'Дворец'
  };

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

  var Card = function (ad) {
    this.element = mapCardTemplate.cloneNode(true);
    this.element.querySelector('.popup__avatar').src = ad.author.avatar;
    this.element.querySelector('h3').textContent = ad.offer.title;
    this.element.querySelector('small').textContent = ad.offer.address;
    this.element.querySelector('.popup__price').textContent = ad.offer.price + '\u20bd/ночь';
    this.element.querySelector('h4').textContent = houseTypes[ad.offer.type];
    this.element.querySelector('h4+p').textContent = generateRoomsGuestsString(ad.offer.rooms, ad.offer.guests);
    this.element.querySelector('p:nth-child(4)').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    this.element.querySelector('.popup__features').innerHTML = '';
    this.element.querySelector('.popup__features').innerHTML = generateFeaturesString(ad.offer.features);
    this.element.querySelector('p:nth-of-type(5)').textContent = ad.offer.description;
    this.element.querySelector('.popup__pictures').appendChild(this.createPhotosList(ad.offer.photos));
    this.element.classList.add('hidden');
  };

  Card.prototype.createPhotosList = function (array) {
    var photosFragment = document.createDocumentFragment();
    array.forEach(function (imageSrc) {
      var image = document.createElement('img');
      image.src = imageSrc;
      image.style.width = OFFER_PHOTO_WIDTH;
      image.style.height = OFFER_PHOTO_HEIGHT;
      photosFragment.appendChild(image);
    });

    return photosFragment;
  };

  window.card = {
    generate: function (obj) {
      var card = new Card(obj);

      return card;
    }
  };
  */

  var OFFER_PHOTO_WIDTH = 52;
  var OFFER_PHOTO_HEIGHT = 52;

  var houseTypes = {
    'flat': 'Квартира',
    'bungalo': 'Лачуга',
    'house': 'Дом',
    'palace': 'Дворец'
  };

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
    generate: function (ad) {
      var cardMapElement = mapCardTemplate.cloneNode(true);
      cardMapElement.querySelector('.popup__avatar').src = ad.author.avatar;
      cardMapElement.querySelector('h3').textContent = ad.offer.title;
      cardMapElement.querySelector('small').textContent = ad.offer.address;
      cardMapElement.querySelector('.popup__price').textContent = ad.offer.price + '\u20bd/ночь';
      cardMapElement.querySelector('h4').textContent = houseTypes[ad.offer.type];
      cardMapElement.querySelector('h4+p').textContent = generateRoomsGuestsString(ad.offer.rooms, ad.offer.guests);
      cardMapElement.querySelector('p:nth-child(4)').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
      cardMapElement.querySelector('.popup__features').innerHTML = '';
      cardMapElement.querySelector('.popup__features').innerHTML = generateFeaturesString(ad.offer.features);
      cardMapElement.querySelector('p:nth-of-type(5)').textContent = ad.offer.description;
      cardMapElement.classList.add('hidden');
      var templatePhotos = cardMapElement.querySelector('.popup__pictures');
      ad.offer.photos.forEach(function (photoUrl) {
        var photo = document.createElement('img');
        photo.style.width = OFFER_PHOTO_WIDTH + 'px';
        photo.style.height = OFFER_PHOTO_HEIGHT + 'px';
        photo.src = photoUrl;
        templatePhotos.appendChild(photo);
      });

      return cardMapElement;
    }
  };
})();
