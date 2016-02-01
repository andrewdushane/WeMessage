(function() {
  angular
    .module('weMessageApp')
    .service('constants', constants);

  function constants() {
    // var apiUrl = 'http://localhost:3000'; // uncomment for local API server
    // Deployed API server
    var apiUrl = 'https://obscure-forest-50106.herokuapp.com'; // comment when using local database
    var onClickBack = function() {
      window.history.back();
    };
    var storeAccount = function(account) {
      if(account.name) {
        localStorage.setItem('accountName', account.name);
      }
      if(account.email) {
        localStorage.setItem('accountEmail', account.email);
      }
      if(account.id) {
        localStorage.setItem('accountid', account.id);
      }
    };
    return {
      apiUrl : apiUrl,
      onClickBack : onClickBack,
      storeAccount : storeAccount
    };
  };
})();
