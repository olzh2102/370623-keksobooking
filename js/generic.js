'use strict';

(function () {
  var ESC_KEY = 27;

  window.generic = {
    // checking whether ESC is pressed
    escEvent: function (event, action) {
      if (event.keyCode === ESC_KEY) {
        action();
      }
    },

    // Generate random number
    generateRandomNumber: function (max, min) {
      return Math.floor((max - min + 1) * Math.random()) + min;
    },

    // Shuffle array elements
    shuffleArray: function () {
      return Math.random() - 0.5;
    },

    // Generate random element of array
    generateRandomElement: function (array) {
      return array[window.generic.generateRandomNumber(0, array.length - 1)];
    },

    // Shuffle object
    generateRandomObject: function (obj) {
      var keys = Object.keys(obj);
      return obj[window.generic.generateRandomElement(keys)];
    },

    hideElement: function (target) {
      target.classList.add('hidden');
    },

    showElement: function (target) {
      target.classList.remove('hidden');
    },

    selectOptionValue: function (select) {
      var selectOptions = select.querySelectorAll('option');
      var optionValue = null;
      var optionValues = [];

      for (var i = 0; i < selectOptions.length; i++) {
        optionValue = selectOptions[i].getAttribute('value');
        optionValues[i] = optionValue;
      }
      return optionValues;
    }
  };
})();
