'use strict';

(function() {
  let HASHTAGS_MAX = 5;
  let AMOUNT_MAX = 20;

  let hashtagsForm = document.querySelector('.upload-form-hashtags');
  let form = document.querySelector('.upload-form');

  // создание поле ошибки для hashtagForm
  function hashtagErrorNotice(...error) {
    let notice = document.createElement('ul');
    notice.classList.add('hashtag_notice');

    error.forEach(function(item) {
      if(item) {
        let message = document.createElement('li');
        message.textContent = item;
        notice.append(message);
      }
    });
    return notice;
  }

  // обработчик на отправку формы
  form.addEventListener('submit', function(evt) {
    evt.preventDefault();

    if(document.querySelector('.hashtag_notice')) {
      document.querySelector('.hashtag_notice').remove();
    }

    if(hashtagsForm.value !== '') {
      let resultChecking = checkHashtag(hashtagsForm.value);
      hashtagsForm.value = resultChecking.hashtags;

      if(resultChecking.hashtagLengthError || resultChecking.amountError) {
        let errorNotice = hashtagErrorNotice(resultChecking.hashtagLengthError, resultChecking.amountError);
        hashtagsForm.after(errorNotice);
        
        return false;
      }
    }

    window.backend.save(new FormData(form), function() {
      window.notice.succes();
      form.reset();
      window.hideFilter();
      document.querySelector('.upload-overlay').classList.add('hidden');
    }, window.notice.error);
  })

  // проверка hashtag
  function checkHashtag(hashtag) {
    let hashtagLengthError;
    let amountError;

    let hashArray = hashtag.split(' ').map(function(item) {
      if(item[0] !== '#') {
        return `#${item.toLowerCase()}`;
      }

      return item.toLowerCase();
    }).filter(function(item) {
      if(item === '#') {
        return false;
      }
      if(item.length > AMOUNT_MAX) {
        hashtagLengthError = `Количество символов в одном хэштеге не должно быть больше ${AMOUNT_MAX}!`;
      }
      return true;
    });

    let hashtagsUnique = window.utils.unique(hashArray);

    if(hashtagsUnique.length > HASHTAGS_MAX) {
      amountError = `Введите не больше ${HASHTAGS_MAX} хэштегов!`;
    }

    return {
      hashtags: hashtagsUnique.join(' '),
      amountError,
      hashtagLengthError
    }
  }
})();

