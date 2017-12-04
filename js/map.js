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

var AD_CHECK_INS = ['12:00', '13:00', '14:00'];
var AD_CHECK_OUTS = ['12:00', '13:00', '14:00'];

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

var ERROR_ON_VALIDATION = '0 0 5px 2px red';

var nearByAds;
var houseMinPrice = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

// Find map
var map = document.querySelector('.map');

// Find map pins div
var mapPinsItem = document.querySelector('.map__pins');

// Find map pin template
var mapTemplate = document.querySelector('template').content.querySelector('.map__pin');
// Find card template
var mapCardTemplate = document.querySelector('template').content.querySelector('article.map__card');
var cardMapElement = mapCardTemplate.cloneNode(true);

// Generate random number
var generateRandomNumber = function (max, min) {
  return Math.floor((max - min + 1) * Math.random()) + min;
};

// Generate random index of array
var generateRandomElement = function (array) {
  return array[generateRandomNumber(0, array.length)];
};

// Generate specific index of array
var generateSpecificNumber = function (array) {
  return array.splice(generateRandomNumber(0, array.length), 1).join('');
};

// Generate random order array
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

  // Shuffle titles array
  var adTitles = generateRandomArray(AD_TITLES, count);

  for (var i = 0; i < count; i++) {
    var randomFeatures = generateRandomArray(AD_FEATURES, 8);
    var x = generateRandomNumber(MIN_LOCATION_X, MAX_LOCATION_X);
    var y = generateRandomNumber(MIN_LOCATION_Y, MAX_LOCATION_Y);

    ads[i] = {
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
  }
  return ads;
};

// Create pin
var renderPinMap = function (pinMap) {
  var pinMapElement = mapTemplate.cloneNode(true);
  pinMapElement.querySelector('img').src = pinMap.author.avatar;
  pinMapElement.style.left = (pinMap.location.x + PIN_WIDTH / 2) + 'px';
  pinMapElement.style.top = (pinMap.location.y + PIN_HEIGHT) + 'px';

  return pinMapElement;
};

// Generate map-pins
var renderOtherAds = function () {
  nearByAds = generateAds(8);
  var fragment = document.createDocumentFragment();
  nearByAds.forEach(function (item) {
    fragment.appendChild(renderPinMap(item));
  });
  mapPinsItem.appendChild(fragment);
};

// Create card offer
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
  cardMapElement.querySelector('h4').textContent = AD_RUS_TYPES[ad.offer.type];
  cardMapElement.querySelector('h4+p').textContent = generateRoomsGuestsString(ad.offer.rooms, ad.offer.guests);
  cardMapElement.querySelector('p:nth-child(4)').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  cardMapElement.querySelector('.popup__features').innerHTML = '';
  cardMapElement.querySelector('.popup__features').innerHTML = generateFeaturesString(ad.offer.features);
  cardMapElement.querySelector('p:nth-of-type(5)').textContent = ad.offer.description;

  return cardMapElement;
};

// Output card offer
var renderCardOffer = function (offer) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(renderCardMap(offer));
  map.appendChild(fragment);
};

// Main pin
var pinMain = document.querySelector('.map__pin--main');
var noticeForm = document.querySelector('.notice__form');
var popup;
var closePopup;

// Map faded by default (pins are not shown / form is disabled)
var mapFaded = true;

// Page activator
var mouseupPageActivater = function () {
  if (mapFaded) {
    // Show map
    map.classList.remove('map--faded');
    renderOtherAds();
    // Activate notice form
    var fieldsets = noticeForm.querySelectorAll('fieldset');
    noticeForm.classList.remove('notice__form--disabled');
    // Remove attribute disable
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = false;
    }
    // Set to false, otherwise keeps adding pins on main pin press
    mapFaded = false;
  }
};

// Page activation on mouseup
pinMain.addEventListener('mouseup', mouseupPageActivater);

// Identify index of pins on map
var identifyIndex = function (src) {
  var index = null;
  nearByAds.forEach(function (item, i) {
    if (src.indexOf(item.author.avatar) >= 0) {
      index = i;
    }
  });
  return index;
};

// Opened card offer
var popupOpen = function (src) {
  // Identified index of pin
  var identificationIndex = identifyIndex(src);

  if (identificationIndex !== null) {
    // Creartes the card and its properties / events
    renderCardOffer(nearByAds[identificationIndex]);
    popup = document.querySelector('.popup');
    closePopup = popup.querySelector('.popup__close');
    closePopup.addEventListener('click', popupCloser);
    closePopup.addEventListener('keydown', popupEnterCloser);
    document.addEventListener('keydown', popupEscCloser);
  }
};

