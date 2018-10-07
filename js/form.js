'use strict';

(function() {
  // let uploadFile = document.querySelector('.upload-input');
  // let pictureEditor = document.querySelector('.upload-overlay');
  // let closePictureEditor = document.querySelector('.upload-form-cancel');

  // function filterSaturation(filter, value) {
  //   let index = (filterPreview[filter].max * value) / 100;

  //   return `${filterPreview[filter].set}(${index}${filterPreview[filter].unit})`;
  // }

  // let filterPreview = {
  //   'grayscale': {
  //     set: `grayscale`,
  //     max: 1,
  //     unit: ' ',
  //     startValue: 0
  //   },
  //   'sepia': {
  //     set: `sepia`,
  //     max: 1,
  //     unit: ' ',
  //     startValue: 0
  //   } ,
  //   'invert': {
  //     set: `invert`,
  //     max: 100,
  //     unit: '%',
  //     startValue: 0
  //   } ,
  //   'blur': {
  //     set: `blur`,
  //     max: 3,
  //     unit: 'px',
  //     startValue: 0
  //   },
  //   'brightness': {
  //     set: `brightness`,
  //     max: 3,
  //     unit: ' ',
  //     startValue: 33
  //   },
  //   'original': 'none'
  // };

 
  // let filters = document.querySelectorAll('.upload-effect-label');
  // let pinLine = document.querySelector('.upload-effect-level-line');
  // let pin = document.querySelector('.upload-effect-level-pin');
  // let valLine = document.querySelector('.upload-effect-level-val');
  // let filterAttribute = filterPreview.original;
  // let imagePreview = document.querySelector('.effect-image-preview');
  // let filterEditorLine = document.querySelector('.upload-effect-level');



  // function getCoords(elem) {
  //   let box = elem.getBoundingClientRect();

  //   return {
  //     left: box.left,
  //     right: box.right
  //   };
  // }
  // function getPercent(value, max) {
  //   let receivedValue = value * 100 / max;
  //   return Math.round(receivedValue);
  // }

  // uploadFile.addEventListener('change', function() {
  //   pictureEditor.classList.remove('hidden');
  //   pin.style.left = '0px';
  //   valLine.style.width = '0%';
    

  //   function closePictureHandler() {
  //     pictureEditor.classList.add('hidden');
  //     pin.removeEventListener('mousedown', mouseDown);
  //     closePictureEditor.removeEventListener('click', closePictureHandler);
  //   }

  //   function mouseDown(evt) {
  //     evt.preventDefault();

  //     let line = getCoords(pinLine);
  //     let valueMax = line.right - line.left;
      
  //     function mouseMove(moveEvt) {
  //       moveEvt.preventDefault();

  //       let shiftX = moveEvt.pageX - line.left;
  //       if(shiftX < 0) {
  //         shiftX = 0;
  //       }

  //       if (shiftX > valueMax) {
  //         shiftX = valueMax;
  //       }

  //       pin.style.left = `${shiftX}px`;
  //       let value = getPercent(shiftX, valueMax);

  //       valLine.style.width = `${value}%`;

  //       imagePreview.style.filter = filterSaturation(filterAttribute, value);
  //     };
      
  //     function mouseUp(evtUp) {
  //       evtUp.preventDefault();
  //       document.removeEventListener('mousemove', mouseMove);
  //       document.removeEventListener('mouseup', mouseUp);
  //       return false;
  //     }  

  //     document.addEventListener('mousemove', mouseMove);
  //     document.addEventListener('mouseup', mouseUp);
  //     return false;
  //   }

  //   for(let i = 0; i < filters.length; i++) {
  //     filters[i].addEventListener('click', filtersHandler);
  //   }

  //   closePictureEditor.addEventListener('click', closePictureHandler);
  //   pin.addEventListener('mousedown', mouseDown); 
  // });

  // function filtersHandler(evt) {
  //   let preview = evt.target;

  //   pin.style.left = '0px';
  //   valLine.style.width = '0%';

  //   filterEditorLine.style.display = 'block';


  //   filterAttribute = preview.getAttribute('filter');
  //   if(filterAttribute === 'original') {
  //     imagePreview.style.filter = 'none';
  //     filterEditorLine.style.display = 'none';
  //   }else if(filterAttribute === 'brightness') {
  //     imagePreview.style.filter = filterSaturation(filterAttribute, filterPreview[filterAttribute].startValue);
  //     pin.style.left = '150px';
  //     valLine.style.width = '33%';
  //   }else{
  //     imagePreview.style.filter = filterSaturation(filterAttribute, filterPreview[filterAttribute].startValue);
  //   }
  // }

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

