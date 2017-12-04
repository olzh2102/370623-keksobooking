'use strict';

(function () {
  var AD_TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'];

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
  var AD_NUMBER = 8;

  // shuffle adTitles
  AD_TITLES.sort(window.generic.shuffleArray);

  // create an empty array
  var ads = [];

  // Generate ads data array
  window.data = function () {
    for (var i = 0; i < AD_NUMBER; i++) {
      var randomFeatures = AD_FEATURES.slice(0, window.generic.generateRandomNumber(1, AD_FEATURES.length));

      // position is placed outside to allow to insert offer.address and location.x / location.y
      var x = window.generic.generateRandomNumber(MIN_LOCATION_X, MAX_LOCATION_X);
      var y = window.generic.generateRandomNumber(MIN_LOCATION_Y, MAX_LOCATION_Y);

      ads[i] = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: AD_TITLES[i],
          address: x + ',' + y,
          price: window.generic.generateRandomNumber(PRICE_MIN, PRICE_MAX),
          type: window.generic.generateRandomObject(AD_RUS_TYPES),
          rooms: window.generic.generateRandomNumber(MIN_ROOM_NUMBER, MAX_ROOM_NUMBER),
          guests: window.generic.generateRandomNumber(MIN_GUEST_NUMBER, MAX_GUEST_NUMBER),
          checkin: window.generic.generateRandomElement(AD_CHECK_INS),
          checkout: window.generic.generateRandomElement(AD_CHECK_OUTS),
          features: randomFeatures,
          description: '',
          photos: []
        },
        location: {
          x: x,
          y: y
        }
      };
    }
  }();
  window.data = ads;
})();
