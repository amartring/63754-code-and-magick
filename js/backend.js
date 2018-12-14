'use strict';

(function () {
  var URL = {
    load: 'https://js.dump.academy/code-and-magick/data',
    save: 'https://js.dump.academy/code-and-magick'
  };
  var CONNECT_TIME = 10000;
  var TIME_UNIT = 'мс';
  var Code = {
    SUCCESS: 200,
    MOVED_PERMANENTLY: 301,
    FOUND: 302,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    SERVER: 500
  };
  var Error = {
    CONNECT: 'Произошла ошибка соединения',
    TIMEOUT: 'Запрос не успел выполниться за '
  };

  var tuneObject = function (object, callback) {
    object.responseType = 'json';
    object.addEventListener('load', function () {
      var error;
      switch (object.status) {
        case Code.SUCCESS:
          callback(object.response);
          break;
        case Code.MOVED_PERMANENTLY:
          error = 'Прощайте, неудачники, я сваливаю!';
          break;
        case Code.FOUND:
          error = 'У меня там ремонт, пока живу у соседа на диване.';
          break;
        case Code.BAD_REQUEST:
          error = 'Эм.. Что? Я не понимаю.. Что ты хочешь от меня?';
          break;
        case Code.UNAUTHORIZED:
          error = 'Позвольте, мы с Вами не знакомы!';
          break;
        case Code.NOT_FOUND:
          error = 'Упс! Все куда-то подевалось! О_о';
          break;
        case Code.SERVER:
          error = 'Тут такие дела.. Ты не виноват, но я поломался :(';
          break;

        default:
          error = 'Cтатус ответа: : ' + object.status + ' ' + object.statusText;
      }
      if (error) {
        onError(error);
      }
    });
  };

  var connectError = function (object) {
    object.addEventListener('error', function () {
      onError(Error.CONNECT);
    });
  };

  var timeoutError = function (object) {
    object.timeout = CONNECT_TIME;
    object.addEventListener('timeout', function () {
      onError(Error.TIMEOUT + object.timeout + TIME_UNIT);
    });
  };

  var load = function (onLoad) {
    var xhr = new XMLHttpRequest();

    tuneObject(xhr, onLoad);
    connectError(xhr);
    timeoutError(xhr);

    xhr.open('GET', URL.load);
    xhr.send();
  };

  var save = function (data, onLoad) {
    var xhr = new XMLHttpRequest();

    tuneObject(xhr, onLoad);
    connectError(xhr);
    timeoutError(xhr);

    xhr.open('POST', URL.save);
    xhr.send(data);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend = {
    load: load,
    save: save,
    onError: onError
  };
})();
