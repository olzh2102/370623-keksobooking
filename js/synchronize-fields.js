'use strict';

(function () {
  window.synchronizeField = function (changedElement, dependentElement, changedValues, dependentValues, callback) {
    if (typeof callback === 'function') {
      var indexOfValue = changedValues.indexOf(changedElement.value);
      callback(dependentElement, dependentValues[indexOfValue]);
    }
  };
})();
