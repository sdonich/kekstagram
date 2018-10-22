'use strict';

(function (global) {
  let ERROR_CODE = 400;
  let TIME = {
    error: 2000,
    succes: 700
  };
  let NOTICE_TEXT = {
    whoop: 'Oops! Ошибка',
    internetConnection: 'Произошла ошибка соединения с сервером. Проверьте интернет-соединение',
    mismatchError: 'Ваши данные не соответсвуют требованиям',
    loadDataError: 'Данные пользователей не подгрузились',
    loadDataSucces: 'Ваши данные успешно отправлены'
  };

  function creatNotice(time) {
    let note = document.createElement('div');
    let substrate = document.createElement('div');

    document.body.appendChild(substrate);    
    document.body.appendChild(note);

    note.classList.add('descript_notice');
    substrate.classList.add('substrate_notice');

    setTimeout(function () {
      note.remove();
      substrate.remove();
    }, time);
  }

  function error(error) {
    creatNotice(TIME.error);
    let note = document.querySelector('.descript_notice');

    if (error.code === 0 || !error.code) {
      note.textContent = NOTICE_TEXT.internetConnection;
    } else if (error.code === ERROR_CODE) {
      note.textContent = `${NOTICE_TEXT.whoop}: ${error.code}. ${NOTICE_TEXT.mismatchError}`;
    } else {
      note.textContent = `${NOTICE_TEXT.whoop}: ${error.code}. ${NOTICE_TEXT.loadDataError}`;
    }
  };

  function succes() {
    creatNotice(TIME.succes);

    let note = document.querySelector('.descript_notice');
    note.textContent = NOTICE_TEXT.loadDataSucces;
  };

  global.notice = {
    error,
    succes
  };

})(window);
