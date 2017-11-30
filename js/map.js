'use strict';
var ESC_KEY = 27;
var ENTER_KEY = 13;

var AD_TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'];

var AD_TYPES = [
  'flat',
  'house',
  'bungalo'];
var AD_RUS_TYPES = {
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

var AD_CHECK_INS = [
  '12:00',
  '13:00',
  '14:00'];
var AD_CHECK_OUTS = [
  '12:00',
  '13:00',
  '14:00'];

var AD_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'];

var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;

var MIN_LOCATION_X = 300;
var MAX_LOCATION_X = 900;

var MIN_LOCATION_Y = 100;
var MAX_LOCATION_Y = 500;

var MIN_ROOM_NUMBER = 1;
var MAX_ROOM_NUMBER = 5;

var MIN_GUEST_NUMBER = 1;
var MAX_GUEST_NUMBER = 10;

var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;

// --- Управление DOM-элементами ---

var mapPinsItem = document.querySelector('.map__pins');
var mapTemplate = document.querySelector('template').content.querySelector('.map__pin');
var mapCardTemplate = document.querySelector('template').content.querySelector('article.map__card');
var pinMain = document.querySelector('.map__pin--main');
var map = document.querySelector('.map');
var noticeForm = document.querySelector('.notice__form');

var nearByAds;
var popup;
var popupClose;
var mapFaded = true;

// --- Активация главной страницы нажатием пина ---
var mouseupPageActivater = function () {
  if (mapFaded) {
    map.classList.remove('map--faded');
    renderOtherAds();
    var fieldsets = noticeForm.querySelectorAll('fieldset');
    noticeForm.classList.remove('notice__form--disabled');

    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = false;
    }
  }
};

pinMain.addEventListener('mouseup', mouseupPageActivater);

// --- Генерация случайных данных в данном диапазоне ---
var generateRandomNumber = function (max, min) {
  return Math.floor((max - min + 1) * Math.random()) + min;
};

// --- Генерация случайного элемента массива ---
var generateRandomElement = function (array) {
  return array[generateRandomNumber(0, array.length)];
};

// --- Генерация специфического элемента массива ---
var generateSpecificNumber = function (array) {
  return array.splice(generateRandomNumber(0, array.length), 1).join('');
};

// --- Случайны порядок элементов массива ---
var generateRandomArray = function (source, length) {
  length = length || source.length;
  var array = source.slice();
  var result = [];
  while (--length > 0) {
    if (!array.length) {
      array = source.slice();
    }
    result.push(generateSpecificNumber(array));
  }
  return result;
};

// --- Создание объявления ---
var generateAds = function (count) {
  var ads = [];
  var adTitles = generateRandomArray(AD_TITLES, count);

  for (var i = 0; i < count; i++) {
    var randomFeatures = generateRandomArray(AD_FEATURES, 8);
    var x = generateRandomNumber(MIN_LOCATION_X, MAX_LOCATION_X);
    var y = generateRandomNumber(MIN_LOCATION_Y, MAX_LOCATION_Y);

    var ad = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: generateSpecificNumber(adTitles),
        address: x + ',' + y,
        price: generateRandomNumber(PRICE_MIN, PRICE_MAX),
        type: generateRandomElement(AD_TYPES),
        rooms: generateRandomNumber(MIN_ROOM_NUMBER, MAX_ROOM_NUMBER),
        guests: generateRandomNumber(MIN_GUEST_NUMBER, MAX_GUEST_NUMBER),
        checkin: generateRandomElement(AD_CHECK_INS),
        checkout: generateRandomElement(AD_CHECK_OUTS),
        features: randomFeatures.slice(0, generateRandomNumber(1, AD_FEATURES.length)),
        description: '',
        photos: []
      },
      location: {
        x: x,
        y: y
      }
    };
    ads[i] = ad;
  }
  return ads;
};

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

// --- рендер ПИНА ---
var renderPinMap = function (pinMap) {
  var pinMapElement = mapTemplate.cloneNode(true);
  pinMapElement.querySelector('img').src = pinMap.author.avatar;
  pinMapElement.style.left = (pinMap.location.x + PIN_WIDTH / 2) + 'px';
  pinMapElement.style.top = (pinMap.location.y + PIN_HEIGHT) + 'px';

  return pinMapElement;
};

// --- рендер карточки объявлений ---
var renderCardMap = function (ad) {
  var cardMapElement = mapCardTemplate.cloneNode(true);
  cardMapElement.querySelector('.popup__avatar').src = ad.author.avatar;
  cardMapElement.querySelector('h3').textContent = ad.offer.title;
  cardMapElement.querySelector('h3+p').textContent = ad.offer.address;
  cardMapElement.querySelector('.popup__price').textContent = ad.offer.price + '\u20bd/ночь';
  cardMapElement.querySelector('h4').textContent = AD_RUS_TYPES[ad.offer.type];
  cardMapElement.querySelector('h4+p').textContent = generateRoomsGuestsString(ad.offer.rooms, ad.offer.guests);
  cardMapElement.querySelector('p:nth-child(4)').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  cardMapElement.querySelector('.popup__features').innerHTML = '';
  cardMapElement.querySelector('.popup__features').innerHTML = generateFeaturesString(ad.offer.features);
  cardMapElement.querySelector('p:nth-of-type(5)').textContent = ad.offer.description;

  return cardMapElement;
};

var renderCardOffer = function (offer) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(renderCardMap(offer));
  map.appendChild(fragment);
};

var renderOtherAds = function () {
  nearByAds = generateAds(8);
  var fragment = document.createDocumentFragment();
  nearByAds.forEach(function (item) {
    fragment.appendChild(renderPinMap(item));
  });
  mapPinsItem.appendChild(fragment);
};
