'use strict';

(function () {
  window.backend = {
    load: function (onLoad, onError) {
      var URL = 'https://1510.dump.academy/keksobooking/data';
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          console.log(xhr);
          onLoad(xhr.response);
        } else {
          onError(xhr.status + ': ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Неуспешное выполнение запроса. Попробуйте обновить страницу и повторить запрос.');
      });
      xhr.addEventListener('timeout', function () {
        onError('Время ожидания соединения исктекло.');
      });

      xhr.timeout = 7000;
      xhr.open('GET', URL);
      xhr.send();
    },

    save: function (data, onLoad, onError) {
      var URL = 'https://1510.dump.academy/keksobooking/data';
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad();
        } else {
          onError(xhr.status + ': ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Неуспешное выполнение запроса. Попробуйте обновить страницу и повторить запрос.');
      });
      xhr.addEventListener('timeout', function () {
        onError('Время ожидания соединения исктекло.');
      });

      xhr.timeout = 7000;
      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
