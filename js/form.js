'use strict';

(function() {
  let HASHTAG_MAX = 4;

  let hashtagsForm = document.querySelector('.upload-form-hashtags');
  let form = document.querySelector('.upload-form');

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

  form.addEventListener('submit', function(evt) {
    evt.preventDefault();

    if(document.querySelector('.hashtag_notice')) {
      document.querySelector('.hashtag_notice').remove();
    }

    if(hashtagsForm.value !== '') {
      let resultChecking = checkHashtag(hashtagsForm.value);
      hashtagsForm.value = resultChecking.hashtags;

      if(resultChecking.hashtagLength || resultChecking.lengthError) {
        let errorNotice = hashtagErrorNotice(resultChecking.hashtagLength, resultChecking.lengthError);
        hashtagsForm.after(errorNotice);
        
        return false;
      }
    }

    window.backend.save(new FormData(form), function() {
      window.notice.succes();
    }, window.notice.error);
  })

  // проверка hashtag
 
  function checkHashtag(hashtag) {
    if(!hashtag) {
      return false;
    }
    let hashtagLength;

    let hashArray = hashtag.split(' ').map(function(item) {
      if(item[0] !== '#') {
        let it = `#${item.toLowerCase()}`;

        return it;
      }

      return item.toLowerCase();
    }).filter(function(item) {
      if(item === '#') {
        return false;
      }else if(item.length > 21) {
        hashtagLength = 'Количество символов в одном хэштеге не должно быть больше 20!';
      }
      return true;
    });

    let lengthError;
    let hashtagsUnique = window.utils.unique(hashArray);

    if(hashtagsUnique.length > HASHTAG_MAX) {
      lengthError = 'Введите не больше 5 хэштегов!';
    }

    return {
      hashtags: hashtagsUnique.join(' '),
      lengthError,
      hashtagLength
    }
  }
})();

