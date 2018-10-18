'use strict';

(function() {
  let HASHTAG_MAX = 4;

  let hashtagsForm = document.querySelector('.upload-form-hashtags');
  let form = document.querySelector('.upload-form');

  form.addEventListener('submit', function(evt) {
    evt.preventDefault();

    let resultChecking = checkHashtag(hashtagsForm.value);
    console.log(resultChecking);

    
    hashtagsForm.value = resultChecking.hashtags;
    

    // let xxx = new FormData(form);
    // for (let key of xxx.values()) {
    //   console.log(key);
    // }
  })

  // formNotice.addEventListener('submit', function (evt) {
  //   evt.preventDefault();

  //   window.backend.save(new FormData(formNotice), function () {
  //     window.notice.succes();
  //     resetSet();
  //   },
  //   window.notice.error);
  // });

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
        hashtagLength = 'Количество символов в одном хэштеге не должно быть больше 20';
      }
      return true;
    });

    let lengthError;
    let hashtagsUnique = window.utils.unique(hashArray);

    if(hashtagsUnique.length > HASHTAG_MAX) {
      lengthError = 'Введите не больше 5 хэштегов';
    }

    return {
      hashtags: hashtagsUnique.join(' '),
      lengthError,
      hashtagLength
    }
  }
})();

