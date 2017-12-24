'use strict';

(function () {
  var lastTimeout;

  window.debounce = function (func, interval) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      func();
    }, interval);
  };
})();
