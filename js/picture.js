'use strict';

function getRandom(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

let comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

function setComment() {
  let count = getRandom(1, 2);
  let comment = [];
  for(let i = 1; i <= count; i++) {
    let choice = getRandom(0, comments.length - 1);
    comment.push(comments[choice]);
  }
  return comment;
}

let usersPicturesAmount = 25;
let users = [];

function getUser(count) {
  return {
    url: `photos/${count}.jpg`,
    likes: getRandom(15, 200),
    comments: setComment() 
  };
}

function createUsers() {
  for(let i = 1; i <= usersPicturesAmount; i++) {
    let user = getUser(i);
    users.push(user);
  }
}

let template = document.querySelector('template').content;
let picturesContainer = document.querySelector('.pictures');

function getUsersPhoto(user) {
  let picture = template.cloneNode(true);
  let pictureImg = picture.querySelector('img');
  let pictureLikes = picture.querySelector('.picture-stats .picture-likes');
  let pictureComments = picture.querySelector('.picture-stats .picture-comments');

  pictureImg.src = user.url;
  pictureLikes.textContent = user.likes;
  pictureComments.textContent = user.comments.length;

  return picture;
}

function appendPicture() {
  createUsers();
  users.forEach(function(item) {
    picturesContainer.appendChild(getUsersPhoto(item));
  })
}

function creatGallery() {
  let gallery = document.querySelector('.gallery-overlay');
  let galleryImage = gallery.querySelector('.gallery-overlay-image');
  let galleryCommentsCount = gallery.querySelector('.comments-count');
  let galleryLikesCount = gallery.querySelector('.likes-count')
  galleryImage.src = users[0].url;
  galleryCommentsCount.textContent = users[0].comments.length;
  galleryLikesCount.textContent = users[0].likes;
  gallery.classList.remove('hidden');
}

appendPicture();
// creatGallery();

let uploadFile = document.querySelector('.upload-input');
let pictureEditor = document.querySelector('.upload-overlay');
let closePictureEditor = document.querySelector('.upload-form-cancel');
let pinEditor = document.querySelector('.upload-effect-level-pin');
// console.log(closePictureEditor);


let filterPreview = {
  'grayscale': 'grayscale',
  'sepia': 'sepia',
  'invert': 'invert',
  'blur': 'blur',
  'brightness': 'brightness',
  'original': 'none'
};

let filters = document.querySelectorAll('.upload-effect-label');


uploadFile.addEventListener('change', function() {
  // console.log('h');
  pictureEditor.classList.remove('hidden');

  closePictureEditor.addEventListener('click', function() {
    pictureEditor.classList.add('hidden');
  })
  
  pinEditor.addEventListener('mouseup', function() {
    // console.log('hello');
  });

  for(let i = 0; i < filters.length; i++) {
    filters[i].addEventListener('click', filtersHandler);
  }
});



function filtersHandler(evt) {
  console.log(evt.target);
  let attribute = evt.target.getAttribute('filter');
  console.log(attribute);
  // console.dir(evt.target.firstElementChild);
  // let xxx = evt.target.textContent;
  // let xxx = document.querySelector('.upload-effect-label').textContent;
  // console.log(xxx === ' Оригинал ');
  // console.log(filterPreview[xxx]);
  // console.log(xxx);
}






