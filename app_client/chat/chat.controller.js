(function() {
  angular
    .module('weMessageApp')
    .controller('chatCtrl', chatCtrl);

  chatCtrl.$inject = ['$scope', '$socket'];
  function chatCtrl($scope, $socket) {
    var vm = this;
    vm.messageThread = [];
    $socket.on('chatroom-message', function (data) {
      vm.messageThread.push({content: data});
    });
    vm.sendMessage = function sendMessage() {
      $socket.emit('chatroom-message', vm.messageToSend);
      vm.messageToSend = '';
    };
    vm.sendMessageACK = function sendMessageACK() {
      $socket.emit('echo-ack', vm.dataToSend, function (data) {
          vm.serverResponseACK = data;
      });
      vm.dataToSend = '';
    };
  };
})();
