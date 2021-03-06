'use strict';

(function(global) {
  let TIME_SHOW = 100;

  let uploadFile = document.querySelector('.upload-input');
  let uploadContainer = document.querySelector('.upload-effect__container');
  let filterValue = document.querySelector('.upload-effect-level-value');
  let pictureEditor = document.querySelector('.upload-overlay');
  let closePictureEditor = document.querySelector('.upload-form-cancel');

  function filterSaturation(filter, value) {
    let index = (filterPreview[filter].max * value) / 100;

    filterValue.value = index;
    return `${filterPreview[filter].set}(${index}${filterPreview[filter].unit})`;
  }

  let filterPreview = {
    'grayscale': {
      set: `grayscale`,
      max: 1,
      unit: ' ',
      startValue: 0
    },
    'sepia': {
      set: `sepia`,
      max: 1,
      unit: ' ',
      startValue: 0
    } ,
    'invert': {
      set: `invert`,
      max: 100,
      unit: '%',
      startValue: 0
    } ,
    'blur': {
      set: `blur`,
      max: 3,
      unit: 'px',
      startValue: 0
    },
    'brightness': {
      set: `brightness`, 
      max: 3,
      unit: ' ',
      startValue: 33
    },
    'original': 'none'
  };

  //фильтры
  let filters = document.querySelectorAll('.upload-effect-label');
  let filterAttribute = filterPreview.original;
  let imagePreview = document.querySelector('.effect-image-preview');

  //бегунок
  let filterEditorLine = document.querySelector('.upload-effect-level');
  let pinLine = document.querySelector('.upload-effect-level-line');
  let pin = document.querySelector('.upload-effect-level-pin');
  let valLine = document.querySelector('.upload-effect-level-val');

  //изменение редактора фильтра
  function setFilter(evt) {
    let line = window.utils.getCoords(pinLine);
    let valueMax = line.right - line.left;
    let shiftX = evt.pageX - line.left;

    if(shiftX < 0) {
      shiftX = 0;
    }

    if (shiftX > valueMax) {
      shiftX = valueMax;
    }

    pin.style.left = `${shiftX}px`;
    let value = window.utils.getPercent(shiftX, valueMax);
    valLine.style.width = `${value}%`;
    imagePreview.style.filter = filterSaturation(filterAttribute, value);
  }

  //скрыть редактор фильтра
  global.hideFilter = function() {
    imagePreview.style.filter = 'none';
    filterEditorLine.style.display = 'none';
  }

  // подвеска обработчика события на выбор фотографии
  uploadFile.addEventListener('change', function() {
    window.uploadPicture();
    global.scaleEditor.setScaleEditorHadler();
    pictureEditor.classList.remove('hidden');
    pin.style.left = '0px';
    valLine.style.width = '0%';

    function closePictureHandler() {
      pictureEditor.classList.add('hidden');
      uploadContainer.classList.remove('scale');
      global.hideFilter();
      global.scaleEditor.resetScaleEditor();

      pin.removeEventListener('mousedown', mouseDown);
      pinLine.removeEventListener('click', pinLineHandler);
      closePictureEditor.removeEventListener('click', closePictureHandler);
      document.removeEventListener('keydown', onCloseButtonEscPress);
    }

    function onCloseButtonEscPress(evt) {
      window.keyEvent.isEscEvent(evt, function() {
        let commentField = document.querySelector('.upload-form-description');
        let hashtagField = document.querySelector('.upload-form-hashtags');
        
        if(commentField === document.activeElement) {
          commentField.blur();
        }else if(hashtagField === document.activeElement) {
          hashtagField.blur();
        }else{
          closePictureHandler();
        }
      });
    }

    function mouseDown(evt) {
      evt.preventDefault();

      function mouseMove(moveEvt) {
        moveEvt.preventDefault();
        setFilter(moveEvt);
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
    document.addEventListener('keydown', onCloseButtonEscPress);
    pin.addEventListener('mousedown', mouseDown);
    pinLine.addEventListener('click', pinLineHandler);

    setTimeout(function() {
      uploadContainer.classList.add('scale');
    }, TIME_SHOW);
  });

  function filtersHandler(evt) {
    let preview = evt.target;

    filterEditorLine.style.display = 'block';
    filterAttribute = preview.getAttribute('filter');

    if(filterAttribute === 'original') {
      global.hideFilter();
    }else if(filterAttribute === 'brightness') {
      imagePreview.style.filter = filterSaturation(filterAttribute, filterPreview[filterAttribute].startValue);
      pin.style.left = '150px';
      valLine.style.width = '33%';
    }else{
      imagePreview.style.filter = filterSaturation(filterAttribute, filterPreview[filterAttribute].startValue);
      pin.style.left = '0px';
      valLine.style.width = '0%';
    }
  }

  function pinLineHandler(evt) {
    evt.preventDefault();
    setFilter(evt);
  }
})(window);

