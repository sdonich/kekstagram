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

  for(let i = 0; i < users.length; i++) {
    let userPhoto = getUsersPhoto(users[i]); 
    picturesContainer.appendChild(userPhoto);

    picturesContainer.children[i].addEventListener('click', function(evt) {
      evt.preventDefault();
      creatGallery(users[i]);
    });
  }
}

function creatGallery(user) {
  let gallery = document.querySelector('.gallery-overlay');
  let galleryImage = gallery.querySelector('.gallery-overlay-image');
  let galleryCommentsCount = gallery.querySelector('.comments-count');
  let galleryLikesCount = gallery.querySelector('.likes-count')
  let closePicture = document.querySelector('.gallery-overlay-close');

  closePicture.addEventListener('click', function() {
    gallery.classList.add('hidden');

  })

  galleryImage.src = user.url;
  galleryCommentsCount.textContent = user.comments.length;
  galleryLikesCount.textContent = user.likes;
  gallery.classList.remove('hidden');
}

appendPicture();

let uploadFile = document.querySelector('.upload-input');
let pictureEditor = document.querySelector('.upload-overlay');
let closePictureEditor = document.querySelector('.upload-form-cancel');
let pinEditor = document.querySelector('.upload-effect-level-pin');

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

uploadFile.addEventListener('change', function() {
  pictureEditor.classList.remove('hidden');

  closePictureEditor.addEventListener('click', function() {
    pictureEditor.classList.add('hidden');
  })
  
  for(let i = 0; i < filters.length; i++) {
    filters[i].addEventListener('click', filtersHandler);
  }
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
  evt.preventDefault();
  let hashtags = hashtagsForm.value;
  let correctHashtags = checkHashtag(hashtags);
  
  hashtagsForm.value = correctHashtags.join(' ');

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

  let hashArray = hashtag.split(' ').map(function(item) {
    if(item[0] !== '#') {
      return `#${item.toLowerCase()}`;
    }
    return item.toLowerCase();
  });

  return unique(hashArray);
  
}







