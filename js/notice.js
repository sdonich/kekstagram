'use strict';

(function (global) {
  let ERROR_CODE = 400;
  let TIME = 2000;

  function error(error) {
    let note = document.createElement('div');
    let substrate = document.createElement('div');

    document.body.appendChild(substrate);    
    document.body.appendChild(note);

    note.classList.add('descript_notice');
    substrate.classList.add('substrate_notice');


    if (error.code === 0 || !error.code) {
      note.textContent = 'Произошла ошибка соединения с сервером. Проверьте интернет-соединение';
    } else if (error.code === ERROR_CODE) {
      note.textContent = `Ошибка ${error.code}. Ваши данные не соответсвуют требованиям`;
    } else {
      note.textContent = `Oops! Произошла ошибка: ${error.code}. Данные пользователей не подгрузились`;
    }

    setTimeout(function () {
      note.remove();
      substrate.remove();
    }, TIME);
  };

  function succes() {
    // let note = document.createElement('div');

    // document.body.appendChild(note);
    // note.classList.add('descript__notice');
    // note.textContent = 'Ваши данные успешно отправлены';

    // setTimeout(function () {
    //   note.remove();
    // }, TIME);
    console.log('succes');
  };

  function reset() {
    // let note = document.createElement('div');

    // document.body.appendChild(note);
    // note.classList.add('descript__notice');
    // note.textContent = 'Введенные данные сброшены';

    // setTimeout(function () {
    //   note.remove();
    // }, TIME);

    console.log('reset');

  };

  global.notice = {
    error,
    succes,
    reset
  };

})(window);
