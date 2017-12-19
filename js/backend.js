'use strict';

(function () {
  window.backend = {
    load: function (onLoad, onError) {
      var URL = 'https://1510.dump.academy/keksobooking/data';
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          // console.log(xhr);
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
      var URL = 'https://1510.dump.academy/keksobooking';
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
    },

    error: function (message) {
      var errorBlock = document.createElement('div');

      errorBlock.style.width = 50 + '%';
      errorBlock.style.height = 120 + 'px';
      errorBlock.style.position = 'fixed';
      errorBlock.style.top = 50 + '%';
      errorBlock.style.left = 50 + '%';
      errorBlock.style.transform = 'translate(-50%, -50%)';
      errorBlock.style.zIndex = 5;
      errorBlock.style.display = 'flex';
      errorBlock.style.alignItems = 'center';
      errorBlock.style.justifyContent = 'center';
      errorBlock.style.border = '3 px solid red';
      errorBlock.textContent = message;
      document.body.insertAdjacentElement('afterbegin', errorBlock);
    },
  };
})();
