'use strict';

(function() {
  let hashtagsForm = document.querySelector('.upload-form-hashtags');
  let form = document.querySelector('.upload-form');

  form.addEventListener('submit', function(evt) {
    let hashtags = hashtagsForm.value;
    let resultChecking = checkHashtag(hashtags);

    if(resultChecking) {
      hashtagsForm.value = resultChecking.hashtags;
      if(resultChecking.lengthError) {
        evt.preventDefault();
      }
    }
  })

  function unique(arr) {
    let obj = {};

    for (let i = 0; i < arr.length; i++) {
      let str = arr[i];
      obj[str] = true; 
    }

    return Object.keys(obj); 
  }

  function checkHashtag(hashtag) {
    if(!hashtag) {
      return false;
    }

    let lengthError;
    let hashArray = hashtag.split(' ').map(function(item) {
      if(item[0] !== '#') {
        return `#${item.toLowerCase()}`;
      }
      return item.toLowerCase();
    });

    if(hashArray.length > 4) {
      lengthError = 'Введите не больше 5 хэштегов';
    }

    return {
      hashtags: unique(hashArray).join(' '),
      lengthError
    }
  }
})();

