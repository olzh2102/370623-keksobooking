'use strict';

(function () {
  window.synchronizeField = function (changedElement, dependentElement, changedValues, dependentValues, callback) {
    changedElement.addEventListener('change', function () {
      for (var i = 0; i < changedValues.length; i++) {
        if (changedElement.value === changedValues[i]) {
          callback(dependentElement, dependentValues[i]);
        }
      }
    });
  };
})();
