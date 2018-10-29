'use strict';

(function(global) {
  let USERS_PICTURE_MAX = 25;
  let USER_DEFAULT = {
    url: 'photos/fail.jpg',
    comments: [],
    likes: 0
  }

  let users = [];
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

  function setPicture(response) {
    let usersNumber = USERS_PICTURE_MAX;

    if(response) {
      users = response.slice();
      usersNumber = users.length;
    }

    for(let i = 0; i < usersNumber; i++) {
      let user = USER_DEFAULT;

      if(response) {
        user = users[i];
      }

      picturesContainer.appendChild(getUsersPhoto(user));
      picturesContainer.children[i].addEventListener('click', function(evt) {
        evt.preventDefault();
        window.creatGallery(user);
      });
    }
  }

  global.appendPicture = function() {
    window.backend.load(function(response) {
      setPicture(response);
    }, function(error) {
      setPicture();
      window.notice.error(error);
    });
  }
  global.appendPicture();
})(window);









