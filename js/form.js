'use strict';

(function () {
  var ERROR_ON_VALIDATION = '0 0 5px 2px red';

  var houseMinPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  // --- Валидация формы ---
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
  // var submit = document.querySelector('.form__submit');

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
  /*
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
   */
})();
