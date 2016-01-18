(function() {
  angular
    .module('weMessageApp')
    .controller('chatCtrl', chatCtrl);

  chatCtrl.$inject = ['$scope', '$routeParams', '$socket', '$uibModal'];
  function chatCtrl($scope, $routeParams, $socket, $uibModal) {
    var vm = this;
    vm.roomid = $routeParams.roomid;
    vm.alertMessage = '';
    vm.messageThread = vm.messageThread || [];
    // vm.userId = vm.userId || localStorage.userId || '';
    // vm.nickname = vm.nickname || localStorage.nickname || '';
    vm.userId = '';
    vm.nickname = '';

    // set user id on connect
    $socket.on('set-id', function(id) {
      vm.userId = id;
      localStorage.setItem('userId', id);
    });

    $socket.on('nickname-set', function(name) {
      vm.nickname = name;
      localStorage.nickname = name;
    })

    // display messages as they come in
    $socket.on('chatroom-message', function (data) {
      // get message data from socket event
      var nickname = data.username || vm.nickname || '';
      var message = {
        content: data.message,
        selfClasses: '',
        showNickname: true,
        username: nickname
      };
      // alter layout if message was sent by this user
      if(vm.userId == data.sender) {
        message.selfClasses = 'self-sent text-right';
        message.showNickname = false;
      }
      // display the message
      vm.messageThread.push(message);
      // scroll to the bottom of the message thread
      // jQuery - because anchorScroll != 'clean'
      $('html, body').animate({
        scrollTop: $('#message-input-anchor').offset().top
      }, 'slow');
    });

    // send message on submit
    vm.sendMessage = function sendMessage() {
      if(vm.messageToSend) {
        $socket.emit('chatroom-message', vm.messageToSend);
        vm.messageToSend = '';
      }
      return false;
    };

    vm.chatNicknamePopup = function() {
      var modalInstance = $uibModal.open({
        backdrop: 'static',
        keyboard: false,
        templateUrl: '/chatNickname/chatNickname.view.html',
        controller: 'chatNicknameCtrl as vm',
        resolve: {
          chatRoomData : function() {
            return {
              roomid : vm.roomid
            };
          }
        }
      });
      modalInstance.result.then(function(name) {
        vm.alertMessage = 'Your nickname was set to ' + name + '.';
      });
    };

    if(!vm.nickname) {
      vm.chatNicknamePopup();
    }

    // echo-ack, not currently in use
    vm.sendMessageACK = function sendMessageACK() {
      $socket.emit('echo-ack', vm.dataToSend, function (data) {
          vm.serverResponseACK = data;
      });
      vm.dataToSend = '';
    };

  };
})();
