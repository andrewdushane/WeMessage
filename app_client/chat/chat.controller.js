(function() {
  angular
    .module('weMessageApp')
    .controller('chatCtrl', chatCtrl);

  chatCtrl.$inject = ['$scope', '$socket'];
  function chatCtrl($scope, $socket) {
    var vm = this;
    $socket.on('echo', function (data) {
      vm.serverResponse = data;
    });
    vm.emitBasic = function emitBasic() {
      console.log('button clicked');
      $socket.emit('echo', vm.dataToSend);
      vm.dataToSend = '';
    };

    vm.emitACK = function emitACK() {
      $socket.emit('echo-ack', vm.dataToSend, function (data) {
          vm.serverResponseACK = data;
      });
      vm.dataToSend = '';
    };
  };
})();
