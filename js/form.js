'use strict';

(function () {
  // Find validation form
  var noticeForm = document.querySelector('.notice__form');

  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncPrices = function (element, value) {
    element.value = value;
    element.min = value;
  };

  // Sync timein and timeout
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var timeInOptions = window.generic.selectOptionValue(timeIn);
  var timeOutOptions = window.generic.selectOptionValue(timeOut);

  window.synchronizeField(timeIn, timeOut, timeInOptions, timeOutOptions, syncValues);

  // Sync flat type and price
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');
  var flatType = window.generic.selectOptionValue(type);
  var priceValues = ['1000', '0', '5000', '10000'];

  window.synchronizeField(type, price, flatType, priceValues, syncPrices);

  // Sync room and guest number
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

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

  // Submit and reset buttons
  noticeForm.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!formValidator()) {
      addInvalid(noticeForm.elements);
    } else {
      noticeForm.submit();
      noticeForm.reset();
    }
  });

  noticeForm.addEventListener('change', function (event) {
    if (event.target.checkValidity()) {
      event.target.style.border = null;
    }
  });

  var formValidator = function () {
    for (var i = 0; i < noticeForm.length; i++) {
      if (noticeForm.elements[i].checkValidity()) {
        return false;
      }
    }
    return true;
  };

  var addInvalid = function (array) {
    for (var i = 0; i < array.length; i++) {
      if (!array[i].validity.valid) {
        array[i].style.border = '2px solid red';
      }
    }
  };

})();
