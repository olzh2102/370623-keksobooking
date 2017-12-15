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

    findVisibleElements: function (array) {
      var visibleArray = array.filter(function (elem) {
        var visibleElement = !elem.classList.contains('hidden');
        return visibleElement;
      });
      return visibleArray;
    },

    removeClassFromAll: function (array, className) {
      array.forEach(function (elem) {
        elem.classList.remove(className);
      });
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

    filterArrayByValue: function (array, option, value) {
      return array.filter(function (it) {
        return it.querySelector(option).textContent === value;
      }).map(function (it) {
        return it.getAttribute('id');
      });
    },

    filtersArrayByRange: function (array, option, min, max) {
      return array.filter(function (it) {
        var value = parseInt(it.querySelector(option).textContent, 10);
        return value > min && value <= max;
      }).map(function (it) {
        return it.getAttribute('id');
      });
    },

    checkElementId: function (array, element) {
      return array.some(function (it) {
        return it === element;
      });
    },

    compareArraysById: function (inputArray, filteredArray) {

      var output = inputArray.filter(function (it) {
        var itId = it.getAttribute('id');

        if (window.generic.checkElementId(filteredArray, itId)) {
          if (it.filtered === false) {
            return false;
          } else {
            it.filtered = true;

            if (it.classList.contains('hidden')) {
              it.classList.remove('hidden');
            }
            return it;
          }
        } else {
          it.filtered = false;

          if (!it.classList.contains('hidden')) {
            it.classList.add('hidden');
          }
          return false;
        }

      });
      console.dir(output);
    },

    getFilteredArray: function (array) {
      array = window.generic.compareArraysById();
      return array;
    },

    ESC_KEY: 27,
    ENTER_KEYCODE: 13,
  };
})();
