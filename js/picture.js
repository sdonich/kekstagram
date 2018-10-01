'use strict';

(function() {
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
    let users = window.createUsers();

    for(let i = 0; i < users.length; i++) {
      let userPhoto = getUsersPhoto(users[i]); 
      picturesContainer.appendChild(userPhoto);

      picturesContainer.children[i].addEventListener('click', function(evt) {
        evt.preventDefault();
        window.creatGallery(users[i]);
      });
    }
  }

  appendPicture();
})();









