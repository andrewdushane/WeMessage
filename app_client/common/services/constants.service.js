(function() {
  angular
    .module('weMessageApp')
    .service('constants', constants);

  function constants() {
    // var apiUrl = 'http://localhost:3000'; // uncomment for local API server
    // Deployed API server
    var apiUrl = 'https://obscure-forest-50106.herokuapp.com';
    var onClickBack = function() {
      window.history.back();
    };
    return {
      apiUrl : apiUrl,
      onClickBack : onClickBack
    };
  };
})();
