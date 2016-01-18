(function() {
  angular
    .module('weMessageApp')
    .controller('chatCtrl', chatCtrl);

  chatCtrl.$inject = ['$scope', '$socket', '$location', '$anchorScroll'];
  function chatCtrl($scope, $socket, $location, $anchorScroll) {
    var vm = this;
    vm.messageThread = [];
    vm.userId = '';
    $location.hash('end-of-message-thread');

    // set user id on connect
    $socket.on('set-id', function(data) {
      vm.userId = data;
    });

    // display messages as they come in
    $socket.on('chatroom-message', function (data) {
      var message = {
        content: data.message,
        sentBySelf: ''
      };
      if(vm.userId == data.sender) {
        message.sentBySelf = 'self-sent text-right';
      }
      vm.messageThread.push(message);
      $anchorScroll();
    });

    // send message on submit
    vm.sendMessage = function sendMessage() {
      if(vm.messageToSend && vm.messageToSend != '') {
        $socket.emit('chatroom-message', vm.messageToSend);
        vm.messageToSend = '';
      } else {
        return false;
      }
    };

    // echo-ack, not currently in use
    vm.sendMessageACK = function sendMessageACK() {
      $socket.emit('echo-ack', vm.dataToSend, function (data) {
          vm.serverResponseACK = data;
      });
      vm.dataToSend = '';
    };

  };
})();
