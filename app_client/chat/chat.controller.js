(function() {
  angular
    .module('weMessageApp')
    .controller('chatCtrl', chatCtrl);

  chatCtrl.$inject = ['$scope', '$routeParams', '$socket', '$uibModal', 'fileReader'];
  function chatCtrl($scope, $routeParams, $socket, $uibModal, fileReader) {
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

    // Workaround because Angular doesn't yet support file input change event
    $scope.uploadImage = function(element) {
      fileReader.readImage(element, vm.emitImage, $scope);
    }

    vm.emitImage = function(e) {
      $socket.emit('chatroom-message', '<img src="' + e.target.result + '">');
    }

    $scope.uploadImageOld = function(element) {
     $scope.$apply(function(scope) {
       console.log('watching?');
       var image = element.files[0];
       var reader = new FileReader();
       reader.onload = function(e) {
          console.log(e.target.result);
          $socket.emit('chatroom-message', '<img src="' + e.target.result + '">');
       };
       reader.readAsDataURL(image);
     });
    };

    vm.uploadImage = function() {
      console.log('change?')
      // var image = fileReader.readImage();
      // console.log(image);
    }

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
