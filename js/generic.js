'use strict';

(function () {

  window.generic = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,

    // used in show-card
    getClass: function (elem, className) {
      return elem.classList.contains(className);
    },

    setErrorPopupTimeout: function (popup, interval) {
      setTimeout(function () {
        popup.remove();
      }, interval);
    }
  };
})();
