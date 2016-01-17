(function() {
  angular
    .module('weMessageApp')
    .service('currentTime', currentTime);

  function currentTime() {
    var getTime = new Date();
    return {
      now : getTime
    };
  };
})();
