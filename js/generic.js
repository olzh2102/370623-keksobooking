'use strict';

(function () {

  window.generic = {
    selectOptionValue: function (select) {
      var selectOptions = select.querySelectorAll('option');
      var optionValue = null;
      var optionValues = [];

      for (var i = 0; i < selectOptions.length; i++) {
        optionValue = selectOptions[i].getAttribute('value');
        optionValues[i] = optionValue;
      }
      return optionValues;
    },

    findClass: function (element, className) {
      return element.classList.contains(className);
    },

    removeClassFromAll: function (array, className) {
      for (var i = 0; i < array.length; i++) {
        array[i].classList.remove(className);
      }
    },
    ESC_KEY: 27,
    ENTER_KEYCODE: 13,
  };
})();
