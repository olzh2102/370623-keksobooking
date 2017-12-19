'use strict';

(function () {
  var lastTimeout;

  window.debounce = function (fun, interval) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      fun();
    }, interval);
  };
})();
