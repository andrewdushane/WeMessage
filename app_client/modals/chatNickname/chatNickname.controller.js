(function() {
  angular
    .module('weMessageApp')
    .controller('chatNicknameCtrl', chatNicknameCtrl);

  chatNicknameCtrl.$inject = ['$uibModalInstance', '$socket', 'chatRoomData'];
  function chatNicknameCtrl($uibModalInstance, $socket, chatRoomData) {
    var vm = this;
    vm.roomid = chatRoomData.roomid;
    vm.onSubmit = function() {
      vm.formError = '';
      vm.formData = vm.formData || {};
      if(!vm.formData.nickname) {
        vm.formError = "Please enter a nickname."
      } else {
        vm.joinRoom(vm.formData);
      }
      return false;
    };
    vm.joinRoom = function(formData) {
      if(formData.nickname) {
        $socket.emit('join-room', {
          roomid: vm.roomid,
          nickname: formData.nickname
        });
      }
      return false;
    };
    vm.closeModal = function(name) {
      $uibModalInstance.close(name);
    };
    $socket.on('nickname-set', function(name) {
      vm.closeModal(name);
    })
  }
})();
