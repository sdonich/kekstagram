'use strict';

(function(global) {
  function getCoords(elem) {
    let box = elem.getBoundingClientRect();

    return {
      left: box.left,
      right: box.right
    };
  }

  function getPercent(value, max) {
    let receivedValue = value * 100 / max;
    return Math.round(receivedValue);
  }

  function unique(arr) {
    let obj = {};

    for (let i = 0; i < arr.length; i++) {
      let str = arr[i];
      obj[str] = true; 
    }

    return Object.keys(obj); 
  }

  global.utils = {
    getCoords,
    getPercent,
    unique
  }
})(window);