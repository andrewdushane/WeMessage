(function() {
  angular
    .module('weMessageApp')
    .service('constants', constants);

  function constants() {
    var apiUrl = 'http://localhost:3000';
    return {
      apiUrl : apiUrl
    };
  };
})();
