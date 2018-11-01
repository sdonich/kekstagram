'use strict';

(function(global) {

  let gallery = document.querySelector('.gallery-overlay');
  let galleryImage = gallery.querySelector('.gallery-overlay-image');
  let galleryCommentsCount = gallery.querySelector('.comments-count');
  let galleryLikesCount = gallery.querySelector('.likes-count')
  let closeButton = document.querySelector('.gallery-overlay-close');

  function closeGallery() {
    gallery.classList.add('hidden');
    document.removeEventListener('keydown', onCloseButtonEscPress);
  }

  function onCloseButtonEscPress(evt) {
    window.keyEvent.isEscEvent(evt, closeGallery);
  }

  global.creatGallery = function(user) {
    closeButton.addEventListener('click', closeGallery);
    document.addEventListener('keydown', onCloseButtonEscPress);

    galleryImage.src = user.url;
    galleryCommentsCount.textContent = user.comments.length;
    galleryLikesCount.textContent = user.likes;
    gallery.classList.remove('hidden');
  }
})(window);