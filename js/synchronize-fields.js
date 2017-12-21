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
    dependentElement.addEventListener('change', function () {
      for (var i = 0; i < dependentValues.length; i++) {
        if (dependentElement.value === dependentValues[i]) {
          callback(changedElement, changedValues[i]);
        }
      }
    });
  };
})();
