'use strict';

(function(global) {

  let gallery = document.querySelector('.gallery-overlay');
  let galleryImage = gallery.querySelector('.gallery-overlay-image');
  let galleryCommentsCount = gallery.querySelector('.comments-count');
  let galleryLikesCount = gallery.querySelector('.likes-count')
  let closePicture = document.querySelector('.gallery-overlay-close');


  global.creatGallery = function(user) {
    closePicture.addEventListener('click', function() {
      gallery.classList.add('hidden');
    })

    galleryImage.src = user.url;
    galleryCommentsCount.textContent = user.comments.length;
    galleryLikesCount.textContent = user.likes;
    gallery.classList.remove('hidden');
  }
})(window);