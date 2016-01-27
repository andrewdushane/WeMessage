(function() {
  angular
    .module('weMessageApp')
    .service('fileReader', fileReader);

  function fileReader() {

    var readImage = function(e) {
      var image = document.getElementById('upload-image').files[0];
      if (image) {
        var reader = new FileReader();
        reader.onload = function(e) {
           return e.target.result;
        };
        reader.readAsDataURL(image);
      }
    };

    return {
      readImage : readImage
    };
  };
})();
