(function() {
  angular
    .module('weMessageApp')
    .service('constants', constants);

  function constants() {
    var apiUrl = 'http://localhost:3000';
    var onClickBack = function() {
      window.history.back();
    };
    return {
      apiUrl : apiUrl,
      onClickBack : onClickBack
    };
  };
})();
