'use strict';

let decScaleButton = document.querySelector('.upload-resize-controls-button-dec');
let incScaleButton = document.querySelector('.upload-resize-controls-button-inc');
let image = document.querySelector('.effect-image-preview');
let scaleValue = document.querySelector('.upload-resize-controls-value');

let value = 1;

function increase() {
  value = value + 0.05;
  return value;
}
function decrease() {
  value = value - 0.05;
  return value;
}
function resetScaleEditor() {
  value = 1;
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