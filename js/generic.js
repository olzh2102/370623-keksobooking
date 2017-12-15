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

    addClassToRandom: function (array, className, number) {
      for (var i = 0; i < number; i++) {
        var randomIndex = Math.floor(Math.random() * array.length);
        array[randomIndex].classList.add(className);
      }
    },

    removeClassFromRandom: function (array, className, number) {
      for (var i = 0; i < number; i++) {
        if (i < array.length) {
          var randomIndex = Math.floor(Math.random() * array.length);
          if (array[randomIndex].classList.contains(className)) {
            array[randomIndex].classList.remove(className);
          } else {
            i--;
          }
        } else {
          break;
        }
      }
    },
    ESC_KEY: 27,
    ENTER_KEYCODE: 13,
  };
})();
