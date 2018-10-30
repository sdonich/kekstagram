'use strict';

(function(global) {
  let FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  let uploadFile = document.querySelector('.upload-input');
  let uploadPicturePreview = document.querySelector('.effect-image-preview');
  let filterIcons = document.querySelectorAll('.upload-effect-preview');

  global.uploadPicture = function() {
    let file = uploadFile.files[0];
    let fileName = file.name.toLowerCase();
    let matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      let reader = new FileReader();

      reader.addEventListener('load', function () {
        uploadPicturePreview.src = reader.result;
        filterIcons.forEach(function(icon) {
          icon.style.backgroundImage = `url('${reader.result}')`;
        })
      });
      reader.readAsDataURL(file);
    }
  }
})(window);