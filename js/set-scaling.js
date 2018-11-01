'use strict';

(function() {
  let STEP_VALUE = 0.05;

  let decScaleButton = document.querySelector('.upload-resize-controls-button-dec');
  let incScaleButton = document.querySelector('.upload-resize-controls-button-inc');
  let image = document.querySelector('.effect-image-preview');
  let scaleValue = document.querySelector('.upload-resize-controls-value');
  
  let value = 1;
  
  function increase() {
    value = value + STEP_VALUE;
    setValue(value);
    return value;
  }
  function decrease() {
    value = value - STEP_VALUE;
    setValue(value);
    return value;
  }

  function setValue(value) {
    let percent = Math.round(value * 100);
    scaleValue.value = `${percent}%`;
  }

  function resetScaleEditor() {
    value = 1;
    scaleValue.value = '100%';
    decScaleButton.removeEventListener('click', decreaseHandler);
    incScaleButton.removeEventListener('click', increaseHandler);
  }
  
  function decreaseHandler() {
    image.style.transform = `scale(${decrease()})`;
  }
  function increaseHandler() {
    image.style.transform = `scale(${increase()})`;
  }
  
  function setScaleEditorHadler() {
    decScaleButton.addEventListener('click', decreaseHandler);
    incScaleButton.addEventListener('click', increaseHandler)
  }
  
  window.scaleEditor = {
    setScaleEditorHadler,
    resetScaleEditor
  }
})();