// Closed card offer
var popupClose = function () {
  // Finds pins with class active
  var pinActive = mapPinsItem.querySelector('.map__pin--active');

  if (pinActive) {
    pinActive.classList.remove('map__pin--active');
  }
  if (popup) {
    map.removeChild(popup);
    popup = null;
    closePopup.removeEventListener('click', popupCloser);
    document.removeEventListener('keydown', popupEscCloser);
    closePopup.removeEventListener('keydown', popupEnterCloser);
  }
};

// Events on click, enter, esc to close card offer
var popupCloser = function () {
  popupClose();
};
var popupEscCloser = function () {
  if (event.keyCode === ESC_KEY) {
    popupClose();
  }
};
var popupEnterCloser = function () {
  if (event.keyCode === ENTER_KEY) {
    popupClose();
  }
};

// Events on click, enter to open card offer on press map pin
var mapPinClicker = function (event) {
  // popupClose();

  if (event.target.parentNode.classList.contains('map__pin')) {
    event.target.parentNode.classList.add('map__pin--active');
    popupOpen(event.target.src);
  } else if (event.target.classList.contains('map__pin')) {
    event.target.classList.add('map__pin--active');
    popupOpen(event.target.children[0].src);
  }
};
var mapPinPresser = function (event) {
  if (event.keyCode === ENTER_KEY) {
    if (event.target.classList.contains('map__pin')) {
      event.target.parentNode.classList.add('map__pin--active');
      popupClose();
      event.target.classList.add('map__pin--active');
      popupOpen(event.target.children[0].src);
    }
  }
};

mapPinsItem.addEventListener('click', mapPinClicker);
mapPinsItem.addEventListener('keydown', mapPinPresser);

// Form validation
var title = document.querySelector('#title');
var address = document.querySelector('#address');
var price = document.querySelector('#price');

var validityChecker = function (field) {
  var currentField = field;

  if (!currentField.validity.valid) {
    currentField.style.boxShadow = ERROR_ON_VALIDATION;

    if (currentField.validity.valueMissing) {
      currentField.setCustomValidity('это поле должно быть заполненным');
    } else if (currentField.validity.tooShort || currentField.value.length < currentField.minLength) {
      currentField.setCustomValidity('название не может содержать менее ' + currentField.minLength + ' символов');
    } else if (currentField.validity.tooLong) {
      currentField.setCustomValidity('название не может содержать более ' + currentField.maxLength + ' символов');
    } else if (currentField.validity.rangeUnderflow) {
      currentField.setCustomValidity('число должно находится в диапазоне от ' + currentField.min + ' до ' + currentField.max);
    } else {
      currentField.setCustomValidity('');
      currentField.style.boxShadow = '';
    }
  }
};

title.addEventListener('input', function () {
  validityChecker(title);
});
title.addEventListener('change', function () {
  validityChecker(title);
});

address.addEventListener('invalid', function () {
  validityChecker(address);
});
address.addEventListener('change', function () {
  validityChecker(address);
});

price.addEventListener('invalid', function () {
  validityChecker(price);
});
price.addEventListener('change', function () {
  validityChecker(price);
});

// --- Зависимость ---
var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');
var type = document.querySelector('#type');
var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');
var submit = document.querySelector('.form__submit');

// --- Синхронизация времени въезда/выезда ---
var syncTimeInTimeOut = function (mainSelect, dependSelect) {
  dependSelect[mainSelect.selectedIndex].selected = true;
};
timeIn.addEventListener('change', function (event) {
  syncTimeInTimeOut(event.target, timeOut);
});
timeOut.addEventListener('change', function (event) {
  syncTimeInTimeOut(event.target, timeIn);
});

// --- Синхронизация типы домов и цены ---
var syncHousePrice = function (event) {
  price.min = houseMinPrice[event.target.value];

  if (+price.value < +price.min) {
    price.value = price.min;
  }
};

type.addEventListener('change', syncHousePrice);

// --- Синхронизация число комнат и гостей ---
var syncRoomGuest = function (event) {
  if (event.target.value === '2') {
    capacity.value = 2;
  } else if (event.target.value === '3') {
    capacity.value = 3;
  } else {
    capacity.value = 0;
  }
};

roomNumber.addEventListener('change', syncRoomGuest);

// --- Обработка события клика по submit ---
var formValidator = function () {
  var formFields = noticeForm.elements;
  var validAll = true;

  for (var i = 0; i < formFields.length; i++) {
    if (!formFields[i].validity.valid) {
      formFields[i].style.boxShadow = ERROR_ON_VALIDATION;
      validAll = false;
    } else {
      formFields[i].style.boxShadow = '';
    }
  }
  if (validAll) {
    noticeForm.submit();
    noticeForm.reset();
  }
};

submit.addEventListener('click', formValidator);
