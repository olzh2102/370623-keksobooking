'use strict';

(function () {

  window.generic = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,

    // used in form
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

    // used in show-card
    getClass: function (elem, className) {
      return elem.classList.contains(className);
    },
  };
})();
