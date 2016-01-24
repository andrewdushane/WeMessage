(function() {
  angular
    .module('weMessageApp')
    .controller('chatCtrl', chatCtrl);

  chatCtrl.$inject = ['$scope', '$routeParams', '$socket', '$uibModal'];
  function chatCtrl($scope, $routeParams, $socket, $uibModal) {
    var vm = this;

    vm.setRoomName = function(roomid) {
      roomid = roomid.split('-').join(' ');
      return roomid.split('_').join(' ');
    }

    vm.roomid = $routeParams.roomid;
    vm.chatName = vm.setRoomName(vm.roomid) || 'Instant Chat';
    vm.alertMessage = '';
    vm.messageThread = vm.messageThread || [];
    // vm.nickname = vm.nickname || localStorage.nickname || '';
    vm.userId = vm.userId || localStorage.getItem('userId') || '';
    // vm.nickname = '';

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
      // alter layout if it's a system message
      } else if(data.sender == 'the socket master') {
        message.selfClasses = 'bold text-center';
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
        templateUrl: '/modals/chatNickname/chatNickname.view.html',
        controller: 'chatNicknameCtrl as vm',
        resolve: {
          chatRoomData : function() {
            return {
              roomid : vm.roomid
            };
          }
        }
      });
    };

    if(!vm.nickname) {
      vm.chatNicknamePopup();
    }

    vm.emailInvitePopup = function() {
      var modalInstance = $uibModal.open({
        templateUrl: '/modals/emailInvite/emailInvite.view.html',
        controller: 'emailInviteCtrl as vm',
        resolve: {
          senderInfo : function() {
            return {
              sender : vm.nickname,
              chatUrl : window.location.href
            };
          }
        }
      });
      modalInstance.result.then(function(message) {
        if(message) {
          var alert = {
            content: message,
            selfClasses: 'bold text-center',
            showNickname: false,
            username: ''
          };
          vm.messageThread.push(alert);
        }
      });
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
