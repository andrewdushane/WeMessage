(function() {
  angular
    .module('weMessageApp')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope'];
  function homeCtrl($scope) {
    var vm = this;
    function randString(x){
      var s = "";
      while(s.length<x&&x>0){
        var r = Math.random();
        s+= (r<0.1?Math.floor(r*100):String.fromCharCode(Math.floor(r*26) + (r>0.5?97:65)));
      }
      return s;
    }
    // Generate new random string for chat-room ID
    vm.newRoomId = randString(20);
  };
})();
