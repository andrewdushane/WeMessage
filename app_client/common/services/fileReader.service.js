(function() {
  angular
    .module('weMessageApp')
    .service('fileReader', fileReader);


  function fileReader() {
    /**
     * reads image from file input
     * @param {DOM element} element - Passed in as 'this' from onchange
     * @param {function} callback - function to execute on read image
     * @param {Angular object} $scope - Angular $scope object
     */
    var readImage = function(element, callback, $scope) {
      $scope.$apply(function(scope) {
        var image = element.files[0];
        if(image) {
          var reader = new FileReader();
          reader.onload = function(e) {
             callback(e);
          };
          reader.readAsDataURL(image);
        }
      });
    };
    return {
      readImage : readImage
    };
  };
})();
