(function() {
  angular
    .module('weMessageApp')
    .controller('conversationCtrl', conversationCtrl);

  conversationCtrl.$inject = ['$scope', '$routeParams', '$socket', '$http', 'constants', 'fileReader'];
  function conversationCtrl($scope, $routeParams, $socket, $http, constants, fileReader) {
    var vm = this;
    // accountid refers to wemessage account id
    // userId refers to temporary id set by web socket
    vm.accountid = $routeParams.accountid;
    vm.userId = vm.userId || localStorage.getItem('userId') || '';
    vm.contact = {
      id: $routeParams.contactid,
      name: $routeParams.contactName,
      shortName: $routeParams.contactName.split(' ')[0],
      url: '/account-info/' + $routeParams.contactid
    };
    vm.threadUrl = constants.apiUrl + '/messages/sender/' + vm.accountid + '/recipient/' + vm.contact.id;
    vm.newMessageUrl = constants.apiUrl + '/messages/';

    // Store name in localStorage on login, retrieve from localStorage here
    vm.accountName = localStorage.getItem('accountName');

    vm.alertMessage = '';

    vm.messageThread = [];
    // Get message thread for the logged in account and this contact
    $http({
      method: 'GET',
      url: vm.threadUrl,
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      }
    })
    .then(function successCallback(response) {
      vm.messageThread = response.data;
      if(vm.messageThread) {
        for(var i = 0; i < vm.messageThread.length; i++) {
          // set display style for messages sent from logged in user
          if(vm.messageThread[i].sender_account == vm.accountid) {
            vm.messageThread[i].selfClasses = 'self-sent text-right';
            vm.messageThread[i].showNickname = false;
            // set display style for messages from contact
          } else {
            vm.messageThread[i].showNickname = true;
            vm.messageThread[i].username = vm.contact.shortName;
          }
        }
        vm.scrollToEnd();
      }
    }, function errorCallback(response) {
      console.log(response);
    });

    // create socket room id for this conversation
    var sortedIds = [vm.accountid, vm.contact.id];
    sortedIds.sort(function(a, b) {
      return a - b;
    });
    vm.roomid = 'convo-' + sortedIds[0] + '-' + sortedIds[1];

    // join socket chatroom with contact
    $socket.emit('join-room', {
      roomid: vm.roomid,
      nickname: vm.accountName,
      conversation: true
    });

    // set user id on connect
    $socket.on('set-id', function(id) {
      vm.userId = id;
      localStorage.setItem('userId', id);
    });

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
      vm.scrollToEnd();
    });

    // send message on submit
    vm.sendMessage = function sendMessage() {
      if(vm.messageToSend) {
        vm.emitAndPostMessage(vm.messageToSend)
      }
      return false;
    };

    vm.emitAndPostMessage = function emitAndPostMessage(message) {
      // send message to conversation chat
      $socket.emit('chatroom-message', message);
      // store message in the database
      $http({
        method: 'POST',
        url: vm.newMessageUrl,
        data: {
          sender_account: vm.accountid,
          recipient_account: vm.contact.id,
          content: message
        },
        headers: {
           'Authorization': 'Bearer ' + localStorage.getItem('authToken')
         }
      })
      .then(function successCallback(response) {
        console.log(response);
      }, function errorCallback(response) {
        console.log(response);
      });
      vm.messageToSend = '';
    }

    // Workaround because Angular doesn't yet support file input change event
    $scope.uploadImage = function(element) {
      fileReader.readImage(element, vm.sendImage, $scope);
    }

    vm.sendImage = function(e) {
      vm.emitAndPostMessage(e.target.result);
    }

    vm.scrollToEnd = function() {
      $('html, body').animate({
        scrollTop: $('#message-input-anchor').offset().top
      }, 'slow');
    };

    vm.onClickBack = constants.onClickBack;

  };
})();
