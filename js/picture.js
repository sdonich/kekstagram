'use strict';

(function() {
  let USERS_PICTURE_MAX = 25;
  let USER_DEFAULT = {
    url: 'photos/fail.jpg',
    comments: [],
    likes: 0
  }

  let users = [];
  let template = document.querySelector('template').content;
  let picturesContainer = document.querySelector('.pictures');

  //очистка контейнера с фотографиями коммьюнити
  function clearContainer() {
    while (picturesContainer.lastChild) {
      picturesContainer.removeChild(picturesContainer.lastChild);
    }
  }

  //применения фильтра для отображения фотографий коммьюнити
  function chooseFilter(users) {
    let filter;
    let form = new FormData(document.querySelector('.filters'));
   
    form.forEach(function(value) {
      filter = value;
    })

    return useFilter[filter](users);
  };

  let useFilter = {
    'recommend': function(users) {
      return users;
    },
    'popular': function(users) {
      return users.sort(function(a, b) {
        return b.likes - a.likes;
      });
    },
    'discussed': function(users) {
      return users.sort(function(a, b) {
        return b.comments.length - a.comments.length;
      });
    }
  };

  //получение и настройка фотографий пользователей коммьюнити
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
      users = chooseFilter(response.slice());

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

  //вставка фотографий
  function appendPicture() {
    window.backend.load(function(response) {
      clearContainer();
      setPicture(response);
    }, function(error) {
      setPicture();
      window.notice.error(error);
    });
  }

  let filters = document.querySelectorAll('.filters-radio');
  filters.forEach(function(node) {
    node.addEventListener('click', function() {
      window.debounce(appendPicture());
    })
  })

  window.debounce(appendPicture());
})();









