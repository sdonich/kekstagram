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
  
  let pinValue = document.querySelector('.upload-effect-level-value');
  let pinLine = document.querySelector('.upload-effect-level-line');
  let pin = document.querySelector('.upload-effect-level-pin');
  let lineValue = document.querySelector('.upload-effect-level-val');
  let pinDiv = document.querySelector('.upload-effect-level');

  uploadFile.addEventListener('change', function() {
    pictureEditor.classList.remove('hidden');
    pin.style.left = '0%';
    // console.log(pin.getBoundingClientRect().right);
    console.log(pin.clientWidth);

    function closePictureHandler() {
      pictureEditor.classList.add('hidden');
      pin.removeEventListener('mousedown', mouseDown);
      closePictureEditor.removeEventListener('click', closePictureHandler);
    }

    function mouseDown() {
      let startCoordsX = pin.getBoundingClientRect().left;
      // console.log(pinLine.getBoundingClientRect().left);
      // console.log(pinLine.getBoundingClientRect().right);
      // console.log(pin.getBoundingClientRect().left);
      console.log(pinLine.clientWidth);
      // console.log(pin.style.left);



      function mouseMove(moveEvt) {
        let shiftX = moveEvt.clientX - startCoordsX;
        startCoordsX = moveEvt.clientX;

        if(pin.offsetLeft + shiftX < pinLine.clientWidth) {
          pin.style.left = `${pin.offsetLeft + shiftX}px`;
        }
          // console.log(pin.offsetLeft + shiftX);
        // }else{
        //   // moveEvt.stopPropagation();
        //   // mouseUp();
         
        //   // console.log((pinLine.clientWidth + pinLine.getBoundingClientRect().left) + pin.clientWidth / 2);
        //   // console.log(pin.getBoundingClientRect().right);

        // }  

        
        // console.log(pin.style.left);
        // console.log(pin.offsetLeft + shiftX);
        // console.log(pinLine.getBoundingClientRect().right);
        // console.log(pin.getBoundingClientRect().right);
        

      }
      function mouseUp(evtUp) {
        evtUp.preventDefault();
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
      }

      document.addEventListener('mousemove', mouseMove);
      document.addEventListener('mouseup', mouseUp);
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

