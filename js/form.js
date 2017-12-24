'use strict';

(function () {
  // Form controls
  var CHECK_INS = ['12:00', '13:00', '14:00'];
  var CHECK_OUTS = ['12:00', '13:00', '14:00'];

  var HOUSE_TYPES = ['flat', 'bungalo', 'house', 'palace'];

  var HOUSE_TYPES_PRICE_VALUES = ['1000', '0', '5000', '10000'];

  var roomCapacity = {
    1: ['1'],
    2: ['2', '1'],
    3: ['3', '2', '1'],
    100: ['0']
  };

  var FORM_ERROR = 'red';
  var FROM_DEFAULT = '#d9d9d3';

  var MIN_LENGTH_TITLE = 30;
  var MAX_LENGTH_TITLE = 100;

  // Find needed elements
  var title = document.querySelector('#title');
  var address = document.querySelector('#address');
  var type = document.querySelector('#type');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var price = document.querySelector('#price');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  // Sync control values
  var syncValues = function (element, value) {
    element.value = value;
  };

  // Sync control values and min values
  var syncPrices = function (element, value) {
    element.value = value;
    element.min = value;
  };

  var syncCapacityAndRoomNum = function () {
    var guests = roomCapacity[roomNumber.value];
    capacity.value = guests[0];

    Array.from(capacity.options).forEach(function (element) {
      if (guests.includes(element.value)) {
        element.disabled = false;
      } else {
        element.disabled = true;
      }
    });
  };

  var syncRoomNumAndCapacity = function () {
    if (!roomCapacity[roomNumber.value].includes(capacity.value)) {
      for (var property in roomCapacity) {
        if (roomCapacity[property].includes(capacity.value)) {
          roomNumber.value = property;
          syncCapacityAndRoomNum();
          return;
        }
      }
    }
  };

  // Form controls values
  var setTimeIn = function () {
    window.synchronizeField(timeIn, timeOut, CHECK_INS, CHECK_OUTS, syncValues);
  };

  var setTimeOut = function () {
    window.synchronizeField(timeOut, timeIn, CHECK_OUTS, CHECK_INS, syncValues);
  };

  var setPrices = function () {
    window.synchronizeField(type, price, HOUSE_TYPES, HOUSE_TYPES_PRICE_VALUES, syncPrices);
  };

  // Set minimum prices init
  setPrices();

  // Sync form controls on user change
  timeIn.addEventListener('change', setTimeIn);
  timeOut.addEventListener('change', setTimeOut);
  type.addEventListener('change', setPrices);
  roomNumber.addEventListener('change', syncCapacityAndRoomNum);
  capacity.addEventListener('change', syncRoomNumAndCapacity);

  // Title control
  var controlTitle = function () {
    if (!title.validity.valid) {
      if (title.validity.tooShort) {
        title.setCustomValidity('Заголовок должен быть не менее ' + MIN_LENGTH_TITLE + ' символов');
      } else if (title.validity.tooLong) {
        title.setCustomValidity('Заголовок должен быть не более ' + MAX_LENGTH_TITLE + ' символов');
      } else if (title.validity.valueMissing) {
        title.setCustomValidity('Это поле должно быть заполнено');
      } else {
        title.setCustomValidity('');
      }
    } else {
      price.style.borderColor = FROM_DEFAULT;
      price.setCustomValidity('');
    }
  };

  // Price control
  var controlPrice = function () {
    if (price.validity.rangeUnderflow) {
      price.setCustomValidity('Цена не менее' + price.min);
    } else if (price.validity.rangeOverflow) {
      price.setCustomValidity('Цена не более' + price.min);
    } else if (price.validity.valueMissing) {
      price.setCustomValidity('Это поле должно быть заполнено');
    } else {
      price.setCustomValidity('');
    }
  };

  // Address control
  var controlAddress = function () {
    if (address.validity.valueMissing) {
      address.setCustomValidity('Это поле должно быть заполнено');
    } else {
      address.setCustomValidity('');
    }
  };

  var resetInvalidControlStyle = function (field) {
    field.tyle.borderColor = '';
  };

  // Title
  title.addEventListener('input', controlTitle);
  title.addEventListener('input', function () {
    resetInvalidControlStyle(title);
  });
  title.addEventListener('blur', function () {
    title.checkValidity();
  });

  // Price
  price.addEventListener('invalid', controlPrice);
  price.addEventListener('input', function () {
    resetInvalidControlStyle(title);
  });
  price.addEventListener('blur', function () {
    price.checkValidity();
  });

  // Address
  address.addEventListener('invalid', controlAddress);

  var noticeForm = document.querySelector('.notice__form');
  var noticeFormReset = document.querySelector('.form__reset');

  // Reset the form
  var resetForm = function (form) {
    var requiredControls = form.querySelectorAll('input[required]');

    form.reset();
    setPrices();
    window.setInitalCoord();

    requiredControls.forEach(function (element) {
      resetInvalidControlStyle(element);
    });
  };

  noticeForm.addEventListener('invalid', function (event) {
    var invalidControl = event.target;
    invalidControl.style.borderColor = FORM_ERROR;

    if (invalidControl.validity.valueMissing) {
      invalidControl.setCustomValidity('Это поле должно быть заполнено');
    }
  }, true);

  noticeFormReset.addEventListener('click', function (event) {
    event.preventDefault();
    resetForm(noticeForm);
  });

  // Submit
  noticeForm.addEventListener('submit', function (event) {
    event.preventDefault();

    window.backend.save(new FormData(noticeForm), function () {
      resetForm(noticeForm);
    }, window.backend.throwError);
  });
})();
