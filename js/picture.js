'use strict';

// console.log('hel');

function getRandom(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

// console.log(getRandom(1, 25));

function getUrl() {

  return `photos/{{${getRandom(1, 25)}}}.jpg`;

}



let photos = [];

let user = {
  url: getUrl()  
}

console.log(user.url);