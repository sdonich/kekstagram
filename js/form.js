'use strict';

(function() {
  let uploadFile = document.querySelector('.upload-input');
  let pictureEditor = document.querySelector('.upload-overlay');
  let closePictureEditor = document.querySelector('.upload-form-cancel');

  function filterSaturation(max) {
    let x = 80;
    let index = (max * x) / 100;

    return index;
  }

  let filterPreview = {
    'grayscale': `grayscale(${filterSaturation(1)})`,
    'sepia': `sepia(${filterSaturation(1)})`,
    'invert': `invert(${filterSaturation(100)}%)`,
    'blur': `blur(${filterSaturation(3)}px)`,
    'brightness': `brightness(${filterSaturation(3)})`,
    'original': 'none'
  };

  let filters = document.querySelectorAll('.upload-effect-label');
  let pin = document.querySelector('.upload-effect-level-pin');
  let pinBox = document.querySelector('.upload-effect-level');

  function getCoords(elem) {
    let box = elem.getBoundingClientRect();

    return {
      left: box.left
    };
  }

  uploadFile.addEventListener('change', function() {
    pictureEditor.classList.remove('hidden');
    pin.style.left = '0px';

    function closePictureHandler() {
      pictureEditor.classList.add('hidden');
      pin.removeEventListener('mousedown', mouseDown);
      closePictureEditor.removeEventListener('click', closePictureHandler);
    }

    pin.ondragstart = function() {
      return false;
    };

    function mouseDown(evt) {
      evt.preventDefault();

      let thumbCoords = getCoords(pin);
      let sliderCoords = getCoords(pinBox);
      // console.log(thumbCoords.left);
      // console.log(sliderCoords.left);
      console.log(pin.getBoundingClientRect().left);


      
      let shiftX = pin.clientWidth;
      console.log(shiftX);

      function mouseMove(moveEvt) {
        moveEvt.preventDefault();
        console.log(pin.getBoundingClientRect().left);


        let newLeft = moveEvt.pageX - shiftX - sliderCoords.left;
        // console.log(sliderCoords.left);
        // console.log(newLeft);

        if(newLeft < 0) {
          newLeft = 0;
        }

        // let rightEdge = pinBox.clientWidth - shiftX;
        let rightEdge = 455;
        
        // console.log(pinBox.offsetWidth);
        // console.log(pinBox.clientWidth);

        // console.log(pin.offsetWidth);

        if (newLeft > rightEdge) {
          newLeft = rightEdge;
        }
        pin.style.left = `${newLeft}px`;
      };
      
      function mouseUp(evtUp) {
        evtUp.preventDefault();
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
        return false;
      }  

      document.addEventListener('mousemove', mouseMove);
      document.addEventListener('mouseup', mouseUp);
      return false;
    }

    for(let i = 0; i < filters.length; i++) {
      filters[i].addEventListener('click', filtersHandler);
    }

    closePictureEditor.addEventListener('click', closePictureHandler);
    pin.addEventListener('mousedown', mouseDown); 
  });

  function filtersHandler(evt) {
    let imagePreview = document.querySelector('.effect-image-preview');
    let preview = evt.target;
    let attribute = preview.getAttribute('filter');
    
    imagePreview.style.filter = `${filterPreview[attribute]}`;
  }

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

