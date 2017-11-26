'use strict';

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
var map = document.querySelector('.map');
map.classList.remove('.map--faded');
var mapPinsItem = document.querySelector('.map__pins');
var mapTemplate = document.querySelector('template').content.querySelector('.map__pin');
var mapCardTemplate = document.querySelector('template').content.querySelector('article.map__card');

// --- Генерация случайных данных в данном диапазоне ---
var generateRandomNumber = function (max, min) {
  return Math.floor((max - min + 1) * Math.random()) + min;
};

// --- Генерация случайного элемента массива ---
var generateRandomElement = function (array) {
  return array[generateRandomNumber(0, array.length - 1)];
};

// --- Генерация специфического элемента массива ---
var generateSpecificNumber = function (array) {
  return array.splice(generateRandomNumber(0, array.length - 1), 1);
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

  for (var i = 0; i < count; i++) {
    var randomFeatures = generateRandomArray(AD_FEATURES, 8);
    var x = generateRandomNumber(MIN_LOCATION_X, MAX_LOCATION_X);
    var y = generateRandomNumber(MIN_LOCATION_Y, MAX_LOCATION_Y);

    var ad = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: AD_TITLES[i],
        address: x + ',' + y,
        price: generateRandomNumber(PRICE_MIN, PRICE_MAX),
        type: generateRandomElement(AD_TYPES),
        rooms: generateRandomNumber(MIN_ROOM_NUMBER, MAX_ROOM_NUMBER),
        guests: generateRandomNumber(MIN_GUEST_NUMBER, MAX_GUEST_NUMBER),
        checkin: generateRandomElement(AD_CHECK_INS),
        checkout: generateRandomElement(AD_CHECK_OUTS),
        features: randomFeatures.slice(0, generateRandomNumber(1, AD_FEATURES.length)),
        description: [],
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
    roomStr = rooms === 1 ? ' комната' : 'комнаты';
  }
  var guestStr = guests === 1 ? ' гостя' : 'гостей';
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
  var pinMapImgElement = pinMapElement.querySelector('img');
  var mapPinX = (+pinMapImgElement.getAttribute('width') + PIN_WIDTH) / 2;
  var mapPinY = +pinMapImgElement.getAttribute('height') + PIN_HEIGHT;

  pinMapElement.setAttribute('style', 'left: ' + (pinMap.x - mapPinX) + 'px; top: ' + (pinMap.y - mapPinY) + 'px;');
  pinMapImgElement.setAttribute('src', pinMap.author.avatar);

  return pinMapElement;
};

// --- рендер карточки объявлений ---
var renderCardMap = function (ad) {
  var cardMapElement = mapCardTemplate.cloneNode(true);
  cardMapElement.querySelector('.popup__avatar').src = ad.author.avatar;
  cardMapElement.querySelector('h3').textContent = ad.offer.title;
  cardMapElement.querySelector('h3+p').textContent = ad.offer.address;
  cardMapElement.querySelector('popup__price').textContent = ad.offer.price + '\u20bd/ночь';
  cardMapElement.querySelector('h4').textContent = AD_RUS_TYPES[ad.offer.type];
  cardMapElement.querySelector('h4+p').textContent = generateRoomsGuestsString(ad.offer.rooms, ad.offer.guests);
  cardMapElement.querySelector('p:nth-child(4)').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  cardMapElement.querySelector('.popup__features').innerHTML = '';
  cardMapElement.querySelector('.popup__features').appendChild(generateFeaturesString(ad.offer.features));
  cardMapElement.querySelector('p:nth-of-type(5)').textContent = ad.offer.description;

  return cardMapElement;
};

var renderCardOffer = function (offer) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(renderCardMap(offer));
  map.appendChild(fragment);
};

var renderOtherAds = function () {
  var nearByAds = generateAds(8);
  var fragment = document.createDocumentFragment();
  nearByAds.forEach(function (item) {
    fragment.appendChild(renderPinMap(item));
  });
  mapPinsItem.appendChild(fragment);
  renderCardOffer(nearByAds[0]);
};

renderOtherAds();
