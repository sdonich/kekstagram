'use strict';

(function(global) {
   let comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  function setComment() {
    let count = window.getRandom(1, 2);
    let comment = [];
    for(let i = 1; i <= count; i++) {
      let choice = window.getRandom(0, comments.length - 1);
      comment.push(comments[choice]);
    }
    return comment;
  }

  let usersPicturesAmount = 25;
  let users = [];

  function getUser(count) {
    return {
      url: `photos/${count}.jpg`,
      likes: window.getRandom(15, 200),
      comments: setComment() 
    };
  }

  global.createUsers = function() {
    for(let i = 1; i <= usersPicturesAmount; i++) {
      let user = getUser(i);
      users.push(user);
    }

    return users;
  }
})(window);


